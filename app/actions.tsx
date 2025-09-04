"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/register");
    }

    const title = formData.get("title");
    const content = formData.get("content");
    const url = formData.get("url");

    await prisma.blogPost.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: url as string,
            authorId: user.id,
            authorImage: user.picture as string,
            authorName: user.given_name as string,
        },
    });

    revalidatePath("/");
    return redirect("/dashboard");
}

export async function handleCommentSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const comment = formData.get("comment") as string;
    const blogPostId = formData.get("blogPostId") as string;
    const parentCommentId = formData.get("parentCommentId") as string | null;

    if (!comment || !blogPostId) {
        return { error: "Comment and post ID are required" };
    }

    await prisma.comment.create({
        data: {
            text: comment,
            like: 0,
            dislike: 0,
            authorId: user.id,
            authorName: user.given_name || "Anonymous",
            authorImage: user.picture || "",
            blogPostId: blogPostId,
            parentCommentId: parentCommentId || null,
        },
    });

    revalidatePath(`/post/${blogPostId}`);
}

export async function handleLikePost(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const postId = formData.get("postId") as string;

    if (!postId) {
        return { error: "Post ID is required" };
    }

    try {
        // Check if user already liked this post
        const existingLike = await prisma.postLike.findUnique({
            where: {
                userId_blogPostId: {
                    userId: user.id,
                    blogPostId: postId,
                },
            },
        });

        if (existingLike) {
            // Unlike: Remove the like and decrement count
            await prisma.$transaction([
                prisma.postLike.delete({
                    where: {
                        id: existingLike.id,
                    },
                }),
                prisma.blogPost.update({
                    where: { id: postId },
                    data: {
                        likes: {
                            decrement: 1,
                        },
                    },
                }),
            ]);
        } else {
            // Like: Create new like and increment count
            await prisma.$transaction([
                prisma.postLike.create({
                    data: {
                        userId: user.id,
                        blogPostId: postId,
                    },
                }),
                prisma.blogPost.update({
                    where: { id: postId },
                    data: {
                        likes: {
                            increment: 1,
                        },
                    },
                }),
            ]);
        }

        revalidatePath(`/post/${postId}`);
        revalidatePath('/');
        revalidatePath('/posts');
        revalidatePath('/my-post');
        
        return { success: true, liked: !existingLike };
    } catch (error) {
        console.error("Error handling like:", error);
        return { error: "Failed to process like" };
    }
}


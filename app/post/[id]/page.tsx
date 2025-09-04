import { prisma } from "../../../utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentForm } from "@/components/general/CommentForm";
import { CommentSection } from "@/components/general/CommentSection";
import { LikeButtonWrapper } from "@/components/general/LikeButtonWrapper";

export const revalidate = 200;

async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
    include: {
      comments: {
        where: {
          parentCommentId: null, // Only get top-level comments
        },
        include: {
          replies: {
            include: {
              replies: true, // Include nested replies
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ id: string }>;

export default async function IdPage({ params }: { params: Params }) {
const { id } = await params;
const data = await getData(id);

return (
    <div className="max-w-3xl mx-auto py-8 px-4">
    <Link className={buttonVariants({ variant: "secondary" })} href="/">
        Back to posts
    </Link>

    <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-center">{data.title}</h1>
        <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
            <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
            />
            </div>
            <p className="font-medium">{data.authorName}</p>
        </div>
        <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            }).format(data.createdAt)}
        </p>
        </div>
    </div>

    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <Image
        src={data.imageUrl}
        alt={data.title}
        fill
        className="object-cover"
        priority
        />
    </div>

    <Card className="mb-8">
        <CardContent>
          <p className="text-gray-700 mb-6">{data.content}</p>
          
          {/* Like Button */}
          <div className="flex justify-center pt-4 border-t border-gray-100">
            <LikeButtonWrapper postId={data.id} initialLikes={data.likes} size="lg" />
          </div>
        </CardContent>
    </Card>

    {/* Comment Form */}
    <CommentForm blogPostId={data.id} />

    {/* Comments Section */}
    <CommentSection comments={data.comments} blogPostId={data.id} />
    </div>
);
}
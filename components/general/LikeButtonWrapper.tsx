import { prisma } from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LikeButton } from "./LikeButton";

interface LikeButtonWrapperProps {
  postId: string;
  initialLikes: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

async function checkUserLikedPost(postId: string, userId: string) {
  try {
    const like = await prisma.postLike.findUnique({
      where: {
        userId_blogPostId: {
          userId: userId,
          blogPostId: postId,
        },
      },
    });
    return !!like;
  } catch (error) {
    console.error("Error checking like status:", error);
    return false;
  }
}

export async function LikeButtonWrapper({
  postId,
  initialLikes,
  showCount = true,
  size = "md"
}: LikeButtonWrapperProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  let isLiked = false;
  if (user?.id) {
    isLiked = await checkUserLikedPost(postId, user.id);
  }

  return (
    <LikeButton
      postId={postId}
      initialLikes={initialLikes}
      initialLiked={isLiked}
      showCount={showCount}
      size={size}
    />
  );
}
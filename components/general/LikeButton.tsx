"use client";

import { handleLikePost } from "@/app/actions";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  initialLiked?: boolean;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

export function LikeButton({ 
  postId, 
  initialLikes, 
  initialLiked = false,
  showCount = true, 
  size = "md" 
}: LikeButtonProps) {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [isLiking, setIsLiking] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialLiked);

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <LoginLink className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
          <Heart className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />
          {showCount && <span className="text-sm">{likes}</span>}
        </LoginLink>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    setIsLiking(true);
    
    // Optimistic update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes(prev => newLikedState ? prev + 1 : prev - 1);
    
    try {
      const result = await handleLikePost(formData);
      if (result?.error) {
        // Revert on error
        setIsLiked(!newLikedState);
        setLikes(prev => newLikedState ? prev - 1 : prev + 1);
        console.error("Failed to process like:", result.error);
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(!newLikedState);
      setLikes(prev => newLikedState ? prev - 1 : prev + 1);
      console.error("Failed to like post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <form action={handleSubmit} className="inline-block">
      <input type="hidden" name="postId" value={postId} />
      <Button
        type="submit"
        variant="ghost"
        size={size === 'sm' ? 'sm' : 'default'}
        disabled={isLiking}
        className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors p-2"
      >
        <Heart 
          className={`${
            size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
          } ${isLiked ? 'fill-red-500 text-red-500' : ''} transition-colors`} 
        />
        {showCount && (
          <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {likes}
          </span>
        )}
      </Button>
    </form>
  );
}
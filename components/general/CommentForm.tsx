"use client";

import { handleCommentSubmission } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

interface CommentFormProps {
  blogPostId: string;
  parentCommentId?: string | null;
  onCancel?: () => void;
  placeholder?: string;
}

export function CommentForm({ 
  blogPostId, 
  parentCommentId = null, 
  onCancel,
  placeholder = "Write a comment..."
}: CommentFormProps) {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const [comment, setComment] = useState("");

  if (!user) {
    return (
      <Card className="mb-5">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please log in to leave a comment</p>
            <LoginLink className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Log In
            </LoginLink>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    await handleCommentSubmission(formData);
    setComment("");
    if (onCancel) onCancel();
  };

  return (
    <Card className="mb-5">
      <CardContent className="pt-6">
        <form action={handleSubmit}>
          <input type="hidden" name="blogPostId" value={blogPostId} />
          {parentCommentId && (
            <input type="hidden" name="parentCommentId" value={parentCommentId} />
          )}
          
          <Textarea 
            name="comment" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={placeholder}
            className="w-full mb-3" 
            rows={3}
            required
          />
          
          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button 
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit"
              disabled={!comment.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {parentCommentId ? "Reply" : "Add Comment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
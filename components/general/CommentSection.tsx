"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Reply, User } from "lucide-react";
import { useState } from "react";
import { CommentForm } from "./CommentForm";

interface Comment {
  id: string;
  text: string;
  like: number;
  dislike: number;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Date;
  replies: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  blogPostId: string;
}

interface CommentItemProps {
  comment: Comment;
  blogPostId: string;
  isReply?: boolean;
}

function CommentItem({ comment, blogPostId, isReply = false }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className={`${isReply ? "ml-8 border-l-2 border-gray-200 pl-4" : ""}`}>
      <Card className={`${isReply ? "mb-3" : "mb-5"}`}>
        <CardContent className="pt-4">
          <div className="flex items-center space-x-2 mb-2">
            {comment.authorImage ? (
              <img 
                src={comment.authorImage} 
                alt={comment.authorName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 bg-gray-200 rounded-full p-1" />
            )}
            <div>
              <p className="font-medium text-sm">{comment.authorName}</p>
              <p className="text-xs text-gray-500">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(comment.createdAt))}
              </p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-3">{comment.text}</p>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{comment.like}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
              <ThumbsDown className="w-4 h-4" />
              <span className="text-sm">{comment.dislike}</span>
            </button>
            
            {!isReply && (
              <button 
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-gray-500 hover:text-green-500"
              >
                <Reply className="w-4 h-4" />
                <span className="text-sm">Reply</span>
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {showReplyForm && (
        <div className="ml-8 mb-4">
          <CommentForm 
            blogPostId={blogPostId}
            parentCommentId={comment.id}
            onCancel={() => setShowReplyForm(false)}
            placeholder="Write a reply..."
          />
        </div>
      )}

      {/* Display replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              blogPostId={blogPostId} 
              isReply={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentSection({ comments, blogPostId }: CommentSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">
        Comments ({comments.length})
      </h3>
      
      {comments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              blogPostId={blogPostId} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
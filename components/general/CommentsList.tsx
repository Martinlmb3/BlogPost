"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ThumbsDown } from 'lucide-react';

interface Comment {
  id: string;
  username: string;
  userImage?: string;
  postTitle: string;
  comment: string;
  likes: number;
  dislikes: number;
  createdAt: string;
}

interface CommentsListProps {
  comments?: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments = [] }) => {
    // Mock data for demonstration - replace with actual data
    const mockComments: Comment[] = [
        {
            id: "1",
            username: "John Doe",
            postTitle: "Getting Started with React",
            comment: "This is a great tutorial! I learned so much about React hooks and how to use them effectively in my projects. The examples were very clear and easy to follow.",
            likes: 15,
            dislikes: 2,
            createdAt: "2025-01-15"
        },
        {
            id: "2", 
            username: "Jane Smith",
            postTitle: "Advanced TypeScript Tips",
            comment: "Thanks for sharing these tips. The generic types section was particularly helpful for my current project.",
            likes: 8,
            dislikes: 0,
            createdAt: "2025-01-14"
        },
        {
            id: "3",
            username: "Mike Johnson", 
            postTitle: "CSS Grid Layout Guide",
            comment: "Amazing guide! I've been struggling with CSS Grid for weeks and this finally made it click for me.",
            likes: 23,
            dislikes: 1,
            createdAt: "2025-01-13"
        }
    ];

    const commentsData = comments.length > 0 ? comments : mockComments;

    const truncateText = (text: string, maxLength: number = 80) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const generateAvatar = (username: string) => {
        const colors = [ '#FF9F43', '#A55EEA'];
        const colorIndex = username.charCodeAt(0) % colors.length;
        const initials = username.split(' ').map(n => n[0]).join('').toUpperCase();
        
        return (
            <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: colors[colorIndex] }}
            >
                {initials}
            </div>
        );
    };

    return (
        <div className="bg-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">Recent Comments</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-400">
                    <thead>
                        <tr>
                            {["Username", "Post Title", "Comment", "Likes", "Dislikes"].map((header) => (
                                <th key={header} className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-400">
                        {commentsData.map((comment, index) => (
                            <motion.tr
                                key={comment.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                className="hover:bg-gray-300 transition-colors"
                            >
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {generateAvatar(comment.username)}
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-800">
                                                {comment.username}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4">
                                    <div className="text-sm text-gray-700 max-w-xs">
                                        {truncateText(comment.postTitle, 30)}
                                    </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4">
                                    <div className="text-sm text-gray-700 max-w-xs">
                                        {truncateText(comment.comment)}
                                    </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-green-400">
                                        <Heart size={16} className="mr-1" />
                                        <span className="text-sm">{comment.likes}</span>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-red-400">
                                        <ThumbsDown size={16} className="mr-1" />
                                        <span className="text-sm">{comment.dislikes}</span>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommentsList;
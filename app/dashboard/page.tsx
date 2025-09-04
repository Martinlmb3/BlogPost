"use client";
import StatCard from "@/components/general/StatCard";
import CommentsList from "@/components/general/CommentsList";
import { motion } from "framer-motion";
import { FileText, Heart, ThumbsDown } from "lucide-react";

export default function Dashboard() {
  const icons = [FileText, Heart, ThumbsDown];
  
  return (
    <div className="py-6">
      <h1 className="text-5xl font-bold tracking-tight mb-8 text-black text-center">Dashboard</h1>
      
      <motion.div 
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <StatCard name="Total Posts" icon={icons[0]} value={100} />
        <StatCard name="Total Likes" icon={icons[1]} value={200} />
        <StatCard name="Total Dislikes" icon={icons[2]} value={50} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      >
        <CommentsList />
      </motion.div>
    </div>
  );
}
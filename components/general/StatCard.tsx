"use client"
import React from 'react'
import { motion } from 'framer-motion'

type StatCardProps = {
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    value: string | number;
};

function StatCard({ name, icon: Icon, value }: StatCardProps) {
    return (
        <motion.div whileHover={{ y:-5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }} className="bg-gray-200 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300">
            <div className="px-4 py-5 sm:p-6">
                <span className="flex items-center text-sm font-medium text-gray-700">
                    <Icon size={24} className="mr-2" />
                    {name}
                </span>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
            </div>
        </motion.div>
    )
}

export default StatCard
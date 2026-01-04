"use client"

import { motion } from "framer-motion"
import { Users, BookMarked, FileCode, Calendar } from "lucide-react"
import { GitHubUser } from "@/lib/github"

interface GitHubStatsProps {
    user: GitHubUser;
}

export function GitHubStats({ user }: GitHubStatsProps) {
    const stats = [
        {
            label: "Repositórios",
            value: user.public_repos,
            icon: BookMarked,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            label: "Seguidores",
            value: user.followers,
            icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            label: "Gists",
            value: user.public_gists,
            icon: FileCode,
            color: "text-pink-400",
            bg: "bg-pink-500/10",
        },
        {
            label: "No GitHub desde",
            value: new Date(user.created_at).getFullYear(),
            icon: Calendar,
            color: "text-green-400",
            bg: "bg-green-500/10",
        },
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:border-purple-500/30 transition-colors"
                >
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

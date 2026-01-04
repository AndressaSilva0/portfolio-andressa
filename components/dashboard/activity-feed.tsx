"use client"

import { motion } from "framer-motion"
import { GitCommit, GitPullRequest, Star, CircleDot } from "lucide-react"
import { GitHubEvent } from "@/lib/github"

interface ActivityFeedProps {
    events: GitHubEvent[];
}

export function ActivityFeed({ events }: ActivityFeedProps) {
    const getEventIcon = (type: string) => {
        switch (type) {
            case "PushEvent": return <GitCommit size={18} className="text-yellow-400" />
            case "PullRequestEvent": return <GitPullRequest size={18} className="text-purple-400" />
            case "WatchEvent": return <Star size={18} className="text-yellow-400" />
            case "CreateEvent": return <CircleDot size={18} className="text-green-400" />
            default: return <CircleDot size={18} className="text-white/40" />
        }
    }

    const getEventMessage = (event: GitHubEvent) => {
        switch (event.type) {
            case "PushEvent":
                return `Pushed to ${event.repo.name.split('/')[1]}`
            case "PullRequestEvent":
                return `Opened PR in ${event.repo.name}`
            case "WatchEvent":
                return `Starred ${event.repo.name}`
            case "CreateEvent":
                return `Created ${event.repo.name}`
            default:
                return `Activity in ${event.repo.name}`
        }
    }

    return (
        <div className="bg-card/50 border border-white/5 rounded-3xl p-6 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                Atividade Recente
            </h3>

            <div className="space-y-6">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 relative group"
                    >
                        {/* Timeline Line */}
                        {index !== events.length - 1 && (
                            <div className="absolute left-[19px] top-8 bottom-[-24px] w-[2px] bg-white/5 group-hover:bg-purple-500/20 transition-colors" />
                        )}

                        <div className="mt-1 relative z-10 bg-card p-2 rounded-full border border-white/10 group-hover:border-purple-500/50 transition-colors">
                            {getEventIcon(event.type)}
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-medium text-white/90 group-hover:text-purple-300 transition-colors">
                                {getEventMessage(event)}
                            </p>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-white/40">
                                    {new Date(event.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

"use client"

import { motion } from "framer-motion"
import { GitCommit } from "lucide-react"

export function CommitsChart({ events }: { events?: any[] }) {
    // 1. Filter for PushEvents (defensive check)
    // Cast to any to avoid strict type issues with unknown structure for now
    const safeEvents = Array.isArray(events) ? events : []
    const pushEvents = safeEvents.filter((event: any) => event.type === 'PushEvent')

    // 2. Aggregate commits per repo
    const commitCounts: Record<string, number> = {}

    pushEvents.forEach((event: any) => {
        const repoName = event.repo?.name?.split('/')[1] || event.repo?.name || 'unknown'
        const payload = event.payload
        const count = payload?.size || 1 // Fallback to 1 if size invalid

        commitCounts[repoName] = (commitCounts[repoName] || 0) + count
    })

    // 3. Convert to array and sort
    const data = Object.entries(commitCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5) // Top 5 active repos

    // Handle empty data case
    if (data.length === 0) {
        return (
            <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 h-full flex flex-col justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    Atividade de Commits
                </h3>
                <div className="flex flex-col items-center justify-center h-full text-white/40 gap-2">
                    <GitCommit size={32} />
                    <p className="text-sm">Nenhuma atividade recente</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
                    <GitCommit size={12} />
                    <span>Últimos 90 dias</span>
                </div>
            </div>
        )
    }

    const maxCount = Math.max(...data.map(d => d.count))

    return (
        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 h-full flex flex-col justify-between">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                Atividade de Commits
            </h3>

            <div className="space-y-4">
                {data.map((repo, i) => (
                    <div key={repo.name} className="space-y-1">
                        <div className="flex justify-between text-xs text-white/60">
                            <span className="truncate max-w-[150px]">{repo.name}</span>
                            <span>{repo.count} commits</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(repo.count / maxCount) * 100}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="h-full rounded-full"
                                style={{
                                    backgroundColor: i === 0 ? "#10b981" : i === 1 ? "#3b82f6" : "#a855f7"
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
                <GitCommit size={12} />
                <span>Últimos 90 dias (Eventos Públicos)</span>
            </div>
        </div>
    )
}

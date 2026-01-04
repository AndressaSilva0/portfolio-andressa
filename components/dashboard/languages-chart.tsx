"use client"

import { motion } from "framer-motion"

interface LanguagesChartProps {
    repos: any[]
}

export function LanguagesChart({ repos }: LanguagesChartProps) {
    // 1. Aggregate languages
    const stats: Record<string, number> = {}
    repos.forEach(repo => {
        if (repo.language) {
            stats[repo.language] = (stats[repo.language] || 0) + 1
        }
    })

    // 2. Convert to array and sort
    const data = Object.entries(stats)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5) // Top 5

    const total = data.reduce((acc, curr) => acc + curr.count, 0)

    // 3. Calculate dash arrays for SVG
    let accumulatedPercent = 0
    const chartData = data.map((lang, index) => {
        const percent = (lang.count / total) * 100
        const dashArray = `${percent} ${100 - percent}`
        const offset = 25 - accumulatedPercent // Start from top (25% offset for circle)
        accumulatedPercent += percent

        // Generate a color based on purple/blue palette
        const colors = [
            "#a855f7", // Purple-500
            "#3b82f6", // Blue-500
            "#ec4899", // Pink-500
            "#10b981", // Emerald-500
            "#f59e0b", // Amber-500
        ]

        return {
            ...lang,
            percent,
            dashArray,
            offset,
            color: colors[index % colors.length]
        }
    })

    return (
        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                Top Linguagens
            </h3>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4">
                {/* Donut Chart */}
                <div className="relative w-32 h-32 flex-shrink-0">
                    <svg viewBox="0 0 42 42" className="w-full h-full transform scale-100">
                        {chartData.map((lang, i) => (
                            <motion.circle
                                key={lang.name}
                                cx="21"
                                cy="21"
                                r="15.91549430918954"
                                fill="transparent"
                                stroke={lang.color}
                                strokeWidth="5"
                                strokeDasharray={lang.dashArray}
                                strokeDashoffset={lang.offset}
                                initial={{ strokeDasharray: `0 100` }}
                                animate={{ strokeDasharray: lang.dashArray }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                            />
                        ))}
                    </svg>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold text-white">{total}</span>
                        <span className="text-[10px] text-white/50 uppercase">Repos</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="w-full space-y-3">
                    {chartData.map((lang, i) => (
                        <motion.div
                            key={lang.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center justify-between text-sm gap-2"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                                <span className="text-white/80">{lang.name}</span>
                            </div>
                            <span className="text-white/40 font-mono">{Math.round(lang.percent)}%</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

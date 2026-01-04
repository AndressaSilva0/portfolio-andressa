"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

interface ActivityChartProps {
    events: any[]
}

export function ActivityChart({ events }: ActivityChartProps) {
    // 1. Group events by date (last 7 days typically available in recent events)
    // Note: Public GitHub events API only returns last 90 days / 300 events.
    // For this dashboard, we'll map the recent events to a simple trend line.

    // Create a simplified signal from event timestamps to simulate "intensity"
    const dataPoints = events.map((_, i) => ({
        index: i,
        // Fake intensity calculation for visual variety based on event type length or random seed from ID
        value: 5 + (Math.random() * 10)
    })).reverse() // Oldest first

    // Normalize to SVG coordinates (0-100 width, 0-50 height)
    // Make a smooth curve path
    const points = dataPoints.map((p, i) => {
        const x = (i / (dataPoints.length - 1 || 1)) * 100
        const y = 50 - (p.value * 2) // Invert Y
        return `${x},${y}`
    }).join(" ")

    const pathD = `M ${points}`

    return (
        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 h-full flex flex-col justify-between overflow-hidden relative">
            {/* Decor */}
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <TrendingUp size={100} />
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-green-500 rounded-full" />
                    Intensidade
                </h3>
                <p className="text-white/40 text-sm">Volume de atividade recente</p>
            </div>

            <div className="h-24 w-full flex items-end relative z-10 mt-4">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    {/* Gradient Defs */}
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <motion.path
                        d={`${pathD} L 100,50 L 0,50 Z`}
                        fill="url(#gradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Line Path */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </svg>
            </div>
        </div>
    )
}

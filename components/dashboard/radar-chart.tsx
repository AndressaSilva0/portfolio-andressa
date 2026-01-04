"use client"

import { motion } from "framer-motion"
import { Hexagon } from "lucide-react"

export function RadarChart({ repos }: { repos?: any[] }) {
    // Dynamic categorization based on repo languages
    const categories: Record<string, number> = {
        "Frontend": 0,
        "Backend": 0,
        "Data": 0,
        "Mobile": 0,
        "DevOps": 0
    }

    const languageMap: Record<string, string> = {
        "TypeScript": "Frontend", "JavaScript": "Frontend", "HTML": "Frontend", "CSS": "Frontend", "Vue": "Frontend", "React": "Frontend",
        "Python": "Data", "Java": "Backend", "Go": "Backend", "PHP": "Backend", "Ruby": "Backend", "C#": "Backend",
        "Shell": "DevOps", "Dockerfile": "DevOps",
        "Swift": "Mobile", "Kotlin": "Mobile", "Dart": "Mobile",
        "Jupyter Notebook": "Data", "R": "Data"
    }

    // Tally up counts safely
    const safeRepos = Array.isArray(repos) ? repos : []

    safeRepos.forEach(repo => {
        const lang = repo.language
        if (lang && languageMap[lang]) {
            categories[languageMap[lang]]++
        } else if (lang) {
            // Default fallback
            categories["Backend"]++
        }
    })

    // Normalize to 0-100 scale (relative to max category)
    const maxVal = Math.max(...Object.values(categories), 1) // Avoid div/0

    // Layout positions for 5 points of a pentagon
    const pentagonPoints = [
        { label: "Frontend", x: 50, y: 10 },
        { label: "Backend", x: 90, y: 35 },
        { label: "DevOps", x: 80, y: 80 },
        { label: "Mobile", x: 20, y: 80 },
        { label: "Data", x: 10, y: 35 },
    ]

    const stats = pentagonPoints.map(point => ({
        ...point,
        value: safeRepos.length > 0 ? Math.round((categories[point.label] / maxVal) * 100) : 20 // Default small value if no data
    }))

    return (
        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 h-full flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />

            <h3 className="absolute top-6 left-6 text-xl font-bold flex items-center gap-2 z-10">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                Focus Radar
            </h3>

            <div className="relative w-full h-full min-h-[200px] flex items-center justify-center mt-6">
                {/* Central Hexagon */}
                <div className="relative w-40 h-40">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-purple-500/20 rounded-full border-dashed"
                    />

                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="absolute"
                            style={{
                                top: `${stat.y}%`,
                                left: `${stat.x}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <div className="relative group cursor-default">
                                <Hexagon
                                    size={48}
                                    className="text-purple-500/20 fill-purple-500/10 group-hover:text-purple-400 group-hover:fill-purple-500/30 transition-all"
                                    strokeWidth={1}
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/60">
                                    {stat.value}
                                </div>
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-purple-300">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Center Core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 right-6 text-[10px] text-white/20">
                *Baseado em projetos públicos
            </div>
        </div>
    )
}

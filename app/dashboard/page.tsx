"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Star, GitFork, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GitHubStats } from "@/components/dashboard/github-stats"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { LanguagesChart } from "@/components/dashboard/languages-chart"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { CommitsChart } from "@/components/dashboard/commits-chart"
import { RadarChart } from "@/components/dashboard/radar-chart"
import { fetchGitHubProfile, fetchTopRepos, fetchRecentActivity, GitHubUser, GitHubRepo, GitHubEvent } from "@/lib/github"

export default function DashboardPage() {
    const [user, setUser] = useState<GitHubUser | null>(null)
    const [repos, setRepos] = useState<GitHubRepo[]>([])
    const [events, setEvents] = useState<GitHubEvent[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            try {
                const [userData, reposData, eventsData] = await Promise.all([
                    fetchGitHubProfile(),
                    fetchTopRepos(),
                    fetchRecentActivity()
                ])
                setUser(userData)
                setRepos(reposData)
                setEvents(eventsData)
            } catch (error) {
                console.error("Error loading dashboard:", error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-white/60 font-medium">Conectando ao GitHub...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Falha ao carregar dados</h2>
                    <Button asChild>
                        <Link href="/">Voltar ao Portfólio</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Profile Card - Large Square */}
                    <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-purple-900/20 to-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/30 transition-all duration-1000" />

                        {/* Back Button Restored */}
                        <div className="absolute top-6 right-6 z-20">
                            <Button asChild variant="outline" size="sm" className="border-white/10 hover:bg-white/10 text-xs rounded-full">
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-3 w-3" /> Voltar
                                </Link>
                            </Button>
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative h-32 w-32 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden"
                            >
                                <Image
                                    src={user.avatar_url}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>

                            <div className="text-center md:text-left space-y-4">
                                <div>
                                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                        {user.name}
                                    </h2>
                                    <p className="text-purple-400 font-mono">@{user.login}</p>
                                </div>

                                <p className="text-lg text-white/70 max-w-md leading-relaxed">
                                    {user.bio}
                                </p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
                                        📍 {user.location}
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
                                        📅 {new Date(user.created_at).getFullYear()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Charts Mixed */}
                    <div className="lg:col-span-1 lg:row-span-1">
                        <LanguagesChart repos={repos} />
                    </div>

                    <div className="lg:col-span-1 lg:row-span-1">
                        <ActivityChart events={events} />
                    </div>

                    {/* New Charts Row */}
                    <div className="lg:col-span-1 lg:row-span-1">
                        <RadarChart repos={repos} />
                    </div>

                    <div className="lg:col-span-1 lg:row-span-1">
                        <CommitsChart events={events} />
                    </div>

                    {/* Quick Stats Row */}
                    <div className="lg:col-span-4">
                        <GitHubStats user={user} />
                    </div>

                    {/* Recent Activity Feed - Tall Column */}
                    <div className="lg:col-span-1 lg:row-span-3 h-full">
                        <ActivityFeed events={events} />
                    </div>

                    {/* Top Repos - Wide Area */}
                    <div className="lg:col-span-3 lg:row-span-3 space-y-6">
                        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 h-full">
                            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                                <span className="w-1.5 h-8 bg-purple-500 rounded-full" />
                                Projetos em Destaque
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {repos.slice(0, 6).map((repo, index) => (
                                    <motion.a
                                        key={repo.id}
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5 }}
                                        className="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-purple-500/30 transition-all flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                                    <GitFork size={18} />
                                                </div>
                                                <ExternalLink size={16} className="text-white/20 group-hover:text-white transition-colors" />
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors truncate">
                                                {repo.name}
                                            </h3>
                                            <p className="text-white/50 text-sm line-clamp-2 h-10 mb-4">
                                                {repo.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/5 pt-4">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-purple-400" />
                                                {repo.language}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star size={12} /> {repo.stargazers_count}
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <Button variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5" asChild>
                                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                                        Ver todos os repositórios no GitHub
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

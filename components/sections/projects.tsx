"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"

const categories = [
    { id: "all", name: "Todos" },
    { id: "web", name: "Web Dev" },
    { id: "ai", name: "IA & Data" },
    { id: "cs", name: "CS & Fundamentos" },
]

export function Projects() {
    const [activeCategory, setActiveCategory] = useState("all")

    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter(p => p.category === activeCategory)

    return (
        <section id="portfolio" className="py-24 bg-background relative">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex flex-col items-center mb-16">
                    <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">Portfólio</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-8">Projetos Recentes</h2>

                    <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-secondary/30 rounded-full border border-white/10 backdrop-blur-sm">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                    ? "bg-primary text-white shadow-lg shadow-purple-500/25"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="bg-card border-white/5 overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 h-full flex flex-col">
                                    {/* Image Placeholder - In real use, use properly sized screenshots */}
                                    {/* Project Image */}
                                    <div className="relative h-48 w-full bg-card overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs text-white border border-white/10">
                                                {project.tech}
                                            </span>
                                        </div>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/60 text-sm mb-6 flex-1">
                                            {project.description}
                                        </p>

                                        <div className="flex gap-3 mt-auto">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="w-full bg-card hover:bg-purple-600 text-white border border-white/10 hover:border-purple-500 transition-all rounded-lg"
                                                asChild
                                            >
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="mr-2 h-4 w-4" /> Code
                                                </a>
                                            </Button>
                                            {/* Optional Demo Button logic could be here */}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

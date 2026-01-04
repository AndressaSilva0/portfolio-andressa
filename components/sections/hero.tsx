"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Download, Instagram, ChevronDown } from "lucide-react" // Added Download icon
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { personalInfo } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { generateCSV, generateText } from "@/lib/cv-generator"

export function Hero() {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])
    const { toast } = useToast()

    const handleDownloadClick = (e: React.MouseEvent, type: 'csv' | 'txt' | 'pdf', lang: 'pt' | 'en') => {
        if (type === 'pdf') {
            // For PDF, we let the default link behavior happen if the file exists
            // Or preventing default if we want to show a message that real PDF is static
            return
        }

        e.preventDefault()
        let content = ''
        let mimeType = ''
        let extension = ''

        if (type === 'csv') {
            content = generateCSV(lang)
            mimeType = 'text/csv;charset=utf-8;'
            extension = 'csv'
        } else if (type === 'txt') {
            content = generateText(lang)
            mimeType = 'text/plain;charset=utf-8;'
            extension = 'txt'
        }

        const blob = new Blob([content], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `Andressa_Silva_CV_${lang.toUpperCase()}.${extension}`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
            title: "Download Iniciado",
            description: `Seu CV em ${type.toUpperCase()} (${lang.toUpperCase()}) foi gerado.`,
        })
    }

    const icons = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
        instagram: Twitter // Fallback or import proper icon if available
    }

    return (
        <section id="about" className="min-h-screen flex items-center relative pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 md:space-y-6"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs md:text-sm font-medium">
                        {personalInfo.role}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                        Olá, eu sou <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">
                            {personalInfo.name}
                        </span>
                    </h1>

                    <p className="text-lg text-white/60 max-w-lg leading-relaxed">
                        {personalInfo.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button
                            className="bg-white text-purple-950 hover:bg-purple-50 rounded-full h-12 px-8 text-base font-medium shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105"
                            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Ver Projetos
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="border-white/10 text-white hover:bg-white/10 rounded-full h-12 px-8 text-base transition-all hover:scale-105"
                                >
                                    Baixar CV <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-card border-white/10 text-white min-w-[200px]">
                                <DropdownMenuLabel className="text-purple-400">Português</DropdownMenuLabel>
                                <DropdownMenuItem asChild className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    <a href="/cv-pt.pdf" download="Andressa_Silva_CV_PT.pdf">PDF Document (Static)</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'csv', 'pt')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    CSV Data (Dynamic)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'txt', 'pt')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    Text Summary (Dynamic)
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-white/10" />

                                <DropdownMenuLabel className="text-purple-400">English</DropdownMenuLabel>
                                <DropdownMenuItem asChild className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    <a href="/cv-en.pdf" download="Andressa_Silva_CV_EN.pdf">PDF Document (Static)</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'csv', 'en')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    CSV Data (Dynamic)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'txt', 'en')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    Text Summary (Dynamic)
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-4 pt-6">
                        {/* Map social links manually to icons for safety */}
                        <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-purple-400 transition-all hover:-translate-y-1">
                            <Github size={20} />
                        </a>
                        <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-purple-400 transition-all hover:-translate-y-1">
                            <Linkedin size={20} />
                        </a>
                        <a href={personalInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-purple-400 transition-all hover:-translate-y-1">
                            <Twitter size={20} />
                        </a>
                        <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-purple-400 transition-all hover:-translate-y-1">
                            <Instagram size={20} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: y1 }}
                    className="relative lg:h-[600px] flex items-center justify-center p-10"
                >
                    <div className="relative w-full max-w-sm md:max-w-md aspect-square md:aspect-[3/4]">
                        {/* Abstract shapes behind image */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-2 border-purple-500/30 scale-110"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-2 border-purple-500/30 scale-105"
                        />

                        <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm bg-card/30">
                            <Image
                                src="/andressa.jpg"
                                alt="Andressa Silva"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Modern glass overlay at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent pt-20">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm font-medium text-white">Disponível para projetos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

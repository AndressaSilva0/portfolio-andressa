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
import { generateCSV, generateText, generateLaTeX } from "@/lib/cv-generator"

export function Hero() {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])
    const { toast } = useToast()

    const handleDownloadClick = async (e: React.MouseEvent, type: 'csv' | 'txt' | 'tex' | 'pdf', lang: 'pt' | 'en') => {
        e.preventDefault()
        let content: string | Blob = ''
        let mimeType = ''
        let extension = ''

        try {
            if (type === 'csv') {
                content = generateCSV(lang)
                mimeType = 'text/csv;charset=utf-8'
                extension = 'csv'
            } else if (type === 'txt') {
                content = generateText(lang)
                mimeType = 'text/plain;charset=utf-8'
                extension = 'txt'
            } else if (type === 'tex') {
                content = generateLaTeX(lang)
                mimeType = 'application/x-tex;charset=utf-8'
                extension = 'tex'
            } else if (type === 'pdf') {
                // Fetch static PDF file
                const pdfPath = lang === 'pt' ? '/cv-pt.pdf' : '/cv-en.pdf'
                const response = await fetch(pdfPath)
                if (!response.ok) throw new Error('PDF file not found')
                content = await response.blob()
                mimeType = 'application/pdf'
                extension = 'pdf'
            }

            // Generate timestamp for filename: portfolio-andressa-YYYY-MM-DD-HH-mm
            const now = new Date()
            const dateStr = now.toISOString().slice(0, 10) // YYYY-MM-DD
            const timeStr = now.toTimeString().slice(0, 5).replace(':', '-') // HH-mm
            const filename = `portfolio-andressa-${dateStr}-${timeStr}.${extension}`

            // Use File constructor for better browser compatibility with filenames
            const file = new File([content], filename, { type: mimeType })
            const url = URL.createObjectURL(file)

            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', filename)

            // Append to body to ensure click works in all browsers (Firefox requirement)
            document.body.appendChild(link)
            link.click()

            // Cleanup with slight delay
            setTimeout(() => {
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
            }, 100)

            toast({
                title: "Download Iniciado",
                description: `Arquivo ${filename} salvo.`,
            })
        } catch (error) {
            console.error("Download failed:", error)
            toast({
                title: "Erro no Download",
                description: "Não foi possível baixar o arquivo. Tente novamente.",
                variant: "destructive",
            })
        }
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
                    className="space-y-4 md:space-y-6 order-2 sm:order-1"
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
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'pdf', 'pt')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    PDF Document (Static)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'csv', 'pt')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    CSV Data (Dynamic)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'txt', 'pt')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    Text Summary (Dynamic)
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'tex', 'pt')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    LaTeX Source (Dynamic)
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-white/10" />

                                <DropdownMenuLabel className="text-purple-400">English</DropdownMenuLabel>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'pdf', 'en')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    PDF Document (Static)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'csv', 'en')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    CSV Data (Dynamic)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'txt', 'en')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    Text Summary (Dynamic)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleDownloadClick(e, 'tex', 'en')} className="hover:bg-white/5 cursor-pointer focus:bg-white/5 focus:text-white">
                                    LaTeX Source (Dynamic)
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
                    className="relative lg:h-[600px] flex items-center justify-center p-10 order-1 sm:order-2"
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

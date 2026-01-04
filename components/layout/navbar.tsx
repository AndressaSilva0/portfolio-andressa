"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/data"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setMobileMenuOpen(false)
        }
    }

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-lg border-b border-white/5" : "py-5 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-600 to-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/20"
                    >
                        <span className="text-white font-bold text-lg">A</span>
                    </motion.div>
                    <span className="text-white font-bold text-lg tracking-tight group-hover:text-purple-300 transition-colors">
                        Portfolio
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-1">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5"
                        >
                            {item.name}
                        </a>
                    ))}
                    <Link
                        href="/dashboard"
                        className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5 flex items-center gap-2"
                    >
                        Dashboard
                        <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
                    </Link>
                </div>

                <div className="hidden md:block">
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg shadow-purple-500/25"
                        onClick={(e) => {
                            const element = document.querySelector("#contact")
                            if (element) element.scrollIntoView({ behavior: "smooth" })
                        }}
                    >
                        <Mail className="mr-2 h-4 w-4" /> Contato
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white/70 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-xl border-t border-white/5 absolute top-full left-0 right-0 shadow-2xl"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="block py-3 text-white/70 hover:text-white hover:bg-white/5 px-4 rounded-lg"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-3 text-white/70 hover:text-white hover:bg-white/5 px-4 rounded-lg flex items-center justify-between"
                            >
                                Dashboard
                                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

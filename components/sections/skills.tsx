"use client"

import { motion } from "framer-motion"
import { skills } from "@/lib/data"
import Image from "next/image"

export function Skills() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-card">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">Habilidades</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">Minha Stack Tecnológica</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Ferramentas e tecnologias que utilizo para dar vida aos projetos.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Technical Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/50 rounded-3xl p-8 border border-white/5"
                    >
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-purple-500 rounded-full" />
                            Tecnologias
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {skills.technical.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                                    className="p-4 rounded-xl bg-card/50 border border-white/5 flex flex-col items-center justify-center gap-3 transition-colors cursor-default"
                                >
                                    <div className="relative h-12 w-12 grayscale hover:grayscale-0 transition-all">
                                        {/* Note: In a real environment, verify these paths exist. I'm using component paths if strings, assuming the file copy will happen or exists */}
                                        {/* As per user request, using simple colored dots or icons if image fails would be fallback, but trying provided paths */}
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="object-contain w-full h-full"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerText = '🛠️'; // Fallback
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-white/80">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Areas of Knowledge */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/50 rounded-3xl p-8 border border-white/5"
                    >
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-purple-500 rounded-full" />
                            Áreas de Atuação
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skills.areas.map((area, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    className="p-4 rounded-xl bg-card/50 border border-white/5 flex items-center gap-4 group"
                                >
                                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                        <area.icon size={20} />
                                    </div>
                                    <span className="text-white/80 font-medium text-sm group-hover:text-purple-300 transition-colors">
                                        {area.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Languages */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/50 rounded-3xl p-8 border border-white/5 lg:col-span-2"
                    >
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-purple-500 rounded-full" />
                            Idiomas
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {skills.languages.map((lang, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-6 rounded-xl bg-card border border-white/5 relative overflow-hidden group"
                                >
                                    {/* Progress Background */}
                                    <div
                                        className="absolute bottom-0 left-0 h-1 bg-purple-500/20 w-full"
                                    >
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                                            style={{ width: `${lang.percent}%` }}
                                        />
                                    </div>

                                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                                        {lang.name}
                                    </h4>
                                    <p className="text-white/60 text-sm font-medium">
                                        {lang.level}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

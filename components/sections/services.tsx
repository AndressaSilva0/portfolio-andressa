"use client"

import { motion } from "framer-motion"
import { services } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function Services() {
    return (
        <section id="services" className="py-24 relative overflow-hidden bg-card/30">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">O que eu faço</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">Meus Serviços</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-purple-800 mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-card/50 border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                                <CardContent className="p-8">
                                    <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 text-purple-400">
                                        <service.icon size={28} />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-white/60 mb-6 text-sm leading-relaxed">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-white/80">
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

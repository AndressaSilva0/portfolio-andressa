"use client"

import emailjs from "@emailjs/browser"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { personalInfo } from "@/lib/data"

export function Contact() {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos obrigatórios.",
                variant: "destructive",
            })
            setIsSubmitting(false)
            return
        }

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
            toast({
                title: "Configuração incompleta",
                description: "As chaves do EmailJS não foram configuradas. Por favor, verifique o arquivo .env.",
                variant: "destructive",
            })
            setIsSubmitting(false)
            return
        }

        const templateParams = {
            name: formData.name,
            email: formData.email,
            title: formData.subject,
            message: formData.message,
        }

        try {
            await emailjs.send(serviceId, templateId, templateParams, publicKey)

            toast({
                title: "Mensagem Enviada!",
                description: "Obrigado por entrar em contato. Responderei em breve.",
            })

            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error: any) {
            console.error("FAILED...", error)
            // EmailJS often returns an error object with a 'text' property
            if (error.text) {
                console.error("EmailJS Error Text:", error.text)
            }
            toast({
                title: "Erro ao enviar",
                description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-purple-400 font-medium tracking-wider uppercase text-sm">Contato</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">Vamos Trabalhar Juntos?</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Tem um projeto em mente? Entre em contato e vamos transformar suas ideias em realidade.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardContent className="p-8 space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Email</h4>
                                        <p className="text-white/60 text-sm">Entre em contato via email</p>
                                        <a href={`mailto:${personalInfo.contact.email}`} className="text-white hover:text-purple-400 transition-colors bg-clip-border border-b border-purple-500/30">
                                            {personalInfo.contact.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Telefone</h4>
                                        <p className="text-white/60 text-sm">Seg-Sex das 9h às 18h</p>
                                        <a href={`tel:${personalInfo.contact.phone}`} className="text-white hover:text-purple-400 transition-colors">
                                            {personalInfo.contact.phone}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Localização</h4>
                                        <p className="text-white/60 text-sm">Disponível para trabalho remoto</p>
                                        <span className="text-white">Imperatriz, Maranhão, Brasil</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Input
                                        name="name"
                                        placeholder="Seu Nome"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="bg-card border-white/5 focus:border-purple-500 h-12"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Seu Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="bg-card border-white/5 focus:border-purple-500 h-12"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Input
                                    name="subject"
                                    placeholder="Assunto"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="bg-gray-900 border-gray-800 focus:border-purple-500 h-12"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    name="message"
                                    placeholder="Sua Mensagem"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="bg-card border-white/5 focus:border-purple-500 min-h-[150px]"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">Enviando...</span>
                                ) : (
                                    <span className="flex items-center">Enviar Mensagem <Send className="ml-2 h-4 w-4" /></span>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

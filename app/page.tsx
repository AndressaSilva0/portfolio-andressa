"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  ArrowRight,
  Code,
  Database,
  Brain,
  CheckCircle2,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"

export default function Home() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [activeTab, setActiveTab] = useState("all")
  const [skillValues, setSkillValues] = useState({
    python: 0,
    react: 0,
    django: 0,
    angular: 0,
    ai: 0,
  })

  // Refs for scrolling and animations
  const aboutRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const portfolioRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Refs for parallax effects
  const parallaxRef = useRef(null)

  // Scroll progress for parallax
  const { scrollYProgress } = useScroll()
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Parallax values
  const parallaxY1 = useTransform(smoothScrollYProgress, [0, 1], [0, -100])
  const parallaxY2 = useTransform(smoothScrollYProgress, [0, 1], [0, -200])
  const parallaxY3 = useTransform(smoothScrollYProgress, [0, 1], [0, -300])
  const parallaxRotate = useTransform(smoothScrollYProgress, [0, 1], [0, 45])
  const parallaxScale = useTransform(smoothScrollYProgress, [0, 1], [1, 1.2])

  // Animation on scroll
  const [isVisible, setIsVisible] = useState({
    about: false,
    services: false,
    skills: false,
    portfolio: false,
    process: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { name: "about", ref: aboutRef },
        { name: "services", ref: servicesRef },
        { name: "skills", ref: skillsRef },
        { name: "portfolio", ref: portfolioRef },
        { name: "process", ref: processRef },
      ]

      sections.forEach(({ name, ref }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
            setIsVisible((prev) => ({ ...prev, [name]: true }))

            // Animate skill bars when skills section is visible
            if (name === "skills" && !isVisible.skills) {
              setTimeout(() => {
                setSkillValues({
                  python: 90,
                  react: 85,
                  django: 88,
                  angular: 80,
                  ai: 75,
                })
              }, 300)
            }
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible.skills])

  // Scroll function
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle CV download
  const handleDownloadCV = () => {
    toast({
      title: "Download do CV",
      description: "O download do seu CV começou.",
    })

    // Create a sample text file for demonstration
    const element = document.createElement("a")
    const file = new Blob(["This is a sample CV file."], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "sample-cv.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData)

    toast({
      title: "Mensagem Enviada",
      description: "Obrigado pela sua mensagem. Entrarei em contato em breve!",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  // Handle view project
  const handleViewProject = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId)

    if (project && project.githubUrl) {
      // Abrir o link do GitHub em uma nova aba
      window.open(project.githubUrl, "_blank")
    } else {
      toast({
        title: "Projeto Selecionado",
        description: `Você selecionou o projeto #${projectId}. Adicione um link do GitHub para este projeto.`,
      })
    }
  }

  // Handle view more projects
  const handleViewMoreProjects = () => {
    toast({
      title: "Mais Projetos",
      description: "Isso carregaria mais projetos em uma aplicação real.",
    })
  }

  // Portfolio projects
  const projects = [
    {
      id: 1,
      title: "AI-Powered Analytics Dashboard",
      tech: "Django, React, Machine Learning",
      category: "ai",
      image: "/placeholder.svg?height=300&width=400",
      githubUrl: "https://github.com/yourusername/project1",
    },
    {
      id: 2,
      title: "NLP Document Classifier",
      tech: "Python, LangChain, LLMs",
      category: "ai",
      image: "/placeholder.svg?height=300&width=400",
      githubUrl: "https://github.com/yourusername/project2",
    },
    {
      id: 3,
      title: "E-commerce Platform",
      tech: "Django, Angular, SQLite",
      category: "web",
      image: "/placeholder.svg?height=300&width=400",
      githubUrl: "https://github.com/yourusername/project3",
    },
    {
      id: 4,
      title: "Computer Vision App",
      tech: "Python, OpenCV, TensorFlow",
      category: "ai",
      image: "/placeholder.svg?height=300&width=400",
      githubUrl: "https://github.com/yourusername/project4",
    },
    {
      id: 5,
      title: "Real-time Chat Application",
      tech: "Node.js, React, TypeScript",
      category: "web",
      image: "/placeholder.svg?height=300&width=400",
      githubUrl: "https://github.com/yourusername/project5",
    },
    {
      id: 6,
      title: "Data Visualization Platform",
      tech: "Django, D3.js, Tailwind",
      category: "data",
      image: "/placeholder.svg?height=300&width=400",
      githubUrl: "https://github.com/yourusername/project6",
    },
  ]

  // Filtered projects
  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  // Services data
  const services = [
    {
      title: "Desenvolvimento Full Stack",
      icon: <Code className="h-7 w-7 text-purple-400 group-hover:text-white transition-colors duration-300" />,
      description: "Construindo aplicações web completas com Django, React, Angular e Node.js.",
      features: [
        "Desenvolvimento Frontend Responsivo",
        "APIs RESTful e GraphQL",
        "Bancos de Dados SQL e NoSQL",
        "Autenticação e Autorização",
      ],
    },
    {
      title: "IA & Machine Learning",
      icon: <Brain className="h-7 w-7 text-purple-400 group-hover:text-white transition-colors duration-300" />,
      description: "Desenvolvendo aplicações inteligentes com machine learning, deep learning e NLP.",
      features: [
        "Modelos de Machine Learning",
        "Processamento de Linguagem Natural",
        "Integração com LLMs",
        "Análise Preditiva",
      ],
    },
    {
      title: "Ciência de Dados & Análises",
      icon: <Database className="h-7 w-7 text-purple-400 group-hover:text-white transition-colors duration-300" />,
      description: "Transformando dados em insights acionáveis para inteligência de negócios.",
      features: [
        "Visualização de Dados",
        "ETL e Processamento de Dados",
        "Dashboards Interativos",
        "Relatórios Automatizados",
      ],
    },
  ]

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] },
    },
  }

  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const slideFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  const pulseAnimation = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  const rotateAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950 relative overflow-hidden">
      {/* Animated Decorative Elements */}
      <motion.div
        style={{ y: parallaxY1 }}
        className="absolute top-20 right-20 w-24 h-24 rounded-full bg-purple-500/10 blur-xl"
      />
      <motion.div
        style={{ y: parallaxY2 }}
        className="absolute top-40 left-10 w-16 h-16 rounded-full bg-purple-300/10 blur-lg"
      />
      <motion.div
        style={{ y: parallaxY3 }}
        className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-purple-400/10 blur-xl"
      />

      {/* Animated Geometric Decorations */}
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-purple-400"
      />
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-purple-300"
      />
      <motion.div
        variants={pulseAnimation}
        initial="initial"
        animate="animate"
        className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-purple-500"
      />
      <motion.div
        style={{ rotate: parallaxRotate }}
        className="absolute top-1/2 right-1/3 w-4 h-4 border-2 border-purple-500/30 rotate-45"
      />
      <motion.div
        variants={rotateAnimation}
        initial="initial"
        animate="animate"
        className="absolute bottom-1/3 left-1/4 w-6 h-6 border-2 border-purple-400/20 rounded-full"
      />
      <motion.div
        style={{ rotate: parallaxRotate, scale: parallaxScale }}
        className="absolute top-1/4 right-1/5 w-8 h-8 border-2 border-purple-500/10 rotate-12"
      />

      {/* Animated Dot Grid Patterns */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute left-10 top-1/4 grid grid-cols-3 gap-2 opacity-20"
      >
        {[...Array(9)].map((_, i) => (
          <motion.div key={i} variants={itemFadeIn} className="w-1 h-1 rounded-full bg-purple-400" />
        ))}
      </motion.div>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute right-20 bottom-1/3 grid grid-cols-4 gap-2 opacity-20"
      >
        {[...Array(16)].map((_, i) => (
          <motion.div key={i} variants={itemFadeIn} className="w-1 h-1 rounded-full bg-purple-300" />
        ))}
      </motion.div>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto py-4 relative z-10"
      >
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center"
            >
              <span className="text-white font-bold">P</span>
            </motion.div>
            <span className="text-white font-semibold">Portfolio</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {["Sobre", "Serviços", "Habilidades", "Processo", "Portfólio", "Contato"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() =>
                  scrollToSection([aboutRef, servicesRef, skillsRef, processRef, portfolioRef, contactRef][index])
                }
                className="text-gray-300 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-full"
              onClick={() => scrollToSection(contactRef)}
            >
              <Mail className="mr-2 h-4 w-4" /> Contato
            </Button>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 md:py-32 relative" ref={aboutRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-purple-900/30 px-4 py-1 rounded-full text-purple-300 text-sm font-medium mb-2">
              Desenvolvedor Full Stack & Especialista em IA
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="text-white block">Olá, eu sou</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 block">
                Desenvolvedor Full Stack
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-md">
              Especializado em Python, Django, React, Angular e tecnologias de IA/ML. Construindo aplicações web
              inteligentes e escaláveis.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-full px-6"
                onClick={() => scrollToSection(portfolioRef)}
              >
                Ver Meus Projetos
              </Button>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-full px-6"
                onClick={handleDownloadCV}
              >
                Baixar CV
              </Button>
            </div>
            <div className="flex items-center space-x-4 pt-6">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            {/* Geometric frame around image */}
            <div className="relative h-[400px] w-[300px] md:h-[450px] md:w-[350px]">
              <div className="absolute -top-4 -left-4 w-full h-full bg-purple-600/20 transform rotate-6 rounded-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-purple-400/20 transform -rotate-6 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-purple-700/20 blur-2xl"></div>
              <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-purple-500/50 z-10">
                <Image
                  src="/placeholder.svg?height=450&width=350"
                  alt="Developer"
                  width={350}
                  height={450}
                  className="object-cover h-full w-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium z-20">
                2 Anos de Experiência
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="container mx-auto py-20 px-4 relative">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-purple-400 border-purple-400 mb-4">
            Meus Serviços
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Serviços Especializados! Confira</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Fornecendo serviços de desenvolvimento de alta qualidade e soluções para o seu negócio
          </p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemFadeIn}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="bg-gradient-to-b from-gray-900 to-gray-900/80 border-0 shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden group h-full">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform origin-left"
                />
                <CardContent className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="h-14 w-14 rounded-2xl bg-purple-900/50 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300"
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <motion.ul variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
                    {service.features.map((feature, i) => (
                      <motion.li key={i} variants={itemFadeIn} className="flex items-center text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="container mx-auto py-20 px-4 relative">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-purple-400 border-purple-400 mb-4">
            Minhas Habilidades
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tecnologias com as quais trabalho</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">As tecnologias e ferramentas em que sou especializado:</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 relative">
              {/* Decorative elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-600/10 rounded-full"
              />

              <h3 className="text-xl font-bold text-white mb-8 relative">
                Habilidades Técnicas
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "5rem" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-purple-500 mt-2"
                />
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {[
                  { name: "Python", icon: "P" },
                  { name: "React", icon: "R" },
                  { name: "Django", icon: "D" },
                  { name: "Angular", icon: "A" },
                  { name: "Node.js", icon: "N" },
                  { name: "TypeScript", icon: "TS" },
                  { name: "JavaScript", icon: "JS" },
                  { name: "HTML/CSS", icon: "H" },
                  { name: "SQL", icon: "S" },
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeIn}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(126, 34, 206, 0.2)" }}
                    className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg transition-colors"
                  >
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="h-8 w-8 rounded-full bg-purple-800/50 flex items-center justify-center"
                    >
                      <span className="text-purple-300 text-sm font-bold">{skill.icon}</span>
                    </motion.div>
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 h-full relative">
              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-4 -left-4 w-8 h-8 border-2 border-purple-500/30 rotate-45"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 w-12 h-12 border-2 border-purple-600/20 rounded-full"
              />

              <h3 className="text-xl font-bold text-white mb-8 relative">
                Áreas de Conhecimento
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "5rem" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-1 bg-purple-500 mt-2"
                />
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {[
                  { name: "Desenvolvimento Frontend", icon: "frontend" },
                  { name: "Desenvolvimento Backend", icon: "backend" },
                  { name: "Bancos de Dados", icon: "database" },
                  { name: "DevOps", icon: "devops" },
                  { name: "UI/UX Design", icon: "design" },
                  { name: "Inteligência Artificial", icon: "ai" },
                  { name: "Ciência de Dados", icon: "data" },
                  { name: "APIs RESTful", icon: "api" },
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeIn}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(126, 34, 206, 0.2)" }}
                    className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg transition-colors"
                  >
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="h-8 w-8 rounded-full bg-purple-800/50 flex items-center justify-center"
                    >
                      <span className="text-purple-300 text-sm font-bold">{skill.name.charAt(0)}</span>
                    </motion.div>
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" ref={processRef} className="container mx-auto py-20 px-4 relative">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-purple-400 border-purple-400 mb-4">
            Processo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meu Processo de Trabalho</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Como abordo projetos do início ao fim</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            {
              step: 1,
              title: "Análise de Requisitos",
              description:
                "Compreendendo suas necessidades e objetivos do projeto. Definindo escopo, recursos e requisitos técnicos.",
            },
            {
              step: 2,
              title: "Design & Desenvolvimento",
              description:
                "Criando arquitetura e implementando soluções. Construindo código robusto, escalável e de fácil manutenção.",
            },
            {
              step: 3,
              title: "Testes & Implantação",
              description:
                "Testes completos e garantia de qualidade. Implantação perfeita e suporte contínuo para o seu projeto.",
            },
          ].map((process, index) => (
            <div key={index} className="relative">
              {index < 2 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute top-10 right-0 h-0.5 bg-purple-500/30 hidden md:block"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-8 right-0 md:left-full transform md:translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center z-10 hidden md:flex"
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </>
              )}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-gradient-to-b from-gray-900 to-gray-900/80 border-0 shadow-xl hover:shadow-purple-500/10 transition-all duration-300 relative h-full">
                  {/* Decorative element */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className={`absolute ${index === 0 ? "-top-4 -left-4" : index === 1 ? "-top-4 -right-4" : "-bottom-4 -right-4"} w-8 h-8 ${index === 1 ? "border-2 border-purple-500/30 rotate-45" : "bg-purple-500/20 rounded-full"}`}
                  />
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="h-14 w-14 rounded-full bg-purple-900/50 flex items-center justify-center mb-6 text-2xl font-bold text-purple-400"
                    >
                      {process.step}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                    <p className="text-gray-400">{process.description}</p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="mt-6 flex items-center text-purple-400 group cursor-pointer"
                    >
                      <span className="text-sm font-medium group-hover:underline">Saiba mais</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={portfolioRef} className="container mx-auto py-20 px-4 relative">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-purple-400 border-purple-400 mb-4">
            Portfólio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projetos Digitais</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Confira alguns dos meus trabalhos recentes</p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-10"
        >
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <TabsList className="bg-gray-900/50 backdrop-blur-sm">
                {[
                  { value: "all", label: "Todos Projetos" },
                  { value: "web", label: "Desenvolvimento Web" },
                  { value: "ai", label: "IA & ML" },
                  { value: "data", label: "Ciência de Dados" },
                ].map((tab, index) => (
                  <motion.div
                    key={tab.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <TabsTrigger value={tab.value} className="data-[state=active]:bg-purple-600">
                      {tab.label}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>

            <AnimatePresence mode="wait">
              <TabsContent value={activeTab} className="mt-0">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={itemFadeIn}
                      whileHover={{ y: -10 }}
                      className="group relative overflow-hidden rounded-xl"
                    >
                      {/* Geometric frame for project image */}
                      <motion.div
                        initial={{ rotate: 3 }}
                        whileHover={{ rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-purple-600/10 rounded-xl"
                      />
                      <motion.div className="relative z-10">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-gray-900/40 flex flex-col justify-end p-6 rounded-xl"
                        >
                          <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-white text-xl font-bold"
                          >
                            {project.title}
                          </motion.h3>
                          <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="text-gray-200 mt-2"
                          >
                            {project.tech}
                          </motion.p>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="mt-4"
                          >
                            <Button
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                              onClick={() => handleViewProject(project.id)}
                            >
                              Ver Projeto
                            </Button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-full px-6"
            onClick={handleViewMoreProjects}
          >
            Ver Mais Projetos
          </Button>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="container mx-auto py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-900/20 to-purple-700/20 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"
          />

          {/* Geometric decorations */}
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-10 right-10 w-8 h-8 border-2 border-purple-500/30 rotate-45"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 w-12 h-12 border-2 border-purple-400/20 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-purple-500/50"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-purple-400/50"
          />

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16 relative z-10"
          >
            <Badge variant="outline" className="text-purple-400 border-purple-400 mb-4">
              Contato
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tem um Projeto? Vamos Conversar</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Tem um projeto em mente? Vamos trabalhar juntos!</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Entre em Contato</h3>
              <p className="text-gray-300">
                Estou interessado em oportunidades freelance – especialmente projetos ambiciosos ou de grande porte. No
                entanto, se você tiver outras solicitações ou perguntas, não hesite em me contatar.
              </p>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                {[
                  { icon: <Mail className="h-5 w-5 text-purple-400" />, text: "hello@example.com" },
                  { icon: <Phone className="h-5 w-5 text-purple-400" />, text: "+1 (555) 123-4567" },
                  { icon: <MapPin className="h-5 w-5 text-purple-400" />, text: "São Paulo, Brasil" },
                ].map((item, index) => (
                  <motion.div key={index} variants={itemFadeIn} className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="h-10 w-10 rounded-full bg-purple-900/50 flex items-center justify-center"
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex space-x-4 pt-4"
              >
                {[Github, Linkedin, Twitter].map((Icon, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
                    >
                      <Icon size={20} />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 relative">
                {/* Decorative elements */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-600/10 rounded-full"
                />

                <h3 className="text-2xl font-bold text-white mb-6">Envie uma Mensagem</h3>
                <motion.form
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemFadeIn} className="space-y-2">
                      <label htmlFor="name" className="text-gray-300 block">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300"
                        placeholder="Seu Nome"
                      />
                    </motion.div>
                    <motion.div variants={itemFadeIn} className="space-y-2">
                      <label htmlFor="email" className="text-gray-300 block">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300"
                        placeholder="Seu Email"
                      />
                    </motion.div>
                  </div>
                  <motion.div variants={itemFadeIn} className="space-y-2">
                    <label htmlFor="subject" className="text-gray-300 block">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300"
                      placeholder="Assunto"
                    />
                  </motion.div>
                  <motion.div variants={itemFadeIn} className="space-y-2">
                    <label htmlFor="message" className="text-gray-300 block">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300"
                      placeholder="Sua Mensagem"
                    ></textarea>
                  </motion.div>
                  <motion.div variants={itemFadeIn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-full py-3"
                    >
                      Enviar Mensagem
                    </Button>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto py-16 px-4"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 relative">
          {/* Geometric decorations */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-600/10 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-purple-500/50"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-purple-400/50"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Inscreva-se Para Receber Atualizações</h3>
              <p className="text-gray-300">
                Fique atualizado com meus últimos projetos, artigos e insights sobre desenvolvimento full stack e IA.
              </p>
            </motion.div>
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                placeholder="Digite seu email"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-lg">
                  Inscrever-se
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-950 py-8 border-t border-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center"
              >
                <span className="text-white font-bold">P</span>
              </motion.div>
              <span className="text-white font-semibold">Portfolio</span>
            </Link>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex space-x-6 my-6 md:my-0"
            >
              {["Sobre", "Serviços", "Portfólio", "Contato"].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection([aboutRef, servicesRef, portfolioRef, contactRef][index])}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  variants={itemFadeIn}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex space-x-4">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Todos os direitos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Termos de Serviço
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

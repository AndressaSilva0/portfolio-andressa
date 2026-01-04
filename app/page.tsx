import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"


export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b15] text-white">
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <Contact />
      <footer className="py-8 bg-gray-950 text-center border-t border-gray-900">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Andressa Silva. All rights reserved.
        </p>
      </footer>
    </main>
  )
}

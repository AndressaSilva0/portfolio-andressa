
import fs from 'fs'
import PDFDocument from 'pdfkit'
import { personalInfo, skills, projects } from '../lib/data'
import path from 'path'

const generatePDF = (lang: 'pt' | 'en', outputPath: string) => {
    // Layout Constants
    const doc = new PDFDocument({ margin: 0, size: 'A4' }) // Custom margins
    const stream = fs.createWriteStream(outputPath)
    const isPt = lang === 'pt'

    doc.pipe(stream)

    // Colors
    const COLORS = {
        primary: '#7c3aed', // Purple 600
        secondary: '#a78bfa', // Purple 400
        sidebarBg: '#1e1b4b', // Dark Purple (Indigo 950)
        sidebarText: '#e0e7ff', // Indigo 100
        text: '#333333',
        gray: '#6b7280'
    }

    // Dimensions
    const PAGE_WIDTH = 595.28
    const PAGE_HEIGHT = 841.89
    const SIDEBAR_WIDTH = 180
    const CONTENT_MARGIN = 40

    // --- SIDEBAR ---
    doc.rect(0, 0, SIDEBAR_WIDTH, PAGE_HEIGHT).fill(COLORS.sidebarBg)

    // Profile Image
    try {
        const imagePath = path.join(process.cwd(), 'public', 'andressa.jpg')
        if (fs.existsSync(imagePath)) {
            doc.save()
            doc.circle(SIDEBAR_WIDTH / 2, 80, 50).clip()
            doc.image(imagePath, SIDEBAR_WIDTH / 2 - 50, 30, { width: 100, height: 100, cover: [100, 100], align: 'center' })
            doc.restore()
        }
    } catch (e) {
        console.error("Image loading failed", e)
    }

    let yPos = 160
    const sidebarX = 20
    const sidebarContentWidth = SIDEBAR_WIDTH - 40

    // Contact Logic
    const drawSidebarSection = (title: string, items: string[]) => {
        doc.fillColor(COLORS.secondary).fontSize(12).font('Helvetica-Bold')
            .text(title.toUpperCase(), sidebarX, yPos)
        yPos += 20
        doc.fillColor(COLORS.sidebarText).fontSize(9).font('Helvetica')

        items.forEach(item => {
            doc.text(item, sidebarX, yPos, { width: sidebarContentWidth })
            yPos += doc.heightOfString(item, { width: sidebarContentWidth }) + 6
        })
        yPos += 15
    }

    // Contact Data
    const contactTitle = isPt ? "CONTATO" : "CONTACT"
    const contactItems = [
        personalInfo.contact.email,
        personalInfo.contact.phone,
        'LinkedIn: /in/andressa-silva',
        'GitHub: /AndressaSilva0'
    ]
    drawSidebarSection(contactTitle, contactItems)

    // Skills Data
    const skillsTitle = isPt ? "HABILIDADES" : "SKILLS"
    // Split skills to list
    const skillList = skills.technical.map(s => s.name)
    drawSidebarSection(skillsTitle, skillList)

    // Languages Data
    const langTitle = isPt ? "IDIOMAS" : "LANGUAGES"
    const langItems = skills.languages?.map(l => `${l.name} - ${l.level} `) || []
    drawSidebarSection(langTitle, langItems)


    // --- MAIN CONTENT ---
    const mainX = SIDEBAR_WIDTH + CONTENT_MARGIN
    const mainWidth = PAGE_WIDTH - SIDEBAR_WIDTH - (CONTENT_MARGIN * 2)
    let mainY = 50

    // Header
    doc.fillColor(COLORS.primary).fontSize(28).font('Helvetica-Bold')
        .text(personalInfo.name.toUpperCase(), mainX, mainY)

    mainY += 35
    const role = isPt ? personalInfo.role : (personalInfo['roleEn'] || personalInfo.role)
    doc.fillColor(COLORS.text).fontSize(14).font('Helvetica')
        .text(role, mainX, mainY)

    // Summary
    mainY += 40
    const desc = isPt ? personalInfo.description : (personalInfo['descriptionEn'] || personalInfo.description)
    doc.moveTo(mainX, mainY - 10).lineTo(PAGE_WIDTH - CONTENT_MARGIN, mainY - 10).lineWidth(0.5).strokeColor(COLORS.gray).stroke()

    doc.fillColor(COLORS.text).fontSize(10).font('Helvetica')
        .text(desc, mainX, mainY, { width: mainWidth, align: 'justify', lineGap: 4 })

    mainY += doc.heightOfString(desc, { width: mainWidth }) + 30

    // Projects
    doc.fillColor(COLORS.primary).fontSize(16).font('Helvetica-Bold')
        .text(isPt ? "PROJETOS SELECIONADOS" : "SELECTED PROJECTS", mainX, mainY)

    mainY += 25

    projects.slice(0, 8).forEach(p => { // Limit to fit on one page strictly or handle pagination (simple version)
        if (mainY > 750) return // Simple overflow protection

        const pTitle = isPt ? p.title : (p['titleEn'] || p.title)
        const pDesc = isPt ? p.description : (p['descriptionEn'] || p.description)

        // Project Title
        doc.fillColor('#000000').fontSize(12).font('Helvetica-Bold').text(pTitle, mainX, mainY)
        const titleHeight = doc.heightOfString(pTitle, { width: mainWidth })

        mainY += titleHeight + 2

        // Tech tags (simulated)
        doc.fillColor(COLORS.primary).fontSize(10).font('Helvetica-Oblique')
            .text(p.tech, mainX, mainY)

        mainY += 15

        // Description
        doc.fillColor(COLORS.gray).fontSize(10).font('Helvetica')
            .text(pDesc, mainX, mainY, { width: mainWidth, lineGap: 2 })

        mainY += doc.heightOfString(pDesc, { width: mainWidth }) + 15
    })

    // Footer
    doc.text('.', 0, PAGE_HEIGHT - 10) // buffer

    doc.end()
    console.log(`Generated styled PDF at ${outputPath} `)
}

const main = () => {
    console.log('Generating Styled PDFs...')
    // Ensure public directory exists
    if (!fs.existsSync('public')) fs.mkdirSync('public')

    generatePDF('pt', 'public/cv-pt.pdf')
    generatePDF('en', 'public/cv-en.pdf')
}

main()

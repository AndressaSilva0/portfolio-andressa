import fs from 'fs'
import PDFDocument from 'pdfkit'
import { personalInfo, skills, projects } from '../lib/data'

// Since we are running this with tsx, we can import from lib/data directly.
// Need to handle potential differences in module resolution if any.

const generatePDF = (lang: 'pt' | 'en', outputPath: string) => {
    const doc = new PDFDocument({ margin: 50 })
    const stream = fs.createWriteStream(outputPath)

    doc.pipe(stream)

    const isPt = lang === 'pt'

    // Data Helpers
    const role = isPt ? personalInfo.role : (personalInfo['roleEn'] || personalInfo.role)
    const description = isPt ? personalInfo.description : (personalInfo['descriptionEn'] || personalInfo.description)

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text(personalInfo.name)
    doc.fontSize(14).font('Helvetica').text(role, { color: 'gray' })
    doc.moveDown()

    // Contact
    doc.fontSize(10).font('Helvetica').fillColor('black')
    doc.text(`${personalInfo.contact.email} | ${personalInfo.contact.phone}`)
    doc.text(`LinkedIn: ${personalInfo.social.linkedin}`)
    doc.text(`GitHub: ${personalInfo.social.github}`)
    doc.moveDown(2)

    // Summary
    doc.fontSize(16).font('Helvetica-Bold').text(isPt ? 'Resumo' : 'Summary')
    doc.moveDown(0.5)
    doc.fontSize(11).font('Helvetica').text(description, { align: 'justify' })
    doc.moveDown(2)

    // Skills
    doc.fontSize(16).font('Helvetica-Bold').text(isPt ? 'Habilidades' : 'Skills')
    doc.moveDown(0.5)
    doc.fontSize(11).font('Helvetica').text(skills.technical.map(s => s.name).join(', '))
    doc.moveDown(2)

    // Projects
    doc.fontSize(16).font('Helvetica-Bold').text(isPt ? 'Projetos' : 'Projects')
    doc.moveDown(0.5)

    projects.forEach(p => {
        const title = isPt ? p.title : (p['titleEn'] || p.title)
        const desc = isPt ? p.description : (p['descriptionEn'] || p.description)

        doc.fontSize(12).font('Helvetica-Bold').text(title)
        doc.fontSize(10).font('Helvetica-Oblique').text(p.tech, { color: 'gray' })
        doc.fontSize(11).font('Helvetica').fillColor('black').text(desc)
        doc.moveDown()
    })

    doc.end()

    console.log(`Generated ${outputPath}`)
}

const main = () => {
    console.log('Generating PDFs...')
    generatePDF('pt', 'public/cv-pt.pdf')
    generatePDF('en', 'public/cv-en.pdf')
}

main()

import { personalInfo, skills, projects } from "./data"

// Helper to get translated project fields
const getProjectData = (p: any, isPt: boolean) => ({
    title: isPt ? p.title : (p.titleEn || p.title),
    description: isPt ? p.description : (p.descriptionEn || p.description),
    tech: p.tech
})

const getPersonalInfo = (isPt: boolean) => ({
    role: isPt ? personalInfo.role : (personalInfo.roleEn || personalInfo.role),
    description: isPt ? personalInfo.description : (personalInfo.descriptionEn || personalInfo.description)
})

export const generateCSV = (language: 'pt' | 'en') => {
    const isPt = language === 'pt'
    const info = getPersonalInfo(isPt)

    const header = isPt
        ? "Nome,Cargo,Email,Telefone,LinkedIn,GitHub\n"
        : "Name,Role,Email,Phone,LinkedIn,GitHub\n"

    const infoRow = `"${personalInfo.name}","${info.role}","${personalInfo.contact.email}","${personalInfo.contact.phone}","${personalInfo.social.linkedin}","${personalInfo.social.github}"\n\n`

    const skillsHeader = isPt ? "SECAO,ITEM,DETALHE\n" : "SECTION,ITEM,DETAIL\n"

    const techSkills = skills.technical.map(s => `Skills,${s.name},${isPt ? 'Técnico' : 'Technical'}`).join('\n')
    const langSkills = skills.languages?.map(l => `Languages,${l.name},${l.level}`).join('\n') || ""

    const projectsHeader = isPt ? "\nPROJETO,TECNOLOGIA,DESCRICAO\n" : "\nPROJECT,TECH,DESCRIPTION\n"
    const projectRows = projects.map(p => {
        const pd = getProjectData(p, isPt)
        return `"${pd.title}","${pd.tech}","${pd.description}"`
    }).join('\n')

    return header + infoRow + skillsHeader + techSkills + '\n' + langSkills + projectsHeader + projectRows
}

export const generateText = (language: 'pt' | 'en') => {
    const isPt = language === 'pt'
    const info = getPersonalInfo(isPt)

    return `${personalInfo.name}
${info.role}

${isPt ? "CONTATO" : "CONTACT"}
Email: ${personalInfo.contact.email}
Phone: ${personalInfo.contact.phone}
LinkedIn: ${personalInfo.social.linkedin}
GitHub: ${personalInfo.social.github}

${isPt ? "RESUMO" : "SUMMARY"}
${info.description}

${isPt ? "HABILIDADES" : "SKILLS"}
${skills.technical.map(s => s.name).join(', ')}

${isPt ? "IDIOMAS" : "LANGUAGES"}
${skills.languages?.map(l => `${l.name}: ${l.level}`).join('\n') || ""}

${isPt ? "PROJETOS" : "PROJECTS"}
${projects.map(p => {
        const pd = getProjectData(p, isPt)
        return `- ${pd.title} (${pd.tech}): ${pd.description}`
    }).join('\n')}
`
}

export const generateLaTeX = (language: 'pt' | 'en') => {
    const isPt = language === 'pt'
    const info = getPersonalInfo(isPt)

    // Simple LaTeX template escaping special chars would be ideal, but for now basic structure
    return `\\documentclass{article}
\\usepackage{hyperref}
\\begin{document}

\\title{${personalInfo.name} - ${info.role}}
\\date{\\today}
\\maketitle

\\section*{${isPt ? "Contato" : "Contact"}}
\\begin{itemize}
    \\item Email: ${personalInfo.contact.email}
    \\item Phone: ${personalInfo.contact.phone}
    \\item LinkedIn: ${personalInfo.social.linkedin}
    \\item GitHub: ${personalInfo.social.github}
\\end{itemize}

\\section*{${isPt ? "Resumo" : "Summary"}}
${info.description}

\\section*{${isPt ? "Habilidades" : "Skills"}}
${skills.technical.map(s => s.name).join(', ')}

\\section*{${isPt ? "Projetos" : "Projects"}}
\\begin{description}
${projects.map(p => {
        const pd = getProjectData(p, isPt)
        return `    \\item[${pd.title}] (${pd.tech}) ${pd.description}`
    }).join('\n')}
\\end{description}

\\end{document}
`
}

import { personalInfo, skills, projects } from "./data"

export const generateCSV = (language: 'pt' | 'en') => {
    const isPt = language === 'pt'

    const header = isPt
        ? "Nome,Cargo,Email,Telefone,LinkedIn,GitHub\n"
        : "Name,Role,Email,Phone,LinkedIn,GitHub\n"

    const infoRow = `"${personalInfo.name}","${personalInfo.role}","${personalInfo.contact.email}","${personalInfo.contact.phone}","${personalInfo.social.linkedin}","${personalInfo.social.github}"\n\n`

    const skillsHeader = isPt ? "SECAO,ITEM,DETALHE\n" : "SECTION,ITEM,DETAIL\n"

    const techSkills = skills.technical.map(s => `Skills,${s.name},${isPt ? 'Técnico' : 'Technical'}`).join('\n')
    const langSkills = skills.languages?.map(l => `Languages,${l.name},${l.level}`).join('\n') || ""

    const projectsHeader = isPt ? "\nPROJETO,TECNOLOGIA,DESCRICAO\n" : "\nPROJECT,TECH,DESCRIPTION\n"
    const projectRows = projects.map(p => `"${p.title}","${p.tech}","${p.description}"`).join('\n')

    return header + infoRow + skillsHeader + techSkills + '\n' + langSkills + projectsHeader + projectRows
}

export const generateText = (language: 'pt' | 'en') => {
    const isPt = language === 'pt'

    return `${personalInfo.name}
${personalInfo.role}

${isPt ? "CONTATO" : "CONTACT"}
Email: ${personalInfo.contact.email}
Phone: ${personalInfo.contact.phone}
LinkedIn: ${personalInfo.social.linkedin}
GitHub: ${personalInfo.social.github}

${isPt ? "RESUMO" : "SUMMARY"}
${personalInfo.description}

${isPt ? "HABILIDADES" : "SKILLS"}
${skills.technical.map(s => s.name).join(', ')}

${isPt ? "IDIOMAS" : "LANGUAGES"}
${skills.languages?.map(l => `${l.name}: ${l.level}`).join('\n') || ""}

${isPt ? "PROJETOS" : "PROJECTS"}
${projects.map(p => `- ${p.title} (${p.tech}): ${p.description}`).join('\n')}
`
}

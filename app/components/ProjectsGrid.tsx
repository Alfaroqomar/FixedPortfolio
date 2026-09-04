"use client"

import GridBox from "./GridBox"

export interface Project {
    title?: string
    role?: string
    contribution?: string
    description?: string
    tags?: string[]
    imageSrc?: string
    linkHref?: string
    imageScale?: number
    useOriginalRatio?: boolean
    gridColumn?: number
    gridRow?: number
    gridWidth?: number
    gridHeight?: number
}


const projects: Project[] = [
    { title: "9:5 Apocalypse", role: "System Programming / Shader Dev", contribution: "The majority of my time for this game went into the development for mini-games and limb detachment. I also developed shaders for highlighting objects in the environment and dissolving enemies.", description: "A strange little game about surviving the workday when the world ends around you.", tags: ["Unity", "Design"], imageSrc: "/images/ProjectImages/Apoc95Menu.png", linkHref: "https://briossilva1.itch.io/9-5-apocalip", gridColumn: 1, gridRow: 1, gridWidth: 5, gridHeight: 2 },
    { title: "P R E P A RE", role: "Game Programming / Back-End ", contribution: "I did programming for the entire game; I handled game state, progression, mini-games, dialogue import, tech art, and more. Outside the game, I worked on database management, user data security, and automation of certain specialized tasks.", description: "A game developed for professional training purposes. Players would learn how to handle various scenarious relating to wildfire smoke. The game simulated the POV of one of three roles: a Facility Manager, Teacher, or Administrator. Each role has unique content. Finally, players conclude the simulation with a 10 question quiz, resulting in a certificate.", tags: ["Professional", "Training", "Unity"], imageSrc: "/images/ProjectImages/GamePicture.png", linkHref: "https://warmgamedemo.netlify.app", gridColumn: 6, gridRow: 1, gridWidth: 12, gridHeight: 2 },
    { title: "Stella Astrum", role: "Design / System Programming / Shader Dev", contribution: "My contributions ranged from design to deep system development. An infinite map means a large scope and demands efficient systems to support it. In the endeavor to realize this, I split objects into data and visual nodes then implemented a chunking system which serialized unrendered nodes, and handled connections through this robust mechanic. I developed shaders for the nebulas, stars, and planets. I proposed the idea for this game and worked alongside other designers to make sure expectations conformed to reality.", description: "A hugely-scoped factory/incremental game. Players place a variety of factories generating stars to feed the black hole at the center of the universe. Feeding enough stars increments the milestone, unlocking new factories, stars, and challenges.", tags: ["Factory", "Incremental", "Released", "Godot"], imageSrc: "/images/ProjectImages/StellaAstrum.png", linkHref: "https://death-knight-studios.itch.io/stella-astrum", gridColumn: 1, gridRow: 3, gridWidth: 9, gridHeight: 1},
    { title: "Stargazer", role: "Interactive experiment", contribution: "", description: "A hyper involved score-based matching game! Players must draw constellations from stars, resulting in a temporary score booster as depending on constellation type.", tags: ["Design", "Prototype", "Jam", "Godot"], imageSrc: "/images/ProjectImages/Stargazer.jpg", linkHref: "https://briossilva1.itch.io/stargazer-ludum-dare", gridColumn: 10, gridRow: 3, gridWidth: 3, gridHeight: 1},
]

// Add keywords here to highlight them in every contribution.
const contributionHighlights: Record<string, string> = {
    program: "#c59bff",
    system: "#3683db",
    shader: "#f2b36d",
    design: "#be5dff",
    shaders: "#f2b36d",
    programming: "#4d9244",
    security: "#ff5c5c",
    automation: "#7c6f86",
}

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function highlightContribution(text: string) {
    const keywords = Object.keys(contributionHighlights)
    if (keywords.length === 0) return text

    const pattern = new RegExp(`\\b(${keywords.map(escapeRegExp).join("|")})\\b`, "gi")

    return text.split(pattern).map((part, index) => {
        const style = contributionHighlights[part.toLowerCase()]
        return style
            ? <span key={`${part}-${index}`} className="contribution-highlight" style={{ color: style }}>{part}</span>
            : part
    })
}

export default function ProjectsGrid() {
    return (
        <section id="work" className="projects-section">
            <div className="projects-heading">
                <p className="eyebrow">My Work</p>
                <h2>Built with<br /><em>curiosity.</em></h2>
                <p>A handful of projects from the last few years, spanning code, games, and visual experiments.</p>
            </div>

            <div className="projects-grid">
                {projects.map((project, i) => {
                    const hasText = project.title || project.role || project.contribution || project.description || project.tags?.length

                    return (
                        <GridBox
                            key={project.title ?? i}
                            style={{
                                gridColumn: project.gridColumn && project.gridWidth
                                    ? `${project.gridColumn} / span ${project.gridWidth}`
                                    : undefined,
                                gridRow: project.gridRow && project.gridHeight
                                    ? `${project.gridRow} / span ${project.gridHeight}`
                                    : undefined,
                            }}
                            imageSrc={project.imageSrc}
                            linkHref={project.linkHref}
                            imageScale={project.imageScale}
                            useOriginalRatio={project.useOriginalRatio}
                        >
                            {hasText && (
                                <>
                                    {project.role && <span className="text-xs text-neutral-500 dark:text-neutral-400">{project.role}</span>}
                                    {project.title && <h3 className="text-lg font-medium text-black dark:text-white">{project.title}</h3>}
                                    {project.contribution && <p className="project-contribution"><strong>Contribution:</strong> {highlightContribution(project.contribution)}</p>}
                                    {project.description && <p className="text-sm text-neutral-600 dark:text-neutral-400">{project.description}</p>}
                                    {project.tags && project.tags.length > 0 && <ul className="mt-1 flex flex-wrap gap-2">{project.tags.map((tag) => <li key={tag} className="rounded-full border border-neutral-300 px-2.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">{tag}</li>)}</ul>}
                                </>
                            )}
                        </GridBox>
                    )
                })}
            </div>
        </section>
    )
}

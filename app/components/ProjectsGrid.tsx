"use client"

import GridBox from "./GridBox"

export interface Project {
    title?: string
    role?: string
    description?: string
    tags?: string[]
    imageSrc?: string
    linkHref?: string
    imageScale?: number
    useOriginalRatio?: boolean
    size?: "large" | "medium" | "small"
    gridColumn?: string
    gridRow?: string
}

const projects: Project[] = [
    { title: "9:5 Apocalypse", role: "Game / itch.io", description: "A strange little game about surviving the workday when the world ends around you.", tags: ["Unity", "Design"], imageSrc: "/images/ProjectImages/Apoc95Menu.png", linkHref: "https://briossilva1.itch.io/9-5-apocalip", size: "large", gridColumn: "span 8", gridRow: "span 2" },
    { title: "Game Picture", role: "Game / Visual development", description: "A visual study in atmosphere, character, and building worlds that feel lived in.", tags: ["Visuals", "Worldbuilding"], imageSrc: "/images/ProjectImages/GamePicture.png", linkHref: "https://warmgamedemo.netlify.app", size: "medium", gridColumn: "span 4", gridRow: "span 1" },
    { title: "Stargazer", role: "Interactive experiment", description: "A quiet exploration of distance, light, and the small moments between stars.", tags: ["Design", "Prototype"], imageSrc: "/images/ProjectImages/Stargazer.jpg", size: "large", gridColumn: "span 4", gridRow: "span 1" },
    { title: "More in progress", role: "The next experiment", description: "Always sketching the next thing worth making.", tags: ["Ideas", "Curiosity"], size: "small", gridColumn: "span 4", gridRow: "span 1" },
]

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
                    const size = project.size ?? "medium"
                    const hasText = project.title || project.role || project.description || project.tags?.length

                    return (
                        <GridBox
                            key={project.title ?? i}
                            className={`grid-${size}`}
                            style={{ gridColumn: project.gridColumn, gridRow: project.gridRow }}
                            imageSrc={project.imageSrc}
                            linkHref={project.linkHref}
                            imageScale={project.imageScale}
                            useOriginalRatio={project.useOriginalRatio}
                        >
                            {hasText && (
                                <>
                                    {project.role && <span className="text-xs text-neutral-500 dark:text-neutral-400">{project.role}</span>}
                                    {project.title && <h3 className="text-lg font-medium text-black dark:text-white">{project.title}</h3>}
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

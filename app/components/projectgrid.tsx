"use client"

import { Fraunces, IBM_Plex_Sans } from "next/font/google"
import GridBox from "./GridBox"
import styles from "./ProjectsGrid.module.css"

const display = Fraunces({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-display" })
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" })

interface Project {
    title: string
    role: string
    description: string
    tags: string[]
    imageSrc?: string
    linkHref?: string
    size: "large" | "medium" | "small"
}

const projects: Project[] = [
    {
        title: "Waypoint",
        role: "Dispatch & routing platform",
        description:
            "A live map for freight dispatchers to reroute drivers around delays in real time, cutting average delivery variance by a third.",
        tags: ["React", "Mapbox", "WebSockets"],
        imageSrc: "/projects/waypoint.jpg",
        linkHref: "https://example.com/waypoint",
        size: "large",
    },
    {
        title: "Ledgerline",
        role: "Freelancer invoicing tool",
        description: "Turns tracked hours into client-ready invoices with automatic currency and tax handling.",
        tags: ["Next.js", "Stripe"],
        imageSrc: "/projects/ledgerline.jpg",
        linkHref: "https://example.com/ledgerline",
        size: "medium",
    },
    {
        title: "Fieldnote",
        role: "Research capture app",
        description: "Offline-first notes and photo tagging for ecology fieldwork, synced when a signal returns.",
        tags: ["React Native", "SQLite"],
        imageSrc: "/projects/fieldnote.jpg",
        size: "medium",
    },
    {
        title: "Kiln",
        role: "Internal design system",
        description: "The component library three product teams now build on.",
        tags: ["TypeScript", "Storybook"],
        size: "small",
    },
    {
        title: "Overlook",
        role: "Server monitoring dashboard",
        description: "Alerts engineers before a slow query becomes an outage.",
        tags: ["Go", "Grafana"],
        imageSrc: "/projects/overlook.jpg",
        size: "small",
    },
]

export default function ProjectsGrid() {
    return (
        <section className={`${styles.section} ${display.variable} ${body.variable}`}>
            <div className={styles.heading}>
                <h2 className={styles.title}>Selected work</h2>
                <p className={styles.subtitle}>A handful of projects from the last few years, in no particular order.</p>
            </div>

            <div className={styles.grid}>
                {projects.map((project) => (
                    <GridBox
                        key={project.title}
                        className={styles[project.size]}
                        imageSrc={project.imageSrc}
                        linkHref={project.linkHref}
                    >
                        <span className={styles.role}>{project.role}</span>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.description}>{project.description}</p>
                        <ul className={styles.tags}>
                            {project.tags.map((tag) => (
                                <li key={tag} className={styles.tag}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </GridBox>
                ))}
            </div>
        </section>
    )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./GridBox.module.css"

interface GridBoxProps {
    children?: React.ReactNode
    className?: string
    imageWrapClassName?: string
    linkHref?: string
    imageSrc?: string
    imageScale?: number
    useOriginalRatio?: boolean
    style?: React.CSSProperties
}

export default function GridBox({
    children,
    className = "",
    imageWrapClassName = "h-64",
    linkHref,
    imageSrc,
    imageScale = 1,
    useOriginalRatio = false,
    style,
}: GridBoxProps) {
    const [isHovered, setIsHovered] = useState(false)
    const isExternal = linkHref?.startsWith("http")

    const content = (
        <div
            className={`${styles.box} ${className}`}
            style={linkHref ? undefined : style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {imageSrc && (
                <div className={`${styles.imageWrap} ${imageWrapClassName}`}>
                    <Image
                        src={imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 100vw, 33vw"
                        className={`${styles.image} ${useOriginalRatio ? styles.contain : ""}`}
                        style={{
                            transform: `scale(${isHovered ? imageScale * 1.03 : imageScale})`,
                            transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    />
                </div>
            )}
            {children && <div className={styles.content}>{children}</div>}
        </div>
    )

    if (linkHref) {
        return (
            <Link
                href={linkHref}
                className="block h-full"
                style={style}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
            >
                {content}
            </Link>
        )
    }

    return content
}

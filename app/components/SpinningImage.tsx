"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./SpinningImage.module.css";
import { motion } from "framer-motion";

export interface SpinningImageProps {
    // You can add props here if needed in the future
    CardIndex?: number; // Optional prop for card index, if needed for future enhancements
    ImageSrc?: string; // Optional prop for image source, if needed for future enhancements
    LinkHref?: string; // Optional prop for link href, if needed for future enhancements
    FrameWidth?: number; // Optional frame width in px
    FrameHeight?: number; // Optional frame height in px
    ImagePosition?: string; // Optional object-position, e.g. "50% 20%"
    UseOriginalRatio?: boolean; // Optional flag to keep the image's native aspect ratio
    ImageScale?: number; // Optional scale factor, e.g. 1.1
    ImageWidth?: number; // Optional width in px when UseOriginalRatio is true
    ImageHeight?: number; // Optional height in px when UseOriginalRatio is true
    FadeDirection?: "left" | "right"; // Optional edge fade direction
    IsCenter?: boolean; // Optional flag for the centered card
    RotationSeed?: number; // Optional seed to refresh random rotation
    RotateX?: number; // Optional rotation override for X axis
    RotateY?: number; // Optional rotation override for Y axis
}

const MAX_ROTATION_DEG = 30;
const MIN_ROTATION_DEG = 6;

type SpinStyle = CSSProperties & {
    [key: `--${string}`]: string | number;
};

export default function SpinningImage({
    CardIndex,
    ImageSrc,
    LinkHref,
    FrameWidth,
    FrameHeight,
    ImagePosition,
    UseOriginalRatio,
    ImageScale,
    ImageWidth,
    ImageHeight,
    FadeDirection,
    IsCenter,
    RotationSeed,
    RotateX,
    RotateY,
}: SpinningImageProps) {
    const useOriginalRatio = Boolean(UseOriginalRatio);
    const scaleValue = ImageScale ?? 1;
    const imageScaleValue = useOriginalRatio ? 1 : scaleValue;
    const wrapperScaleValue = useOriginalRatio ? scaleValue : 1;
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const rotation = useMemo(() => {
        const seedValue = `${CardIndex ?? "card"}|${ImageSrc ?? ""}|${RotationSeed ?? 0}`;
        let hash = 2166136261;
        for (let i = 0; i < seedValue.length; i += 1) {
            hash ^= seedValue.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        let state = hash >>> 0;
        const random = () => {
            state += 0x6d2b79f5;
            let t = state;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        const randomDeg = () => {
            const magnitude = MIN_ROTATION_DEG + random() * (MAX_ROTATION_DEG - MIN_ROTATION_DEG);
            return random() > 0.5 ? magnitude : -magnitude;
        };

        return {
            y: Number(randomDeg().toFixed(2)),
            x: Number(randomDeg().toFixed(2)),
        };
    }, [CardIndex, ImageSrc, RotationSeed]);
    const rotateX = prefersReducedMotion || IsCenter ? 0 : RotateX ?? rotation.x;
    const rotateY = prefersReducedMotion || IsCenter ? 0 : RotateY ?? rotation.y;
    const targetRotation = { x: rotateX, y: rotateY, scale: wrapperScaleValue };
    const animationFrameRef = useRef<number | null>(null);
    const animatedRotationRef = useRef(targetRotation);
    const [animatedRotation, setAnimatedRotation] = useState(targetRotation);
    const frameStyle: SpinStyle = {
        ...(useOriginalRatio
            ? {}
            : {
                  ...(FrameWidth ? { "--spin-width": `${FrameWidth}px` } : {}),
                  ...(FrameHeight ? { "--spin-height": `${FrameHeight}px` } : {}),
              }),
        "--spin-image-scale": `${imageScaleValue}`,
        transform: `perspective(800px) rotateY(${animatedRotation.y}deg) rotateX(${animatedRotation.x}deg) scale(${animatedRotation.scale})`,
    };
    const imageStyle = {
        ...(ImagePosition ? { objectPosition: ImagePosition } : null),
        ...(useOriginalRatio ? { objectFit: "contain" } : null),
    } as React.CSSProperties;
    const fadeClass =
        FadeDirection === "left"
            ? styles.fadeLeftToRight
            : FadeDirection === "right"
            ? styles.fadeRightToLeft
            : "";
    const glareClass = IsCenter ? styles.glare : "";
    const linkClass = useOriginalRatio
        ? `${styles.link} ${styles.linkAuto}`
        : `${styles.link} ${styles.linkFill}`;

    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setPrefersReducedMotion(media.matches);
        updatePreference();

        if (typeof media.addEventListener === "function") {
            media.addEventListener("change", updatePreference);
            return () => media.removeEventListener("change", updatePreference);
        }

        media.addListener(updatePreference);
        return () => media.removeListener(updatePreference);
    }, []);

    useEffect(() => {
        if (animationFrameRef.current !== null) {
            window.cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        const from = animatedRotationRef.current;
        const to = targetRotation;
        const duration = prefersReducedMotion ? 0 : 900;

        if (duration === 0) {
            animatedRotationRef.current = to;
            setAnimatedRotation(to);
            return;
        }

        const startTime = window.performance.now();
        const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

        const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = easeOutCubic(progress);

            const nextRotation = {
                x: from.x + (to.x - from.x) * eased,
                y: from.y + (to.y - from.y) * eased,
                scale: from.scale + (to.scale - from.scale) * eased,
            };

            animatedRotationRef.current = nextRotation;
            setAnimatedRotation(nextRotation);

            if (progress < 1) {
                animationFrameRef.current = window.requestAnimationFrame(step);
            } else {
                animationFrameRef.current = null;
            }
        };

        animationFrameRef.current = window.requestAnimationFrame(step);

        return () => {
            if (animationFrameRef.current !== null) {
                window.cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [targetRotation.x, targetRotation.y, targetRotation.scale, prefersReducedMotion]);

    return (
        <motion.div layout transition={{ type: "spring", stiffness: 200, damping: 30 }}>
            <div
                className={
                    useOriginalRatio
                        ? `${styles.wrap} ${styles.wrapOriginal} ${glareClass}`
                        : `${styles.wrap} ${glareClass}`
                }
                style={frameStyle}
            >
                <a href={LinkHref || "#"} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {useOriginalRatio ? (
                        <Image
                            src={ImageSrc || "/images/ProjectImages/BrookIdle.png"}
                            width={ImageWidth ?? 220}
                            height={ImageHeight ?? 300}
                            quality={100}
                            className={`${styles.image} ${fadeClass}`}
                            preload
                            style={imageStyle}
                            alt="Spinning Image"
                        />
                    ) : (
                        <span className={styles.fillFrame}>
                            <Image
                                src={ImageSrc || "/images/ProjectImages/BrookIdle.png"}
                                fill
                                sizes={FrameWidth ? `${FrameWidth}px` : "(min-width: 1024px) 220px, (min-width: 768px) 200px, 180px"}
                                quality={100}
                                className={`${styles.image} ${fadeClass}`}
                                preload
                                style={imageStyle}
                                alt="Spinning Image"
                            />
                        </span>
                    )}
                </a>
            </div>
        </motion.div>
    );
}
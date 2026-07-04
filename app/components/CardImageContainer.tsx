"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import SpinningImage, { type SpinningImageProps } from "./SpinningImage";

interface CardImageContainerProps {
    Cards?: SpinningImageProps[];
}



const MaxCardsOnScreen = 3;
const DEFAULT_FRAME_WIDTH_PX = 220;
const MIN_EDGE_BUFFER_PX = 10;

export default function CardImageContainer({ Cards }: CardImageContainerProps) {
    const [offset, setOffset] = useState(0);
    const [rotationSeed, setRotationSeed] = useState(0);
    const [activeCenterKey, setActiveCenterKey] = useState<number | null>(null);
    const rotationSeedFrameRef = useRef<number | null>(null);
    const rotationSeedCommitFrameRef = useRef<number | null>(null);
    const cardCount = Cards?.length ?? 0;
    const canCycle = cardCount > 1;

    const createRandomSeed = () => {
        if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
            return crypto.getRandomValues(new Uint32Array(1))[0];
        }

        return Math.floor(Math.random() * 2 ** 32);
    };

    const orderedCards = useMemo(() => {
        if (!Cards?.length) return [] as { card: SpinningImageProps; originalIndex: number }[];
        const normalizedOffset = ((offset % cardCount) + cardCount) % cardCount;

        return Cards.map((_, index) => {
            const originalIndex = (index + normalizedOffset) % cardCount;
            return { card: Cards[originalIndex], originalIndex };
        });
    }, [Cards, offset, cardCount]);

    const edgePadding = useMemo(() => {
        if (!Cards?.length) return MIN_EDGE_BUFFER_PX;

        const maxBleed = Cards.reduce((currentMax, card) => {
            const scale = card.ImageScale ?? 1;
            if (scale <= 1) return currentMax;

            const baseWidth = card.UseOriginalRatio
                ? card.ImageWidth ?? DEFAULT_FRAME_WIDTH_PX
                : card.FrameWidth ?? DEFAULT_FRAME_WIDTH_PX;
            const bleed = ((scale - 1) * baseWidth) / 2;

            return Math.max(currentMax, bleed);
        }, 0);

        return Math.ceil(maxBleed + MIN_EDGE_BUFFER_PX);
    }, [Cards]);

    const containerStyle = useMemo<CSSProperties>(
        () => ({ paddingLeft: edgePadding, paddingRight: edgePadding }),
        [edgePadding]
    );

    useEffect(() => {
        return () => {
            if (rotationSeedFrameRef.current !== null) {
                window.cancelAnimationFrame(rotationSeedFrameRef.current);
            }
            if (rotationSeedCommitFrameRef.current !== null) {
                window.cancelAnimationFrame(rotationSeedCommitFrameRef.current);
            }
        };
    }, []);

    const refreshRotationSeed = () => {
        if (rotationSeedFrameRef.current !== null) {
            window.cancelAnimationFrame(rotationSeedFrameRef.current);
        }
        if (rotationSeedCommitFrameRef.current !== null) {
            window.cancelAnimationFrame(rotationSeedCommitFrameRef.current);
        }

        rotationSeedFrameRef.current = window.requestAnimationFrame(() => {
            rotationSeedCommitFrameRef.current = window.requestAnimationFrame(() => {
                setRotationSeed(createRandomSeed());
                rotationSeedFrameRef.current = null;
                rotationSeedCommitFrameRef.current = null;
            });
        });
    };

    const handlePrevious = () => {
        setOffset((current) => (cardCount ? (current + 1) % cardCount : current));
        refreshRotationSeed();
    };

    const handleNext = () => {
        setOffset((current) => (cardCount ? (current - 1 + cardCount) % cardCount : current));
        refreshRotationSeed();
    };

    const centerIndex = Math.floor(orderedCards.length / 2);
    useEffect(() => {
        if (!orderedCards.length) return; // if there are no cards, do nothing
        const nextCenter = orderedCards[centerIndex]; 
        if (!nextCenter) return;
        const nextCenterKey = nextCenter.card.CardIndex ?? nextCenter.originalIndex;
        const frameId = window.requestAnimationFrame(() => setActiveCenterKey(nextCenterKey));

        return () => window.cancelAnimationFrame(frameId); 
    }, [orderedCards, centerIndex]);

    return (
        <div className="card-image-controls flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <button
                type="button"
                className="rounded-full border border-black/30 bg-white/70 px-3 py-2 "
                onClick={handlePrevious}
                disabled={!canCycle}
                aria-label="Show previous card"
            >
                Prev
            </button>
            <div
                className="card-image-container flex shrink-0 min-w-max items-center justify-center gap-40"
                style={containerStyle}
            >
                {orderedCards.map(({ card, originalIndex }, displayIndex) => {
                    const isFirst = displayIndex === 0;
                    const isLast = displayIndex === (orderedCards.length - 1);
                    const fadeDirection = isFirst ? "left" : isLast ? "right" : undefined;
                    const cardKey = card.CardIndex ?? originalIndex;

                    return (
                        <SpinningImage
                            key={cardKey}
                            {...card}
                            CardIndex={cardKey}
                            FadeDirection={card.FadeDirection ?? fadeDirection}
                            IsCenter={activeCenterKey === cardKey}
                            RotationSeed={rotationSeed}
                        />
                    );
                })}
            </div>
            <button
                type="button"
                className="rounded-full border border-black/30 bg-white/70 px-3 py-2 text-sm font-semibold text-black transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/30 dark:bg-white/10 dark:text-white"
                onClick={handleNext}
                disabled={!canCycle}
                aria-label="Show next card"
            >
                Next
            </button>
        </div>
    );
}
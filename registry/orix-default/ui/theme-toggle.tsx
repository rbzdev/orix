"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

// ============================================================================
// TYPES
// ============================================================================

type AnimationType = "circle" | "diamond" | "wipe" | "flip" | "morph"

type AnimationOrigin =
    | "button"      // From the button (default)
    | "center"      // From the center of the screen
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top"
    | "bottom"
    | "left"
    | "right"

type WipeDirection = "left" | "right" | "up" | "down"
type FlipOrientation = "horizontal" | "vertical"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    /** Animation duration in ms (default: 500) */
    duration?: number
    /** Animation type (default: "morph") */
    animation?: AnimationType
    /** Animation origin point (default: "button") */
    origin?: AnimationOrigin
    /** Wipe direction - only for animation="wipe" (default: "right") */
    wipeDirection?: WipeDirection
    /** Flip orientation - only for animation="flip" (default: "horizontal") */
    flipOrientation?: FlipOrientation
    /** Number of rays for morph animation (default: 12) */
    morphRays?: number
}

export const ThemeToggle = ({
    className,
    duration = 500,
    animation = "diamond",
    origin = "button",
    wipeDirection = "right",
    flipOrientation = "horizontal",
    morphRays = 12,
    ...props
}: AnimatedThemeTogglerProps) => {
    const [isDark, setIsDark] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"))
        }

        updateTheme()

        const observer = new MutationObserver(updateTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })

        return () => observer.disconnect()
    }, [])

    // Calcule les coordonnées d'origine selon le paramètre origin
    const getOriginCoordinates = useCallback(
        (buttonRect: DOMRect): { x: number; y: number } => {
            const { top, left, width, height } = buttonRect
            const vw = window.innerWidth
            const vh = window.innerHeight

            switch (origin) {
                case "center":
                    return { x: vw / 2, y: vh / 2 }
                case "top-left":
                    return { x: 0, y: 0 }
                case "top-right":
                    return { x: vw, y: 0 }
                case "bottom-left":
                    return { x: 0, y: vh }
                case "bottom-right":
                    return { x: vw, y: vh }
                case "top":
                    return { x: vw / 2, y: 0 }
                case "bottom":
                    return { x: vw / 2, y: vh }
                case "left":
                    return { x: 0, y: vh / 2 }
                case "right":
                    return { x: vw, y: vh / 2 }
                case "button":
                default:
                    return { x: left + width / 2, y: top + height / 2 }
            }
        },
        [origin]
    )

    const getAnimationKeyframes = useCallback(
        (x: number, y: number, maxRadius: number, toLight: boolean) => {
            switch (animation) {
                case "circle":
                    return {
                        clipPath: toLight
                            ? [
                                `circle(0px at ${x}px ${y}px)`,
                                `circle(${maxRadius}px at ${x}px ${y}px)`,
                            ]
                            : [
                                `circle(${maxRadius}px at ${x}px ${y}px)`,
                                `circle(0px at ${x}px ${y}px)`,
                            ],
                    }

                case "diamond":
                    return {
                        clipPath: [
                            `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
                            `polygon(
                ${x}px ${y - maxRadius}px,
                ${x + maxRadius}px ${y}px,
                ${x}px ${y + maxRadius}px,
                ${x - maxRadius}px ${y}px
              )`,
                        ],
                    }

                case "wipe": {
                    // Animation wipe avec direction configurable
                    const wipeKeyframes: Record<WipeDirection, { start: string; end: string }> = {
                        right: {
                            start: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                            end: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        },
                        left: {
                            start: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                            end: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        },
                        down: {
                            start: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                            end: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        },
                        up: {
                            start: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                            end: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        },
                    }
                    const { start, end } = wipeKeyframes[wipeDirection]
                    return {
                        clipPath: toLight ? [start, end] : [end, start],
                    }
                }

                case "flip": {
                    // Animation flip avec orientation configurable
                    const flipKeyframes: Record<FlipOrientation, { start: string; end: string }> = {
                        horizontal: {
                            start: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
                            end: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        },
                        vertical: {
                            start: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
                            end: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        },
                    }
                    const { start, end } = flipKeyframes[flipOrientation]
                    return {
                        clipPath: [start, end],
                    }
                }

                case "morph":
                default: {
                    // Effet soleil/étoile avec rayons configurables
                    const innerRadius = 0
                    const outerRadius = maxRadius

                    const createStarPath = (
                        cx: number,
                        cy: number,
                        innerR: number,
                        outerR: number,
                        points: number
                    ) => {
                        const angle = Math.PI / points
                        const path: string[] = []
                        for (let i = 0; i < points * 2; i++) {
                            const r = i % 2 === 0 ? outerR : innerR * 0.6
                            const a = i * angle - Math.PI / 2
                            path.push(`${cx + r * Math.cos(a)}px ${cy + r * Math.sin(a)}px`)
                        }
                        return `polygon(${path.join(", ")})`
                    }

                    return {
                        clipPath: [
                            createStarPath(x, y, innerRadius, 20, morphRays),
                            createStarPath(x, y, outerRadius * 0.8, outerRadius, morphRays),
                        ],
                    }
                }
            }
        },
        [animation, wipeDirection, flipOrientation, morphRays]
    )

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current || isAnimating) return

        setIsAnimating(true)
        const toLight = isDark

        // Start the view transition
        const transition = document.startViewTransition(() => {
            flushSync(() => {
                const newTheme = !isDark
                setIsDark(newTheme)
                document.documentElement.classList.toggle("dark")
                localStorage.setItem("theme", newTheme ? "dark" : "light")
            })
        })

        await transition.ready

        // Calculate animation parameters
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const { x, y } = getOriginCoordinates(buttonRect)
        const maxRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        )

        // Apply the selected animation
        const keyframes = getAnimationKeyframes(x, y, maxRadius, toLight)

        document.documentElement.animate(keyframes, {
            duration,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
        })

        await transition.finished
        setIsAnimating(false)
    }, [isDark, duration, isAnimating, getAnimationKeyframes, getOriginCoordinates])

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            disabled={isAnimating}
            className={cn(
                "relative overflow-hidden transition-transform duration-200 hover:scale-110 active:scale-95",
                isAnimating && "pointer-events-none",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "transition-all duration-300",
                    isAnimating && "animate-spin"
                )}
                style={{
                    animationDuration: `${duration}ms`,
                    animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {isDark ? (
                    <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
                ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
                )}
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}

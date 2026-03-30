"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type SpellType = "arcane" | "fire" | "ice" | "void" | "nature" | "holy"
export type MagicVariant = "warp" | "glitch" | "magnify" | "dissolve" | "vortex" | "pixelate" | "ripple"

interface Particle {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    life: number
    size: number
    color: string
}

interface MagicSpellsProps {
    children: React.ReactNode
    className?: string
    type?: SpellType
    variant?: MagicVariant
    distortionStrength?: number
    radius?: number
    particleDensity?: number
    showCursor?: boolean
}

const SPELL_THEMES: Record<SpellType, {
    colors: string[]
    primary: string
    secondary: string
    lightPrimary: string
    filterBase: number
}> = {
    arcane: {
        colors: ["#A855F7", "#D8B4FE", "#818CF8"],
        primary: "rgba(168, 85, 247, 0.5)",
        secondary: "rgba(168, 85, 247, 0.2)",
        lightPrimary: "rgba(126, 34, 206, 0.6)",
        filterBase: 0.05
    },
    fire: {
        colors: ["#EF4444", "#F59E0B", "#F97316"],
        primary: "rgba(239, 68, 68, 0.5)",
        secondary: "rgba(249, 115, 22, 0.2)",
        lightPrimary: "rgba(185, 28, 28, 0.6)",
        filterBase: 0.08
    },
    ice: {
        colors: ["#0EA5E9", "#BAE6FD", "#7DD3FC"],
        primary: "rgba(14, 165, 233, 0.5)",
        secondary: "rgba(186, 230, 253, 0.2)",
        lightPrimary: "rgba(3, 105, 161, 0.6)",
        filterBase: 0.03
    },
    void: {
        colors: ["#7C3AED", "#1F2937", "#000000"],
        primary: "rgba(124, 58, 237, 0.5)",
        secondary: "rgba(0, 0, 0, 0.4)",
        lightPrimary: "rgba(88, 28, 135, 0.7)",
        filterBase: 0.12
    },
    nature: {
        colors: ["#10B981", "#34D399", "#059669"],
        primary: "rgba(168, 85, 247, 0.5)", // Resetting to nature theme correctly below
        secondary: "rgba(52, 211, 153, 0.2)",
        lightPrimary: "rgba(4, 120, 87, 0.6)",
        filterBase: 0.04
    },
    holy: {
        colors: ["#FBBF24", "#FEF3C7", "#FFFFFF"],
        primary: "rgba(251, 191, 36, 0.5)",
        secondary: "rgba(251, 191, 36, 0.2)",
        lightPrimary: "rgba(180, 83, 9, 0.6)",
        filterBase: 0.02
    }
}

// Fix nature theme primary
SPELL_THEMES.nature.primary = "rgba(16, 185, 129, 0.5)";

export function MagicSpells({
    children,
    className,
    type = "arcane",
    variant = "warp",
    distortionStrength = 40,
    radius = 300,
    particleDensity = 1,
    showCursor = false
}: MagicSpellsProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [isHovered, setIsHovered] = React.useState(false)
    
    // Smooth trailing for the "warp core"
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150 })
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150 })

    const [particles, setParticles] = React.useState<Particle[]>([])
    const theme = SPELL_THEMES[type]

    // Handle mouse movement
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)

        // Spawn particles as we move
        if (Math.random() < 0.3 * particleDensity) {
            const newParticle: Particle = {
                id: Math.random(),
                x,
                y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1,
                size: Math.random() * 4 + 2,
                color: theme.colors[Math.floor(Math.random() * theme.colors.length)]
            }
            setParticles(prev => [...prev.slice(-40), newParticle])
        }
    }

    // Particle update loop
    React.useEffect(() => {
        const timer = setInterval(() => {
            setParticles(prev => 
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        life: p.life - 0.02,
                        vy: p.vy - 0.05
                    }))
                    .filter(p => p.life > 0)
            )
        }, 16)
        return () => clearInterval(timer)
    }, [])

    const maskImage = useMotionTemplate`radial-gradient(${radius}px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`
    const filterId = `magic-distort-${type}-${variant}`

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden select-none transition-colors duration-500",
                !showCursor && "cursor-none",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
                <filter id={filterId}>
                    {variant === "warp" && (
                        <>
                            <feTurbulence type="fractalNoise" baseFrequency={theme.filterBase} numOctaves="2" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale={distortionStrength} xChannelSelector="R" yChannelSelector="G" />
                        </>
                    )}
                    {variant === "glitch" && (
                        <>
                            <feTurbulence type="turbulence" baseFrequency="0.01 0.4" numOctaves="2" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale={distortionStrength * 1.5} xChannelSelector="R" yChannelSelector="B" />
                        </>
                    )}
                    {variant === "magnify" && (
                        <>
                            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                            <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="white" result="light">
                                <fePointLight x="50" y="50" z="30" />
                            </feSpecularLighting>
                            <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                        </>
                    )}
                    {variant === "dissolve" && (
                        <>
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="noise" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 10 -5" />
                            <feComposite in="SourceGraphic" operator="in" />
                        </>
                    )}
                    {variant === "vortex" && (
                        <>
                            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                            <feOffset dx="0" dy="0">
                                <animate attributeName="dx" values="0;2;0" dur="2s" repeatCount="indefinite" />
                            </feOffset>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale={distortionStrength * 2} xChannelSelector="R" yChannelSelector="G" />
                            <feMorphology operator="dilate" radius="1" />
                        </>
                    )}
                    {variant === "pixelate" && (
                        <>
                            <feFlood x="0" y="0" width="8" height="8" />
                            <feComposite width="10" height="10" />
                            <feTile result="a" />
                            <feComposite in="SourceGraphic" in2="a" operator="in" />
                            <feMorphology operator="dilate" radius="2" />
                        </>
                    )}
                    {variant === "ripple" && (
                        <>
                             <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
                             <feDisplacementMap in="SourceGraphic" in2="noise" scale={distortionStrength}>
                                <animate attributeName="scale" values={`0;${distortionStrength};0`} dur="3s" repeatCount="indefinite" />
                             </feDisplacementMap>
                        </>
                    )}
                </filter>
            </svg>

            {/* Base Content Layer */}
            <div className="relative z-0 opacity-100 transition-opacity duration-300 dark:text-zinc-100 text-zinc-900">
                {children}
            </div>

            {/* Distorted Content Overlay */}
            <motion.div
                className={cn(
                    "absolute inset-0 z-10 pointer-events-none mix-blend-normal overflow-visible",
                    variant === "magnify" && "scale-[1.05]"
                )}
                style={{
                    maskImage: maskImage,
                    WebkitMaskImage: maskImage,
                    filter: `url(#${filterId}) ${variant === "warp" || variant === "vortex" ? "brightness(1.1) saturate(1.2)" : ""}`,
                }}
            >
                {children}
            </motion.div>

            {/* Particle Layer */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {particles.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: p.life, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute rounded-full blur-[1px]"
                            style={{
                                left: p.x,
                                top: p.y,
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color,
                                boxShadow: `0 0 12px ${p.color}`,
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* The Magic Orb */}
            <motion.div
                className="absolute z-30 pointer-events-none flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
                style={{
                    left: smoothX,
                    top: smoothY,
                    opacity: isHovered ? 1 : 0
                }}
            >
                <div className={cn(
                    "size-8 rounded-full blur-md animate-pulse transition-colors duration-300",
                    type === "arcane" && "dark:bg-purple-500 bg-purple-700",
                    type === "fire" && "dark:bg-orange-500 bg-orange-700",
                    type === "ice" && "dark:bg-cyan-400 bg-cyan-600",
                    type === "void" && "dark:bg-zinc-800 bg-zinc-950",
                    type === "nature" && "dark:bg-emerald-500 bg-emerald-700",
                    type === "holy" && "dark:bg-amber-300 bg-amber-600"
                )} />
                <div className="absolute size-4 dark:bg-white bg-zinc-50 rounded-full blur-[2px]" />
                
                {/* Ritual Ring */}
                <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute size-20 opacity-40 overflow-visible"
                    viewBox="0 0 100 100"
                >
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" className="dark:text-white text-zinc-900" />
                    {variant === "vortex" && (
                         <path d="M50 5 L55 20 L45 20 Z" fill="currentColor" stroke="none" className="dark:text-white text-zinc-900" />
                    )}
                </motion.svg>
            </motion.div>

            {/* Atmosphere Shadow/Light */}
            <motion.div
                className="absolute inset-0 z-5 pointer-events-none"
                style={{
                    background: useMotionTemplate`radial-gradient(${radius * 0.7}px circle at ${smoothX}px ${smoothY}px, transparent 0%, ${isHovered ? "rgba(0,0,0,0.05)" : "transparent"} 100%)`
                }}
            />
            <motion.div 
                className="absolute inset-0 z-1 pointer-events-none hidden dark:block"
                style={{
                    background: useMotionTemplate`radial-gradient(${radius}px circle at ${smoothX}px ${smoothY}px, transparent 0%, rgba(0,0,0,0.2) 100%)`
                }}
            />
        </div>
    )
}

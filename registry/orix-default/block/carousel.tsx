"use client"

import * as React from "react"

interface CarouselItem {
    id: string | number
    title: string
    description: string
    image: string
    category: string
}

type CarouselVariant = "default" | "stack" | "flat" | "cards"
type CarouselOrientation = "horizontal" | "vertical"

interface CarouselProps {
    items: CarouselItem[]
    className?: string
    variant?: CarouselVariant
    orientation?: CarouselOrientation
    primaryColor?: string
    accentColor?: string
}

export function Carousel({
    items,
    className = "",
    variant = "default",
    orientation = "horizontal",
    primaryColor = "rgb(var(--primary))",
    accentColor = "rgba(var(--primary), 0.2)"
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [isAnimating, setIsAnimating] = React.useState(false)

    const next = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev + 1) % items.length)
        setTimeout(() => setIsAnimating(false), 500)
    }

    const prev = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
        setTimeout(() => setIsAnimating(false), 500)
    }

    const isVertical = orientation === "vertical"

    const getSlideClasses = (index: number) => {
        const isActive = index === currentIndex
        const base = "absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"

        if (variant === "default") {
            return `${base} ${isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"}`
        }

        if (variant === "stack") {
            if (isActive) return `${base} opacity-100 scale-100 z-20 translate-x-0 translate-y-0 [transform:rotateX(0deg)_rotateY(0deg)]`
            if (isVertical) {
                return `${base} opacity-0 -translate-y-12 scale-90 z-10 [transform:rotateX(12deg)]`
            }
            return `${base} opacity-0 translate-x-12 scale-90 z-10 [transform:rotateY(12deg)]`
        }

        if (variant === "flat") {
            if (isActive) return `${base} translate-x-0 translate-y-0 z-10 opacity-100`
            if (isVertical) {
                return `${base} ${index > currentIndex ? "translate-y-full" : "-translate-y-full"} opacity-0 z-0`
            }
            return `${base} ${index > currentIndex ? "translate-x-full" : "-translate-x-full"} opacity-0 z-0`
        }

        if (variant === "cards") {
            if (isActive) return `${base} scale-100 opacity-100 z-20`
            return `${base} scale-75 opacity-0 z-10`
        }

        return base
    }

    return (
        <div className={`relative w-full max-w-5xl mx-auto ${isVertical ? 'h-[700px]' : 'h-[600px]'} flex ${isVertical ? 'flex-row' : 'flex-col'} items-center justify-center overflow-hidden py-12 px-4 ${className}`}>

            {/* Slide Container */}
            <div className={`relative w-full h-full flex items-center justify-center ${variant === "stack" ? "perspective-[2000px]" : ""}`}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`${getSlideClasses(index)} rounded-2xl overflow-hidden shadow-2xl border border-white/10`}
                    >
                        {/* Image Layer */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                        {/* Content */}
                        <div className={`absolute inset-x-0 bottom-0 p-8 md:p-12 text-white transition-all duration-700 delay-100 ${index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                            <span
                                style={{ backgroundColor: accentColor, borderColor: primaryColor }}
                                className="inline-block px-3 py-1 rounded-full backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest mb-4"
                            >
                                {item.category}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 italic">
                                {item.title}
                            </h3>
                            <p className="text-white/60 text-sm md:text-base max-w-lg leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center gap-6 ${isVertical ? 'ml-8' : 'mt-8'} z-30`}>
                <button
                    onClick={prev}
                    disabled={isAnimating}
                    className="p-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:scale-110 active:scale-95 transition-all group disabled:opacity-50"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isVertical ? 'rotate-90' : ''}`} style={{ color: isAnimating ? 'inherit' : primaryColor }}>
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {/* Progress Indicators */}
                <div className={`relative flex ${isVertical ? 'flex-col' : 'flex-row'} items-center gap-4 backdrop-blur-md px-4 py-3`}>
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                if (isAnimating) return
                                setIsAnimating(true)
                                setCurrentIndex(i)
                                setTimeout(() => setIsAnimating(false), 500)
                            }}
                            className={`group relative transition-all duration-500 rounded-full flex items-center justify-center ${i === currentIndex
                                ? isVertical ? "h-10 w-2.5" : "w-10 h-2.5"
                                : "w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-700"
                                }`}
                            style={{ backgroundColor: i === currentIndex ? primaryColor : undefined }}
                        >
                            {i === currentIndex && (
                                <div
                                    className="absolute inset-0 rounded-full opacity-40 animate-pulse bg-primary"
                                // style={{ backgroundColor: primaryColor }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={next}
                    disabled={isAnimating}
                    className="p-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:scale-110 active:scale-95 transition-all group disabled:opacity-50"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isVertical ? 'rotate-90' : ''}`} style={{ color: isAnimating ? 'inherit' : primaryColor }}>
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[150px] -z-10 rounded-full opacity-20 pointer-events-none transition-colors duration-1000"
                style={{ backgroundColor: primaryColor }}
            />
        </div>
    )
}

"use client"
import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function BlurFade({
    children,
    className,
    delay = 0,
    duration = 0.5,
    inView = false,
    yOffset = 24,
    blur = "8px"
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    inView?: boolean
    yOffset?: number
    blur?: string
}) {
    const [isVisible, setIsVisible] = useState(!inView)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!inView) return
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                observer.unobserve(entry.target)
            }
        }, { threshold: 0.1, rootMargin: "-50px" })

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [inView])

    return (
        <div
            ref={ref}
            className={cn("transition-all ease-out", className)}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? "blur(0px)" : `blur(${blur})`,
                transform: isVisible ? "translateY(0px)" : `translateY(${yOffset}px)`,
            }}
        >
            {children}
        </div>
    )
}

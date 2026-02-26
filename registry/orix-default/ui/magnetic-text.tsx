"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export function MagneticText({
    children,
    className = "",
    strength = 0.4,
}: {
    children: React.ReactNode
    className?: string
    strength?: number
}) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        x.set((clientX - centerX) * strength)
        y.set((clientY - centerY) * strength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.span
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: springX,
                y: springY,
                display: "inline-block",
            }}
            className={cn("cursor-default select-none transition-colors", className)}
        >
            {children}
        </motion.span>
    )
}

"use client"

import * as React from "react"
import { motion, useSpring, useMotionValue, HTMLMotionProps } from "framer-motion"

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "style"> {
    children: React.ReactNode
    distance?: number
    strength?: number
}

export function MagneticButton({
    children,
    className,
    distance = 60,
    strength = 30,
    ...props
}: MagneticButtonProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
        const { clientX, clientY, currentTarget } = e
        const { left, top, width, height } = currentTarget.getBoundingClientRect()

        const centerX = left + width / 2
        const centerY = top + height / 2

        const deltaX = clientX - centerX
        const deltaY = clientY - centerY

        mouseX.set(deltaX * (strength / 100))
        mouseY.set(deltaY * (strength / 100))
    }

    function handleMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={`relative inline-flex items-center justify-center px-8 py-3 rounded-full font-bold transition-colors bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity ${className}`}
            {...props}
        >
            <span className="relative z-10 block">{children}</span>
            <div className="absolute inset-0 rounded-full border border-white/20 scale-110 opacity-0 hover:scale-100 hover:opacity-100 transition-all duration-300" />
        </motion.button>
    )
}

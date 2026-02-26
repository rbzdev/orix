"use client"

import * as React from "react"
import { motion, useScroll, useVelocity, useTransform, useSpring, useAnimationFrame, useMotionValue } from "framer-motion"

interface VelocityScrollProps {
    text: string
    default_velocity?: number
    className?: string
}

interface ParallaxProps {
    children: string
    baseVelocity: number
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    })

    /**
     * Helper for wrapping values
     */
    const wrap = (min: number, max: number, v: number) => {
        const rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

    const directionFactor = React.useRef<number>(1)
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get()

        baseX.set(baseX.get() + moveBy)
    })

    return (
        <div className="flex whitespace-nowrap flex-nowrap overflow-hidden">
            <motion.div className="flex whitespace-nowrap flex-nowrap text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl" style={{ x }}>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
            </motion.div>
        </div>
    )
}

export function VelocityScroll({
    text,
    default_velocity = 5,
    className,
}: VelocityScrollProps) {
    return (
        <section className={`relative w-full py-12 overflow-hidden bg-background ${className}`}>
            <div className="flex flex-col gap-4">
                <ParallaxText baseVelocity={default_velocity}>{text}</ParallaxText>
                <ParallaxText baseVelocity={-default_velocity}>{text}</ParallaxText>
            </div>
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
        </section>
    )
}

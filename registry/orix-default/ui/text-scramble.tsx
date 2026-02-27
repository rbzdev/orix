"use client"
import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TextScrambleProps {
    text: string
    duration?: number
    className?: string
    characterSet?: string
    trigger?: boolean // if false, scrambles only on hover
}

export function TextScramble({
    text,
    duration = 800,
    className,
    characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*",
    trigger = true,
}: TextScrambleProps) {
    const [displayedText, setDisplayedText] = useState(text)
    const [isAnimating, setIsAnimating] = useState(false)

    const startAnimation = () => {
        if (isAnimating) return
        setIsAnimating(true)
        let frame = 0
        const frames = duration / (1000 / 60)
        const length = text.length

        const update = () => {
            frame++
            const progress = frame / frames
            const currentLength = Math.floor(progress * length)

            if (frame >= frames) {
                setDisplayedText(text)
                setIsAnimating(false)
                return
            }

            let scrambled = ""
            for (let i = 0; i < length; i++) {
                if (i < currentLength || text[i] === " " || text[i] === "\n") {
                    scrambled += text[i]
                } else {
                    scrambled += characterSet[Math.floor(Math.random() * characterSet.length)]
                }
            }
            setDisplayedText(scrambled)
            requestAnimationFrame(update)
        }
        update()
    }

    useEffect(() => {
        if (trigger) startAnimation()
    }, [trigger, text]) // eslint-disable-line

    return (
        <span
            onMouseEnter={() => {
                if (!trigger && !isAnimating) startAnimation()
            }}
            className={cn("inline-block font-mono cursor-default", className)}
        >
            {displayedText}
        </span>
    )
}

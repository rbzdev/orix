"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TypewriterProps {
    words: string[]
    /** Typing speed in ms per character */
    typingSpeed?: number
    /** Deleting speed in ms per character */
    deletingSpeed?: number
    /** Pause at end of word in ms */
    pauseDuration?: number
    className?: string
    cursorClassName?: string
    cursorChar?: string
    loop?: boolean
}

export function Typewriter({
    words,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 1800,
    className,
    cursorClassName,
    cursorChar = "|",
    loop = true,
}: TypewriterProps) {
    const [displayed, setDisplayed] = React.useState("")
    const [wordIndex, setWordIndex] = React.useState(0)
    const [phase, setPhase] = React.useState<"typing" | "pausing" | "deleting">("typing")
    const [cursorVisible, setCursorVisible] = React.useState(true)

    // Cursor blink
    React.useEffect(() => {
        const id = setInterval(() => setCursorVisible(v => !v), 530)
        return () => clearInterval(id)
    }, [])

    // Core typewriter logic
    React.useEffect(() => {
        if (!words.length) return
        const word = words[wordIndex]

        let timeout: ReturnType<typeof setTimeout>

        if (phase === "typing") {
            if (displayed.length < word.length) {
                timeout = setTimeout(() => {
                    setDisplayed(word.slice(0, displayed.length + 1))
                }, typingSpeed)
            } else {
                timeout = setTimeout(() => setPhase("pausing"), pauseDuration)
            }
        } else if (phase === "pausing") {
            setPhase("deleting")
        } else if (phase === "deleting") {
            if (displayed.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayed(displayed.slice(0, -1))
                }, deletingSpeed)
            } else {
                const nextIndex = (wordIndex + 1) % words.length
                if (!loop && nextIndex === 0) return
                setWordIndex(nextIndex)
                setPhase("typing")
            }
        }

        return () => clearTimeout(timeout)
    }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, loop])

    return (
        <span className={cn("inline-flex items-center", className)}>
            <span>{displayed}</span>
            <span
                className={cn(
                    "ml-0.5 inline-block font-light transition-opacity duration-75",
                    cursorVisible ? "opacity-100" : "opacity-0",
                    cursorClassName
                )}
            >
                {cursorChar}
            </span>
        </span>
    )
}

"use client"
import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function FlipWords({
    words,
    duration = 2000,
    className
}: {
    words: string[]
    duration?: number
    className?: string
}) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length)
        }, duration)
        return () => clearInterval(interval)
    }, [words, duration])

    return (
        <span className={cn("inline-grid overflow-hidden py-1 px-1", className)}>
            {words.map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    className={cn(
                        "col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === index
                            ? "opacity-100 translate-y-0"
                            : i === (index - 1 + words.length) % words.length
                                ? "opacity-0 -translate-y-full blur-[2px]"
                                : "opacity-0 translate-y-full blur-[2px]"
                    )}
                >
                    {word}
                </span>
            ))}
        </span>
    )
}

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The visual style of the loader */
    variant?: "ring" | "dots" | "bars" | "pulse" | "spinner" | "orbit" | "wave" | "bounce" | "dash"
    /** The size of the loader */
    size?: "sm" | "md" | "lg"
}

export function Loader({
    variant = "ring",
    size = "md",
    className,
    ...props
}: LoaderProps) {
    const sizeMap = {
        sm: { container: "w-4 h-4", dot: "w-1 h-1", bar: "w-0.5" },
        md: { container: "w-8 h-8", dot: "w-2 h-2", bar: "w-1" },
        lg: { container: "w-12 h-12", dot: "w-3 h-3", bar: "w-1.5" },
    }

    const s = sizeMap[size]

    if (variant === "ring") {
        return (
            <div
                className={cn(
                    "inline-block rounded-full border-2 border-primary/20 border-t-primary animate-spin",
                    s.container,
                    className
                )}
                {...props}
            />
        )
    }

    if (variant === "dots") {
        return (
            <div className={cn("inline-flex items-center justify-center gap-1", s.container, className)} {...props}>
                <div className={cn("bg-primary rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]", s.dot)} />
                <div className={cn("bg-primary rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]", s.dot)} />
                <div className={cn("bg-primary rounded-full animate-[bounce_1.4s_infinite_ease-in-out_both]", s.dot)} />
            </div>
        )
    }

    if (variant === "bars") {
        return (
            <div className={cn("inline-flex items-center justify-center gap-1", s.container, className)} {...props}>
                <div className={cn("bg-primary rounded-full h-full animate-[loader-bar_1.2s_ease-in-out_infinite]", s.bar)} />
                <div className={cn("bg-primary rounded-full h-full animate-[loader-bar_1.2s_ease-in-out_infinite] [animation-delay:-1.1s]", s.bar)} />
                <div className={cn("bg-primary rounded-full h-full animate-[loader-bar_1.2s_ease-in-out_infinite] [animation-delay:-1.0s]", s.bar)} />
                <div className={cn("bg-primary rounded-full h-full animate-[loader-bar_1.2s_ease-in-out_infinite] [animation-delay:-0.9s]", s.bar)} />
                <div className={cn("bg-primary rounded-full h-full animate-[loader-bar_1.2s_ease-in-out_infinite] [animation-delay:-0.8s]", s.bar)} />
                <style>{`
                    @keyframes loader-bar {
                        0%, 40%, 100% { transform: scaleY(0.4); }
                        20% { transform: scaleY(1); }
                    }
                `}</style>
            </div>
        )
    }

    if (variant === "pulse") {
        return (
            <div className={cn("relative inline-block", s.container, className)} {...props}>
                <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute inset-1/4 rounded-full bg-primary animate-pulse" />
            </div>
        )
    }

    if (variant === "spinner") {
        return (
            <div className={cn("inline-block text-primary animate-spin", s.container, className)} {...props}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-full h-full">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            </div>
        )
    }

    if (variant === "orbit") {
        return (
            <div className={cn("relative inline-flex items-center justify-center animate-spin", s.container, className)} {...props}>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30" />
                <div className="absolute w-1/4 h-1/4 left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-primary rounded-full" />
                <div className="w-1/3 h-1/3 bg-primary rounded-full" />
            </div>
        )
    }

    if (variant === "wave") {
        const delays = ["0s", "-0.3s", "-0.6s", "-0.9s"]
        return (
            <div className={cn("inline-flex items-center justify-center gap-1", s.container, className)} {...props}>
                {delays.map((delay, i) => (
                    <div
                        key={i}
                        className={cn("bg-primary rounded-sm", s.bar, "h-full")}
                        style={{
                            animation: "loader-wave-bar 1.2s ease-in-out infinite",
                            animationDelay: delay,
                        }}
                    />
                ))}
                <style>{`
                    @keyframes loader-wave-bar {
                        0%, 100% { transform: scaleY(0.3); }
                        50%       { transform: scaleY(1); }
                    }
                `}</style>
            </div>
        )
    }

    if (variant === "bounce") {
        return (
            <div className={cn("inline-flex items-center justify-center", s.container, className)} {...props}>
                <div className="bg-primary rounded-full w-1/2 h-1/2 animate-bounce" />
            </div>
        )
    }

    if (variant === "dash") {
        return (
            <div className={cn("inline-flex animate-[spin_3s_linear_infinite]", s.container, className)} {...props}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray="40 20"
                        className="text-primary"
                    />
                </svg>
            </div>
        )
    }

    return null
}

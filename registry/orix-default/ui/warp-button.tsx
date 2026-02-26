"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function WarpButton({
    children,
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const [ripples, setRipples] = React.useState<{ id: number; x: number; y: number }[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY, currentTarget } = e
        const { left, top } = currentTarget.getBoundingClientRect()
        const x = clientX - left
        const y = clientY - top

        const id = Date.now()
        setRipples(prev => [...prev.slice(-3), { id, x, y }])

        // Auto-remove ripple
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== id))
        }, 1000)

        if (props.onClick) props.onClick(e)
    }

    return (
        <button
            {...props}
            onClick={handleClick}
            className={cn(
                "relative group px-3 py-2 bg-zinc-950 text-white rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-all active:scale-95",
                className
            )}
        >
            <span className="relative z-10">{children}</span>

            {/* Dynamic Warps */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            position: "absolute",
                            transform: "translate(-50%, -50%)",
                            width: "100px",
                            height: "100px",
                            background: "radial-gradient(circle, rgba(255,255,255) 0%, transparent 90%)",
                            borderRadius: "90%",
                            pointerEvents: "none",
                            zIndex: 0
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                ))}
            </AnimatePresence>

            {/* Border Glow */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 transition-colors rounded-xl" />
            <div className="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    )
}

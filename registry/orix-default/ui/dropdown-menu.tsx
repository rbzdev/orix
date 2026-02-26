"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface DropdownMenuProps {
    trigger: React.ReactNode
    items: {
        label: string
        icon?: string
        shortcut?: string
        onClick?: () => void
        variant?: "default" | "destructive"
    }[]
    className?: string
    align?: "left" | "right" | "center"
}

export function DropdownMenu({ trigger, items, className, align = "right" }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const alignments = {
        left: "left-0 origin-top-left",
        right: "right-0 origin-top-right",
        center: "left-1/2 -translate-x-1/2 origin-top"
    }

    return (
        <div className="relative inline-block" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer select-none active:scale-95 transition-transform"
            >
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: 8,
                            rotateX: -15,
                            filter: "blur(8px)"
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 4,
                            rotateX: 0,
                            filter: "blur(0px)"
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: 8,
                            rotateX: -15,
                            filter: "blur(8px)"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                        }}
                        style={{ perspective: "1000px" }}
                        className={cn(
                            "absolute z-50 min-w-[240px] p-2 rounded-2xl border bg-card/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
                            alignments[align],
                            className
                        )}
                    >
                        <div className="flex flex-col gap-0.5">
                            {items.map((item, index) => (
                                <motion.button
                                    key={item.label}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04 + 0.1 }}
                                    onClick={() => {
                                        item.onClick?.()
                                        setIsOpen(false)
                                    }}
                                    className={cn(
                                        "flex items-center justify-between w-full px-3 py-2.5 text-sm transition-all duration-200 group relative overflow-hidden rounded-sm",
                                        item.variant === "destructive"
                                            ? "text-red-500 hover:bg-red-500/10"
                                            : "text-foreground/80 hover:bg-primary hover:text-primary-foreground hover:shadow-primary/20"
                                    )}
                                >
                                    <div className="flex items-center gap-3 relative z-10">
                                        {item.icon && (
                                            <Icon
                                                icon={item.icon}
                                                className={cn(
                                                    "text-lg transition-transform scale-100 group-hover:scale-110",
                                                    item.variant === "destructive" ? "text-red-400" : "opacity-50 group-hover:text-primary-foreground/90"
                                                )}
                                            />
                                        )}
                                        <span className="">{item.label}</span>
                                    </div>

                                    {item.shortcut && (
                                        <span className="relative z-10 text-[10px] bg-muted dark:bg-zinc-800 px-1.5 py-0.5 rounded-md font-mono opacity-50 group-hover:bg-white/20 group-hover:text-white group-hover:opacity-100 transition-all">
                                            {item.shortcut}
                                        </span>
                                    )}

                                    {/* Hover Shine Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </motion.button>
                            ))}
                        </div>

                        {/* Top Accent Line */}
                        <div className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

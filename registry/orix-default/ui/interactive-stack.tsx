"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveStackProps {
    items: {
        title: string
        description: string
        color: string
        icon?: React.ReactNode
    }[]
    className?: string
}

export function InteractiveStack({ items, className }: InteractiveStackProps) {
    return (
        <div className={cn("relative h-64 w-full max-w-[300px] flex items-center justify-center pt-20", className)}>
            {items.map((item, index) => (
                <motion.div
                    key={item.title}
                    whileHover="hover"
                    initial="initial"
                    variants={{
                        initial: {
                            rotate: (index - Math.floor(items.length / 2)) * 2,
                            x: (index - Math.floor(items.length / 2)) * 10,
                            y: index * -5,
                            scale: 1 - (items.length - index) * 0.05,
                            zIndex: index,
                        },
                        hover: {
                            rotate: (index - Math.floor(items.length / 2)) * 15,
                            x: (index - Math.floor(items.length / 2)) * 80,
                            y: index * -15,
                            scale: 1,
                            zIndex: 10 + index,
                        }
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    style={{ backgroundColor: item.color }}
                    className="absolute h-48 w-40 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden group cursor-pointer"
                >
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none " />

                    <div className="p-4 flex flex-col h-full text-white ">
                        <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                            {item.icon}
                        </div>
                        <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                        <p className="text-[10px] opacity-70 mt-1 line-clamp-3 leading-relaxed">
                            {item.description}
                        </p>

                        <div className="mt-auto pt-2 border-t border-white/10 flex justify-between items-center">
                            <span className="text-[8px] font-black tracking-widest uppercase">Inspect</span>
                            <div className="h-3 w-3 rounded-full border border-white/50" />
                        </div>
                    </div>

                    {/* Reveal Interaction */}
                    <motion.div
                        variants={{
                            initial: { opacity: 0, y: 10 },
                            hover: { opacity: 1, y: 0 }
                        }}
                        className="absolute inset-0 bg-primary/50 backdrop-blur-[2px] flex items-center justify-center pointer-events-none rounded-xl "
                    >
                        <span className="text-primary-foreground font-black text-[10px] uppercase tracking-widest">Detail View</span>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}

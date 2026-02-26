"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface DockItem {
    title: string
    icon: string
    href: string
}

interface ExpandableDockProps {
    items: DockItem[]
    className?: string
}

export function ExpandableDock({ items, className }: ExpandableDockProps) {
    const mouseX = useMotionValue(Infinity)

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto flex h-16 items-end gap-4 rounded-2xl border bg-card/70 px-4 pb-3 backdrop-blur-xl shadow-2xl",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    )
}

function IconContainer({ mouseX, title, icon }: { mouseX: any; title: string; icon: string; href: string }) {
    const ref = React.useRef<HTMLDivElement>(null)

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    const [hovered, setHovered] = React.useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 2, x: "-50%" }}
                        className="absolute -top-12 left-1/2 w-fit whitespace-pre rounded-md border bg-popover px-2 py-0.5 text-xs text-popover-foreground shadow-md"
                    >
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                ref={ref}
                style={{ width, height }}
                className="group relative flex items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary"
            >
                <Icon
                    icon={icon}
                    className="h-full w-full p-2.5 text-muted-foreground transition-colors group-hover:text-primary-foreground"
                />
            </motion.div>
        </div>
    )
}

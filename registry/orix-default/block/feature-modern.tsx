"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface Feature {
    title: string
    description: string
    icon: string
    image: string
    color: string
}

const features: Feature[] = [
    {
        title: "Real-time Collaboration",
        description: "Work together with your team in real-time with zero latency. Built-in versioning and conflict resolution come standard.",
        icon: "solar:users-group-rounded-bold-duotone",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Automated Workflows",
        description: "Set up complex pipelines with our intuitive drag-and-drop editor. Automate repetitive tasks and focus on building.",
        icon: "solar:settings-minimalistic-bold-duotone",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Global Edge Network",
        description: "Deploy your applications to over 100 edge locations worldwide for lightning-fast performance everywhere.",
        icon: "solar:globus-bold-duotone",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        color: "from-amber-500 to-orange-500"
    }
]

export function FeatureModern() {
    return (
        <section className="relative bg-background pt-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-24 space-y-4 max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">Deep Dive into Power.</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Experience a new standard of development with tools designed for high-performance teams.
                    </p>
                </div>

                <div className="space-y-40 pb-40">
                    {features.map((feature, index) => (
                        <FeatureItem key={feature.title} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function FeatureItem({ feature, index }: { feature: Feature; index: number }) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -100])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <div
            ref={containerRef}
            className={cn(
                "flex flex-col md:flex-row items-center gap-12 md:gap-24 min-h-[60vh]",
                index % 2 === 1 && "md:flex-row-reverse"
            )}
        >
            {/* Visual Part */}
            <motion.div
                style={{ scale, opacity }}
                className="relative flex-1 aspect-video w-full"
            >
                <div className={cn(
                    "absolute inset-0 rounded-[2rem] bg-linear-to-br blur-3xl opacity-20",
                    feature.color
                )} />
                <div className="relative h-full w-full rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl bg-muted/40 backdrop-blur-sm">
                    <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </motion.div>

            {/* Content Part */}
            <motion.div
                style={{ y }}
                className="flex-1 space-y-6"
            >
                <div className={cn(
                    "h-14 w-14 rounded-2xl bg-linear-to-br flex items-center justify-center text-white shadow-xl",
                    feature.color
                )}>
                    <Icon icon={feature.icon} className="text-3xl" />
                </div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    {feature.description}
                </p>
                <button className="flex items-center gap-2 font-bold text-primary group">
                    Learn more
                    <Icon icon="solar:arrow-right-bold" className="transition-transform group-hover:translate-x-1" />
                </button>
            </motion.div>
        </div>
    )
}

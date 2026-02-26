"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

const testimonials = [
    {
        quote: "Orix UI completely changed how we build prototypes. The components are not just fast, they're beautiful out of the box.",
        author: "Sarah Drasner",
        role: "Head of DX at MajorTech",
        avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        quote: "I've used many registries, but the attention to detail in Orix is unparalleled. The interactions are buttery smooth.",
        author: "Guillermo Rauch",
        role: "Founder of Vercel",
        avatar: "https://www.ey.com/adobe/dynamicmedia/deliver/dm-aid--5ff3f077-3c8f-4351-882a-d77db9228b2f/ey-weoy-2025-argentina-guillermo-v1.jpg?quality=85&preferwebp=true"
    },
    {
        quote: "The copy-paste experience is seamless. It's the first thing I reach for when starting a new project.",
        author: "Lee Robinson",
        role: "Product training at CURSOR AI",
        avatar: "https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5438251d-7ebe-49f2-bec7-4c96ec5a7f07/lee-robinson-200x200.jpg"
    }
]

export function TestimonialsSection() {
    return (
        <section className="py-24 px-6 bg-muted/20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl tracking-tighter">Trusted by the best.</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Don't take our word for it. Hear what industry leaders have to say about Orix UI.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.author}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all relative group"
                        >
                            <div className="flex flex-col h-full space-y-6 ">

                                <span className="absolute -top-4 -left-4 -rotate-12">
                                    <Icon icon="glyphs:quote-duo" className="text-5xl opacity-50 group-hover:opacity-100 transition-all" />
                                </span>

                                <p className="text-lg leading-relaxed italic text-foreground/80 flex-1">
                                    {t.quote}
                                </p>
                                <div className="flex items-center gap-4">
                                    <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border bg-muted object-cover" />
                                    <div>
                                        <h4 className=" text-sm tracking-widest uppercase">{t.author}</h4>
                                        <p className="text-xs text-muted-foreground tracking-tight">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

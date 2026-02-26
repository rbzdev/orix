"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ShimmerButton } from "../ui/shimmer-button"

const tiers = [
    {
        name: "Starter",
        price: "0",
        description: "Perfect for exploring the possibilities of Orix UI.",
        features: ["10+ UI Components", "Basic Documentation", "Community Support"],
        buttonText: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "49",
        description: "For professional developers who want to scale fast.",
        features: ["All UI Components", "Exclusive Blocks", "Premium Support", "Figma Files"],
        buttonText: "Go Pro",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Custom solutions for large scale organizations.",
        features: ["White-glove Service", "Custom Component Design", "Enterprise-grade SLAs"],
        buttonText: "Contact Us",
        popular: false,
    },
]

export function PricingSection() {
    return (
        <section className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Simple Pricing.</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Choose the plan that fits your ambition. Transparent pricing for premium quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={cn(
                                "group relative flex flex-col p-8 rounded-3xl border transition-all",
                                tier.popular ? "bg-muted shadow-2xl scale-105 z-10 border-primary/50" : "bg-card border-border hover:border-primary/30"
                            )}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black">{tier.price === "Custom" ? "" : "$"}</span>
                                    <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                                    <span className="text-muted-foreground">{tier.price === "Custom" ? "" : "/mo"}</span>
                                </div>
                                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary border rounded-full p-1 bg-primary/10 dark:bg-primary/20"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <ShimmerButton className="w-full">
                                {tier.buttonText}
                            </ShimmerButton>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

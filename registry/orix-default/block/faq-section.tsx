"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const faqs = [
    {
        question: "Is Orix UI really free?",
        answer: "Yes! Orix UI is an open-source project. You can use it in your personal and commercial projects for free. No credit card required."
    },
    {
        question: "How do I install the components?",
        answer: "Installation is simple. Pick a component, copy the source code, and paste it into your project. Make sure you have the required dependencies like Framer Motion."
    },
    {
        question: "Can I customize the designs?",
        answer: "Absolutely. Everything is built with Tailwind CSS, so you can easily change colors, padding, rounding, and layouts directly in the JSX."
    },
    {
        question: "Does it support Dark Mode?",
        answer: "Every single component and block in the Orix registry is designed with Dark and Light mode support from the ground up."
    }
]

function FaqItem({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void
}) {
    return (
        <div className="border-b border-border/60 overflow-hidden">
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between py-6 text-left transition-all hover:text-primary"
            >
                <span className="text-xl font-bold tracking-tight">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="pb-6 text-muted-foreground leading-relaxed max-w-2xl">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FaqSection() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0)

    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter capitalize underline decoration-primary decoration-4 underline-offset-8">Questions?</h2>
                    <p className="text-muted-foreground text-lg">
                        Everything you need to know about Orix UI in one place.
                    </p>
                </div>

                <div className="divide-y divide-border/60">
                    {faqs.map((faq, i) => (
                        <FaqItem
                            key={i}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

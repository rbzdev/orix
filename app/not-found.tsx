"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { GooeyButton } from "@/registry/orix-default/ui/gooey-button"
import { Navbar } from "@/components/block/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="relative min-h-screen bg-background font-sans antialiased flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                <div className="text-center space-y-12 relative z-10 scale-90 sm:scale-100">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 min-h-150"
                    >
                        <h1 className="text-[250px] md:text-[400px] font-black tracking-tighter leading-none italic select-none text-zinc-900/10 dark:text-zinc-100/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            404
                        </h1>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-100">
                                Ressource <span className="text-primary">Not Found</span>
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                                The registry slice you are looking for doesn't exist or has been moved to a new module.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-6 mb-20"
                    >
                        <Link href="/">
                            <Button variant="default">
                                <div className="flex items-center gap-2">
                                    <Icon icon="solar:home-2-bold-duotone" className="text-xl" />
                                    <span>Back Home</span>
                                </div>
                            </Button>
                        </Link>

                        <Link href="/docs">
                            <Button variant="outline" className="py-2!">
                                Explore Docs
                            </Button>
                        </Link>
                    </motion.div>

                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-40 lg:bottom-20 left-10 opacity-20 -rotate-12 lg:rotate-none ">
                    <Icon icon="solar:programming-bold-duotone" className="size-24 text-primary" />
                </div>
                <div className="absolute top-40 right-10 opacity-20 lg:block rotate-12">
                    <Icon icon="solar:code-square-bold-duotone" className="size-24 text-zinc-400" />
                </div>
            </main>

            <Footer />
        </div>
    )
}
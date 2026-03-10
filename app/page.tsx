"use client"

import { VelocityScroll } from "@/registry/orix-default/block/velocity-scroll"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import Link from "next/link"

// UI Components
import { GooeyButton } from "@/registry/orix-default/ui/gooey-button"

// Blocks
import { Navbar } from "@/components/block/navbar"
import { Header } from "@/components/block/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative min-h-screen bg- antialiased">
      <Navbar />

      <main>
        {/* -- Hero Section -- */}
        <div className="relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

          <Header
          // badge="Exclusive Access • Orix UI v1.0"
          // title="The Premium Registry for Modern Interfaces"
          // description="A curated collection of high-fidelity React components designed to wow your users. Built with Framer Motion and Tailwind CSS."
          // primaryAction={{ label: "View Components", href: "/docs" }}
          // secondaryAction={{ label: "GitHub Repository", href: "https://github.com" }}
          />
        </div>

        {/* -- Tech Stack Ticker -- */}
        <div className="relative border-y bg-muted/20 py-10 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
          <VelocityScroll
            text="CRAFTED WITH PRECISION • HIGH FIDELITY • COPY & PASTE • NEXT.JS • FRAMER MOTION • TAILWIND CSS • "
            default_velocity={1}
            className="text-[10px] uppercase font-black tracking-[0.4em] opacity-20"
          />
        </div>

        {/* -- Core Value Props -- */}
        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-3xl font-black tracking-tighter sm:text-5xl">Built for the next generation of web.</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stop spending hours on building common UI fragments. Focus on your business logic while we handle the aesthetic perfection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                {
                  title: "Immersive Interaction",
                  desc: "Every component is engineered with secondary motions and micro-interactions that make your apps feel alive.",
                  icon: "fluent:magic-wand-28-regular",
                  // color: "text-primary bg-primary/10"
                },
                {
                  title: "Developer First",
                  desc: "No complex installation or vendor lock-in. Just copy the code and paste it into your project. Full ownership.",
                  icon: "solar:code-bold-duotone",
                  // color: "text-emerald-500 bg-emerald-500/10"
                },
                {
                  title: "Production Ready",
                  desc: "Battle-tested performance and accessibility. Optimized for Next.js, Server Components, and the latest React features.",
                  icon: "gala:terminal",
                  // color: "text-amber-500 bg-amber-500/10"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group space-y-6 p-8 rounded-3xl border hover:bg-muted/30 transition-all"
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110 `}>
                    <Icon icon={feature.icon} className="text-3xl" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* -- Final Call to Action -- */}
        <section className="py-40 px-6 border-t bg-linear-to-b from-transparent to-muted/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)]" />

          <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic">
              Ready to transform <br /> your UI?
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/docs" className="group ">

                <GooeyButton >
                  <div className="flex items-center gap-1">

                    <span> Browse the Gallery </span>

                    <Icon icon="solar:arrow-right-linear" className="text-xl transition-transform group-hover:translate-x-1" />
                  </div>
                </GooeyButton>

              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image";

interface NavItem {
  label: string
  href: string
  description?: string
  icon?: string
}

interface NavbarProps {
  items?: NavItem[]
  className?: string
}

const defaultItems: NavItem[] = [

  {
    label: "Documentation",
    href: "/docs",
    description: "Learn how to use Orix",
    icon: "fluent:code-block-48-regular"
  },
  {
    label: "Blocks",
    href: "/blocks",
    description: "Premium pre-built UI sections",
    icon: "proicons:component"
  },
  {
    label: "Components",
    href: "/components",
    description: "Atomic UI building blocks",
    icon: "basil:box-outline"
  },
]

export function Navbar({
  items = defaultItems,
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out",
        scrolled ? "top-4 px-4" : "top-0 px-0",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between transition-all duration-500 px-4 sm:px-6",
          scrolled
            ? "max-w-5xl rounded-2xl border border-white/10 bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:bg-black/60 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "max-w-7xl border-transparent bg-transparent"
        )}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap- group">
          <Image src="/logo_min.png" alt="orix-logo" height={40} width={40} className="bg-primary dark:bg-transparent rounded-lg p-1" />
          <h1 className="text-xl"> orix-UI</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white group"
            >
              {item.label}
              <span className="absolute inset-x-2 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 relative z-50">
          <div className="hidden items-center gap-1 sm:flex mr-2">
            <Link
              href="https://github.com/rbzdev"
              target="_blank"
              className="group flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Github className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white" />
            </Link>
            <ThemeToggle
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
            />
          </div>

          <Button
            variant="default"
            size="sm"
            className="hidden sm:inline-flex rounded-full px-5 font-semibold shadow-indigo-500/20"
          >
            Get Started
            <Icon icon="guidance:left-arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white/50 text-zinc-600 transition-all active:scale-90 dark:border-zinc-800 dark:bg-black/50 dark:text-zinc-400 md:hidden",
              isOpen && "dark:bg-primary/10"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-zinc-950/20 backdrop-blur-xs transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed inset-x-4 top-20 z-50 overflow-hidden rounded-3xl border border-white/10 bg-white/95 p-6 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] dark:bg-zinc-900/95 md:hidden",
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-8 opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-2">
              Menu
            </p>
            <div className="grid gap-2">
              {items.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${i * 50}ms` }}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl bg-zinc-50/50 p-4 transition-all hover:bg-indigo-50 dark:bg-white/5 dark:hover:bg-indigo-500/10",
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-zinc-800">
                      <Icon icon={item.icon || "solar:link-bold"} className="text-xl" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.label}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.description}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <div className="flex items-center justify-between px-">

              <ThemeToggle className="scale-125" />


              <Link
                href="https://github.com/rbzdev"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 dark:bg-white/5"
              >
                <Github className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </Link>
            </div>
            <Button className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, } from "lucide-react";
import { Icon } from "@iconify/react";

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

interface Navbar01Props {
  logo?: React.ReactNode
  items?: NavItem[]
  className?: string
}

const defaultItems: NavItem[] = [
  { label: "Blocks", href: "/blocks" },
  { label: "Components", href: "/components" },
  { label: "Documentation", href: "/docs" },
]

export function Navbar({
  logo,
  items = defaultItems,
  className,
}: Navbar01Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "top-4 px-4 py-0"
          : "top-0 px-0 py-0",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between transition-all duration-300 px-4 sm:px-6 lg:px-8",
          scrolled
            ? "max-w-5xl rounded-2xl border border-white/10 bg-white/70 shadow-2xl backdrop-blur-xl dark:bg-black/70"
            : "max-w-7xl  border-border/40 bg-background/0"
        )}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          {logo ?? (
            <div className="flex items-center gap-1">
              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-primary shadow-lg transition-transform group-hover:scale-110 active:scale-95">
                <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent" />
                <span className="relative text-sm font-black text-primary-foreground tracking-tighter">
                  orx
                </span>
              </div>
              <span className="hidden text-xl font-bold tracking-tight text-foreground sm:block">
                orix
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Navigation (Center) */}
        <div className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground group"
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-1 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="https://github.com/rubuz/safaridew"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon icon="line-md:github" className="h-5 w-5" />
            </Link>
            <ThemeToggle
              // animation="morph"
              origin="button"
              duration={500}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            />

          </div>

          <Button
            // size="sm"
            // variant="ghost"
            className=" group"
          >
            Get Started
            <Icon icon="guidance:left-arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-accent/30 text-muted-foreground transition-all hover:bg-accent hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={cn(
          "absolute inset-x-4 top-20 overflow-hidden rounded-2xl border border-white/10 bg-white/90 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-500 ease-in-out dark:bg-black/90 md:hidden",
          isOpen ? "translate-y-0 opacity-100 max-h-[400px]" : "-translate-y-4 opacity-0 max-h-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-1 p-2">
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all hover:bg-primary/10 hover:text-primary",
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              )}
            >
              {item.label}
              <Icon icon="guidance:left-arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4 px-2">
            <ThemeToggle animation="circle" />
            <Button className="w-full ml-4 rounded-xl">Join Community</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}



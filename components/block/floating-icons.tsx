"use client"

import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface FloatingIconsProps {
  className?: string
}

const icons = [
  { name: "vscode-icons:file-type-astro", label: "Astro", delay: 0 },
  { name: "logos:react", label: "React", delay: 0.2 },
  { name: "logos:nextjs-icon", label: "Next.js", delay: 0.4 },
  { name: "logos:vue", label: "Vue.js", delay: 0.6 },
  { name: "logos:nuxt-icon", label: "Nuxt", delay: 0.8 },
  { name: "logos:vitejs", label: "Vite", delay: 1 },
  { name: "logos:tailwindcss-icon", label: "Tailwind CSS", delay: 1.2 },
]

export function FloatingIcons({ className }: FloatingIconsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <style>{`
        @layer utilities {
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          
          @keyframes float-medium {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-15px) translateX(-10px); }
          }
          
          @keyframes float-fast {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-25px) translateX(5px); }
          }
          
          .icon-float-slow {
            @apply animate-none;
            animation: float-slow 6s ease-in-out infinite;
          }
          
          .icon-float-medium {
            @apply animate-none;
            animation: float-medium 5s ease-in-out infinite;
          }
          
          .icon-float-fast {
            @apply animate-none;
            animation: float-fast 7s ease-in-out infinite;
          }
        }
      `}</style>

      {/* Top Left Icons */}
      <div className="absolute -top-20 -left-20 h-40 w-40 opacity-10 blur-3xl bg-primary rounded-full" />

      {/* Scattered Icons - absolute positions for a more organic layout */}
      <div className="absolute inset-0 pointer-events-none">
        {icons.map((icon, index) => {
          const positions = [
            { top: "10%", left: "8%" },
            { top: "14%", left: "60%" },
            { top: "28%", left: "28%" },
            { top: "46%", left: "75%" },
            { top: "62%", left: "12%" },
            { top: "88%", left: "52%" },
            { top: "35%", left: "85%" },
          ]

          const pos = positions[index % positions.length]
          const floatClass = index % 3 === 0 ? "icon-float-slow" : index % 3 === 1 ? "icon-float-medium" : "icon-float-fast"

          return (
            <div
              key={icon.name}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                transform: `translate(-50%, -50%) rotate(${(index % 5) * 6}deg)`,
                animationDelay: `${icon.delay}s`,
                zIndex: 0,
              }}
              className={cn("w-16 h-16 flex items-center justify-center pointer-events-auto", floatClass)}
            >
              <div className="relative group">
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/20 to-primary/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-border/50 hover:border-border transition-colors">
                  <Icon
                    icon={icon.name}
                    width={32}
                    height={32}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  />
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {icon.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Right Gradient */}
      <div className="absolute -bottom-20 -right-20 h-40 w-40 opacity-10 blur-3xl bg-primary/50 rounded-full" />
    </div>
  )
}

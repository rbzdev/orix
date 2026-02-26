"use client"

import * as React from "react"

interface FloatingIconsProps {
    className?: string
}

const icons = [
    {
        label: "Astro",
        delay: 0,
        svg: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M11.2 2.2c.4-.3.9-.3 1.3 0l8.3 5.4c.4.3.6.7.6 1.2v6.4c0 .5-.2.9-.6 1.2l-8.3 5.3c-.4.3-.9.3-1.3 0l-8.3-5.3c-.4-.3-.6-.7-.6-1.2V8.8c0-.5.2-.9.6-1.2l8.3-5.4z" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l4-4 4 4-4 4-4-4z" fill="currentColor" />
            </svg>
        )
    },
    {
        label: "React",
        delay: 0.2,
        svg: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
            </svg>
        )
    },
    {
        label: "Next.js",
        delay: 0.4,
        svg: (
            <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M145.4 145.4c-35-35-91.8-35-126.8 0" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                <path d="M145.4 34.6c-35 35-35 91.8 0 126.8" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                <circle cx="90" cy="90" r="12" fill="currentColor" />
            </svg>
        )
    },
    {
        label: "Tailwind",
        delay: 0.6,
        svg: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M12.001 6.002c-2.73 0-4.102 1.365-5.467 4.09 1.365-1.363 2.733-2.046 4.103-2.046 2.05 0 3.076.683 4.102 2.046.684.91 1.367 1.82 2.735 1.82 2.73 0 4.102-1.365 5.467-4.09-1.365 1.363-2.733 2.046-4.103 2.046-2.05 0-3.076-.683-4.102-2.046-.684-.91-1.367-1.82-2.735-1.82zM6.535 11.458c-2.73 0-4.102 1.365-5.467 4.091 1.365-1.364 2.733-2.047 4.103-2.047 2.05 0 3.076.683 4.102 2.047.684.91 1.367 1.82 2.735 1.82 2.73 0 4.102-1.365 5.467-4.091-1.365 1.364-2.733 2.047-4.103 2.047-2.05 0-3.076-.683-4.102-2.047-.684-.91-1.367-1.82-2.735-1.82z" fill="currentColor" />
            </svg>
        )
    },
    {
        label: "Vite",
        delay: 0.8,
        svg: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M12 2L3 4l2 15 7 3 7-3 2-15-9-2z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6l-3 6h6l-3 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        label: "TypeScript",
        delay: 1.0,
        svg: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 font-black">
                <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.1" />
                <text x="6" y="18" fill="currentColor" fontSize="12">TS</text>
            </svg>
        )
    },
    {
        label: "Node.js",
        delay: 1.2,
        svg: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
        )
    }
]

export function FloatingIcons({ className }: FloatingIconsProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
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
            animation: float-slow 6s ease-in-out infinite;
          }
          
          .icon-float-medium {
            animation: float-medium 5s ease-in-out infinite;
          }
          
          .icon-float-fast {
            animation: float-fast 7s ease-in-out infinite;
          }
        }
      `}</style>

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
                            key={icon.label}
                            style={{
                                position: "absolute",
                                top: pos.top,
                                left: pos.left,
                                transform: `translate(-50%, -50%) rotate(${(index % 5) * 6}deg)`,
                                animationDelay: `${icon.delay}s`,
                                zIndex: 0,
                            }}
                            className={`w-16 h-16 flex items-center justify-center pointer-events-auto ${floatClass}`}
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/20 to-primary/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-border/50 hover:border-border transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground">
                                    {icon.svg}
                                </div>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {icon.label}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

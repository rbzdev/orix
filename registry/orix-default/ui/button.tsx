import * as React from "react"

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

interface ButtonProps extends React.ComponentProps<"button"> {
    variant?: ButtonVariant
    size?: ButtonSize
}

/**
 * Orix Premium Button
 * A unique style featuring a multi-layered "Inner Border" (Luminous Edge).
 * Engineered for both Light and Dark modes with high-contrast tactile feedback.
 */
const variantStyles: Record<ButtonVariant, string> = {
    default: `
    bg-zinc-900 text-zinc-50 border border-zinc-800 
    shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.4)]
    hover:bg-zinc-800 hover:border-zinc-700
    dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-200
    dark:shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_1px_3px_rgba(0,0,0,0.1)]
    dark:hover:bg-zinc-200
  `,
    destructive: `
    bg-red-600 text-white border border-red-700
    shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_1px_2px_rgba(0,0,0,0.2)]
    hover:bg-red-500 hover:border-red-600
    dark:bg-red-500 dark:border-red-400
    dark:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset]
  `,
    outline: `
    border border-zinc-200 bg-white text-zinc-900
    shadow-[0_1px_2px_rgba(0,0,0,0.05)]
    hover:bg-zinc-50 hover:border-zinc-300
    dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50
    dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]
    dark:hover:bg-zinc-900 dark:hover:border-zinc-700
  `,
    secondary: `
    bg-zinc-100 text-zinc-900 border border-zinc-200/50
    shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset]
    hover:bg-zinc-200
    dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-700
    dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]
    dark:hover:bg-zinc-700/50
  `,
    ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
    link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
}

const sizeStyles: Record<ButtonSize, string> = {
    default: "h-9 px-4 py-2",
    xs: "h-6 gap-1 rounded-md px-2 text-xs",
    sm: "h-8 rounded-md gap-1.5 px-3",
    lg: "h-11 rounded-xl px-8 text-base",
    icon: "size-9",
    "icon-xs": "size-6 rounded-md",
    "icon-sm": "size-8",
    "icon-lg": "size-11",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        const baseClass = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 focus-visible:ring-offset-2 cursor-pointer active:scale-[0.97] active:brightness-90"

        return (
            <button
                ref={ref}
                className={`${baseClass} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

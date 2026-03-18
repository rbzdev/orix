import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Theme
import { ThemeProvider } from "@/components/theme-provider";

// Analytics
import { GoogleAnalytics } from '@next/third-parties/google'


// Blocks
// import DevHuntBanner from "@/components/block/devhunt-banner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://orix-three.vercel.app'),
  title: "Orix - The Next-Gen Component Library",
  description: "A lightning-fast, highly customizable component Library built entirely on top of shadcn/ui.",
  keywords: [
    "Orix",
    "shadcn/ui",
    "React components",
    "Next.js registry",
    "UI library",
    "Tailwind CSS components",
    "open-source UI",
    "frontend web development",
  ],
  authors: [{ name: "Olivier Rubuz" }],
  creator: "Olivier Rubuz",

  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Orix - The Next-Gen Component Library",
    description: "A lightning-fast, highly customizable component Library built entirely on top of shadcn/ui.",
    siteName: "Orix",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Orix - The Next-Gen Component Registry",
      },
      {
        url: "/logo_min.png",
        width: 300,
        height: 275,
        alt: "Orix Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orix - The Next-Gen Component Library",
    description: "A lightning-fast, highly customizable component Library built entirely on top of shadcn/ui.",
    images: ["/logo.png"],
    creator: "@rubuz_",
  },
  icons: {
    icon: "/logo_min.png",
    shortcut: "/icon.ico",
    apple: "/logo_min.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Orix",
    description: "A lightning-fast, highly customizable component Library built entirely on top of shadcn/ui.",
    url: "https://orix-three.vercel.app",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        {/* <script defer data-url="https://devhunt.org/tool/orix-ui" src="https://cdn.jsdelivr.net/gh/sidiDev/devhunt-banner/indexV0.js" /> */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <DevHuntBanner /> */}
          {children}
        </ThemeProvider>
      </body>

      <GoogleAnalytics gaId="G-JCTXK9E6MQ" />
    </html>
  );
}

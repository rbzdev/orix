import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Theme
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        url: "https://orix-rbr2.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Orix - The Next-Gen Component Registry",
      },
      {
        url: "https://orix-rbr2.vercel.app/logo_min.png",
        width: 400,
        height: 400,
        alt: "Orix Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orix - The Next-Gen Component Library",
    description: "A lightning-fast, highly customizable component Library built entirely on top of shadcn/ui.",
    images: ["https://orix-rbr2.vercel.app/logo.png"],
    creator: "@rubuz_",
  },
  icons: {
    icon: "https://orix-rbr2.vercel.app/logo_min.png",
    shortcut: "https://orix-rbr2.vercel.app/logo_min.png",
    apple: "https://orix-rbr2.vercel.app/logo_min.png",
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
    url: "https://orix-rbr2.vercel.app",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

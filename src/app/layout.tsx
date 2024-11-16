import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/**
 * TODO: update metadata
 * Next.js PWA Boilerplate Metadata Configuration
 *
 * This configuration includes:
 * 1. Basic Metadata
 *    - Dynamic titles with template support
 *    - SEO-optimized descriptions
 *    - Author and creator information
 *
 * 2. PWA Support
 *    - Required icons (512x512 minimum)
 *    - Web manifest link
 *    - Theme colors for light/dark modes
 *
 * 3. Social Media
 *    - OpenGraph tags for social sharing
 *    - Twitter card configuration
 *    - Required social images (1200x630 for OG, 1200x600 for Twitter)
 *
 * 4. Search Engine Optimization
 *    - Google bot configurations
 *    - Meta keywords
 *    - Robots meta directives
 *
 * Required Environment Variables:
 * - NEXT_PUBLIC_APP_URL=your-production-url
 *
 * Required Assets:
 * - /icon-512x512.png (PWA icon)
 * - /og-image.png (1200x630, social sharing)
 * - /twitter-image.png (1200x600, Twitter card)
 * - /manifest.webmanifest (PWA manifest file)
 */
export const metadata: Metadata = {
  title: {
    default: "Next.js PWA Boilerplate",
    template: "%s | Next.js PWA Boilerplate",
  },
  description:
    "A modern Next.js boilerplate with Clerk authentication, Shadcn UI components, Tailwind CSS, and PWA support",
  applicationName: "Next.js PWA Boilerplate",
  authors: [{ name: "Your Name", url: "https://github.com/yourusername" }],
  generator: "Next.js",
  keywords: [
    "nextjs",
    "react",
    "typescript",
    "tailwindcss",
    "shadcn-ui",
    "clerk-auth",
    "pwa",
    "boilerplate",
    "template",
    "web-development",
  ],
  creator: "Your Name",
  publisher: "Your Name",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    title: "Next.js PWA Boilerplate",
    description:
      "A modern Next.js boilerplate with Clerk authentication, Shadcn UI components, Tailwind CSS, and PWA support",
    siteName: "Next.js PWA Boilerplate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next.js PWA Boilerplate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js PWA Boilerplate",
    description:
      "A modern Next.js boilerplate with Clerk authentication, Shadcn UI components, Tailwind CSS, and PWA support",
    images: ["/twitter-image.png"],
    creator: "@yourusername",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon-512x512.png", type: "image/png" }],
    apple: [{ url: "/icon-512x512.png", type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icon-512x512.png",
      },
    ],
  },
  category: "technology",
};

/**
 * TODO: update viewport
 * Viewport Configuration
 *
 * Important considerations:
 * 1. Theme Colors
 *    - Matches with your tailwind.config.ts theme
 *    - Provides different colors for light/dark modes
 *
 * 2. Mobile Optimization
 *    - Fixed scale prevents zooming issues on mobile
 *    - Viewport fit covers notched devices
 *
 * 3. PWA Display
 *    - Supports both light and dark color schemes
 *    - Ensures proper display on iOS devices
 *
 * Note: userScalable is set to false for PWA optimization.
 * Consider enabling it if accessibility is a priority.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "dark light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          Building Your Application
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

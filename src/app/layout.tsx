import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { getCurrentSession } from "@/actions/auth";
import CategorySelector from "@/components/layout/CategorySelector";
import Cart from "@/components/cart/Cart";
import { Suspense } from "react";
import Script from "next/script";

// Ensure this layout uses Node.js runtime
export const runtime = 'nodejs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DEAL - Premium E-commerce Store | Best Deals & Discounts",
    template: "%s | DEAL - Premium E-commerce Store",
  },
  description:
    "Discover amazing deals and discounts at DEAL. Premium products with exclusive member benefits, free shipping on orders over $150, and 90% off your first order. Shop now!",
  keywords: [
    "e-commerce",
    "deals",
    "discounts",
    "shopping",
    "premium products",
    "free shipping",
    "member exclusive",
  ],
  authors: [{ name: "DEAL Team" }],
  creator: "DEAL",
  publisher: "DEAL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://shiny-couscous.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "DEAL - Premium E-commerce Store | Best Deals & Discounts",
    description:
      "Discover amazing deals and discounts at DEAL. Premium products with exclusive member benefits, free shipping on orders over $150, and 90% off your first order.",
    siteName: "DEAL",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DEAL - Premium E-commerce Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEAL - Premium E-commerce Store | Best Deals & Discounts",
    description:
      "Discover amazing deals and discounts at DEAL. Premium products with exclusive member benefits, free shipping on orders over $150, and 90% off your first order.",
    images: ["/og-image.jpg"],
    creator: "@deal_store",
  },
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
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Next.js will automatically inject this in <head>
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DEAL",
    description: "Premium e-commerce store offering amazing deals and discounts",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://shiny-couscous.vercel.app",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://shiny-couscous.vercel.app"}/logo.png`,
    sameAs: ["https://twitter.com/deal_store", "https://facebook.com/deal_store"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
    offers: {
      "@type": "Offer",
      description: "Free shipping on orders over $150",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_SITE_URL || "https://shiny-couscous.vercel.app"}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-[120vh]`}
      >
        <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
          <Header user={user} categorySelector={<CategorySelector />} />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
          {children}
        </Suspense>
        <Suspense fallback={null}>
          <Cart />
        </Suspense>
        {/* Temporarily disabled SanityLive to fix build issues */}
        {/* <Suspense fallback={null}>
          <SanityLive />
        </Suspense> */}
      </body>
    </html>
  );
}

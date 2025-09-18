import { getAllProducts } from "@/sanity/lib/sitemap-client";
import ProductCard from "@/components/product/ProductCard";
import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import WheelOfFortune from "@/components/layout/WheelOfFortune";
import { Suspense } from "react";
import { Metadata } from "next";

// Enable static generation with revalidation
export const revalidate = 600; // Revalidate every 10 minutes for better performance
export const dynamic = 'force-static'; // Force static generation

export const metadata: Metadata = {
  title: "Home",
  description: "Discover amazing deals and discounts at DEAL. Premium products with exclusive member benefits, free shipping on orders over $150, and 90% off your first order. Shop now!",
  keywords: ["home", "deals", "discounts", "shopping", "premium products", "free shipping", "member exclusive"],
  openGraph: {
    title: "DEAL - Premium E-commerce Store | Best Deals & Discounts",
    description: "Discover amazing deals and discounts at DEAL. Premium products with exclusive member benefits, free shipping on orders over $150, and 90% off your first order.",
    url: "/",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "DEAL - Premium E-commerce Store Homepage",
      },
    ],
  },
};

// Loading component for Suspense
function ProductGridSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const products = await getAllProducts();
  
  return (
    <main>
      <SalesCampaignBanner />
      <Suspense fallback={<div className="min-h-[400px] bg-gray-50 animate-pulse" />}>
        <WheelOfFortune products={products} winningIndex={0} />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton />}>
        <section className='container mx-auto py-8'>
          <ProductCard products={products} />
        </section>
      </Suspense>
    </main>
  );
}
 
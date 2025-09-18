import { getAllProducts } from "@/sanity/lib/client";
import ProductCard from "@/components/product/ProductCard";
import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import WheelOfFortune from "@/components/layout/WheelOfFortune";

// Enable static generation with revalidation
export const revalidate = 600; // Revalidate every 10 minutes for better performance
export const dynamic = 'force-static'; // Force static generation

export default async function Home() {
  const products = await getAllProducts();
  
  return (
    <div>
      <SalesCampaignBanner />
      <WheelOfFortune products={products} winningIndex={0} />
      <section className='container mx-auto py-8'>
        <ProductCard products={products} />
      </section>
    </div>
  );
}
 
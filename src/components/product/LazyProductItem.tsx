'use client';

import { lazy, Suspense } from 'react';
import { Product } from '@/sanity.types';

// Lazy load the ProductItem component
const ProductItem = lazy(() => import('./ProductItem'));

type LazyProductItemProps = {
    product: Product;
}

// Skeleton component for loading state
function ProductItemSkeleton() {
  return (
    <div className='bg-white rounded-xl overflow-hidden relative shadow-sm border border-gray-100 animate-pulse'>
      <div className='absolute top-3 right-3 z-10'>
        <div className='bg-gray-200 text-transparent text-xs font-bold px-3 py-1.5 rounded-full'>
          HOT!
        </div>
      </div>
      
      <div className='relative h-48 w-full bg-gray-200' />
      
      <div className='p-4 space-y-3'>
        <div className='h-4 bg-gray-200 rounded w-3/4' />
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center gap-2'>
            <div className='h-5 bg-gray-200 rounded w-16' />
            <div className='h-4 bg-gray-200 rounded w-12' />
          </div>
          <div className='h-3 bg-gray-200 rounded w-24' />
          <div className='h-8 bg-gray-200 rounded-full' />
          <div className='h-3 bg-gray-200 rounded w-20 mx-auto' />
        </div>
      </div>
    </div>
  );
}

const LazyProductItem = ({ product }: LazyProductItemProps) => {
  return (
    <Suspense fallback={<ProductItemSkeleton />}>
      <ProductItem product={product} />
    </Suspense>
  );
};

export default LazyProductItem;

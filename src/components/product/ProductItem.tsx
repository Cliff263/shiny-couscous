import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type ProductItemProps = {
    product: Product;
}
const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className='bg-white rounded-xl overflow-hidden relative shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100'>
        <div className='absolute top-3 right-3 z-10'>
            <span className='bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse shadow-lg'>HOT!</span>
        </div>

        <div className='relative h-48 w-full bg-gray-50 group-hover:bg-gray-100 transition-colors'>
            {product.image && (
                <Image
                    src={urlFor(product.image).width(256).height(256).quality(80).url()}
                    alt={product.title || 'Product Image'}
                    fill
                    className='object-contain p-3 group-hover:scale-105 transition-transform duration-300'
                    loading='lazy'
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
            )}
        </div>

        <div className='p-4 space-y-3'>
            <h3 className='text-sm font-semibold line-clamp-2 h-10 mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors'>{product.title}</h3>
            <div className='flex flex-col space-y-2'>
                <div className='flex items-center gap-2'>
                    <span className='text-lg font-bold text-emerald-600'>${(product.price || 0).toFixed(2)}</span>
                    <span className='text-sm text-gray-400 line-through'>${((product.price || 0) * 5).toFixed(2)}</span>
                </div>
                <div className='text-xs text-emerald-600 font-semibold flex items-center gap-1'>
                    <span className='animate-pulse'>🔥</span>
                    {100 + Math.abs(product._id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 500)}+ sold in last 24h
                </div>
                <Link 
                    href={`/product/${product._id}`}
                    className='w-full text-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2.5 rounded-full text-sm font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                >
                    GRAB IT NOW!
                </Link>
                <div className='text-xs text-emerald-600 text-center font-medium animate-pulse'>⚡ Limited time offer!</div>
            </div>
        </div>
    </div>
  )
}

export default ProductItem
import Link from 'next/link';
import { Metadata } from 'next';
import { Home, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | DEAL - Premium E-commerce Store',
  description: 'The page you are looking for could not be found. Browse our amazing deals and discounts at DEAL.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-emerald-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved, deleted, or doesn&apos;t exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          
          <div className="text-sm text-gray-500">
            or
          </div>
          
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <Search className="h-5 w-5" />
            Search Products
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
}

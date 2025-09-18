"use client";
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import { User } from '@prisma/client';
import { signOut } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import SearchBar from './Seachbar';
import { useCartStore } from '@/stores/cart-store';
import { useShallow } from 'zustand/shallow';
import { ShoppingBag, User as UserIcon, LogOut, LogIn, UserPlus, Menu } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className='w-full bg-gradient-to-r from-emerald-600 to-emerald-700 py-2'>
        <div className='container mx-auto flex items-center justify-center px-8'>
            <span className='text-center text-sm font-medium tracking-wide text-white flex items-center gap-2'>
              <span className='animate-pulse'>🚚</span>
              FREE SHIPPING ON ORDERS OVER $150.00 ● FREE RETURNS ON ALL ORDERS
            </span>
        </div>
    </div>
  )
};
type HeaderProps = {
  user:Omit<User, "passwordHash"> | null;
  categorySelector:React.ReactNode;
};
const Header = ({user,categorySelector}:HeaderProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const { open, getTotalItems } = useCartStore(
    useShallow((state) => ({
        open: state.open,
        getTotalItems: state.getTotalItems
    }))
);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledUp= currentScrollY < prevScrollY;
      if (scrolledUp) {
        setIsMenuOpen(true);
      }else if(currentScrollY > 100){
        setIsMenuOpen(false);
      }
      setPrevScrollY(currentScrollY);
    }
    setPrevScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[prevScrollY]);
  return (
    <header className='w-full bg-white sticky top-0 z-50'>
      <div className={`w-full transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0': '-translate-y-full'}`}>
        <AnnouncementBar/>
        <div className='w-full flex items-center justify-between py-3 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm'>
          <div className='container mx-auto flex items-center justify-between px-8'>
            <div className="flex flex-1 items-center justify-start gap-4 sm:gap-6">
              <button className='text-gray-500 hover:text-gray-900 md:hidden transition-colors' title="Menu" type='button'>
                <Menu className="h-5 w-5" />
              </button>
              <nav className='hidden md:flex gap-4 lg:gap-6 text-sm font-medium'>
                {categorySelector}
                <Link href='/' className='text-gray-700 hover:text-emerald-600 transition-colors font-semibold'>
                  Sale
                </Link>
              </nav>
            </div>
            <Link href='/' className='absolute left-1/2 -translate-x-1/2 group'>
              <span className='text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-emerald-800 transition-all duration-300'>
                DEAL
              </span>
            </Link>
            <div className='flex flex-1 justify-end items-center gap-2 sm:gp-2'>
              <SearchBar/>
              {user ? (
                <div className='flex items-center gap-2 sm:gap-4'>
                  <div className='flex items-center gap-2 text-sm text-gray-700 hidden md:flex'>
                    <UserIcon className='h-4 w-4' />
                    <span className='truncate max-w-32'>{user.email}</span>
                  </div>
                  <button 
                    onClick={async () => {
                      await signOut();
                      router.refresh();
                    }}
                    className='flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-red-600 transition-colors group'
                  >
                    <LogOut className='h-4 w-4 group-hover:scale-110 transition-transform' />
                    <span className='hidden sm:inline'>Sign Out</span>
                  </button>
                </div>
              ):(
                <div className='flex items-center gap-2 sm:gap-3'>
                  <Link 
                    href='/auth/sign-in' 
                    className='flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors group'
                  >
                    <LogIn className='h-4 w-4 group-hover:scale-110 transition-transform' />
                    <span className='hidden sm:inline'>Sign In</span>
                  </Link>
                  <Link 
                    href='/auth/sign-up' 
                    className='flex items-center gap-1 text-xs sm:text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-full transition-colors group'
                  >
                    <UserPlus className='h-4 w-4 group-hover:scale-110 transition-transform' />
                    <span className='hidden sm:inline'>Sign Up</span>
                  </Link>
                </div>
              )}
              <button 
                onClick={() => open()} 
                className='text-gray-700 hover:text-emerald-600 relative transition-colors group' 
                type='button'
              >
                <ShoppingBag className='h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform' />
                <span className='absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-semibold shadow-lg'>
                  {getTotalItems()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;



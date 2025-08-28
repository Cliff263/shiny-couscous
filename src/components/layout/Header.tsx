"use client";
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import { User } from '@prisma/client';
import { signOut } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import SearchBar from './Seachbar';
import { useCartStore } from '@/stores/cart-store';
import { useShallow } from 'zustand/shallow';

const AnnouncementBar = () => {
  return (
    <div className='w-full bg-black py-2'>
        <div className='container mx-auto flex items-center justify-center px-8'>
            <span className='text-center text-sm font-medium tracking-wide text-white'>
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
              <button className='text-gray-500 hover:text-gray-900 md:hidden' title="Menu" type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <nav className='hidden md:flex gap-4 lg:gap-6 text-sm font-medium'>
                {categorySelector}
                <Link href='/'>Sale</Link>
              </nav>
            </div>
            <Link href='#' className='absolute left-1/2 -translate-x-1/2'>
              <span className='text-xl sm:text-2xl font-bold tracking-tight'>
                DEAL
              </span>
            </Link>
            <div className='flex flex-1 justify-end items-center gap-2 sm:gp-2'>
              <SearchBar/>
              {user ? (
                <div className='flex items-center gap-2 sm:gap-4'>
                  <span className='text-sm text-gray-700 hidden md:block'>{user.email}</span>
                  <Link href= '#'className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'
                  onClick={async (e) =>{
                    e.preventDefault();
                    await signOut();
                    router.refresh();}}>
                    SignOut
                  </Link>
                </div>
              ):(
                <React.Fragment>
                  <Link href='/auth/sign-in' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>SignIn</Link>
                  <Link href='/auth/sign-up' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>SignUp</Link>
                </React.Fragment>
              )}
              <button onClick={() => open()} className='text-gray-700 hover:text-gray-900 relative' type='button'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 sm:h-6 sm:w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                </svg>
                <span className='absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center'>
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



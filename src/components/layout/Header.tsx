import React, { useEffect } from 'react'
import React, { useState } from 'react';


const AnnouncementBar = () => {
  return (
    <div className='w-full bg-black py-2'>
        <div className='container mx-auto flex items-center justify-center px-8'>
            <span className='text-center text-sm font-medium tracking-wide text-white'>
              FREE SHIPPING ON ORDERS OVER $15.00 ⚆ FREE RETURNS ON ALL ORDERS
            </span>
        </div>
    </div>
  )
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledUp= prevScrollY < prevScrollY;
      if (scrolledUp) {
        setIsMenuOpen(true);
      }else if(currentScrollY > 100){
        setIsMenuOpen(false);
      }
    }
    setPrevScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[prevScrollY])


  return (
    <header className='w-full bg-white sticky top-0 z-50'>
      <div className='w-full transform transition-transform duration-300 ease-in-out'>
        <AnnouncementBar /> 
      </div>
    </header>
  )
}

export default Header;



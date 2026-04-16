import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk, UserButton } from '@clerk/clerk-react';
import { useAppContext } from '../context/AppContext';

// Custom Book Icon
const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Experience', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const location = useLocation();
  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  // Handle scroll with requestAnimationFrame for smoother performance
  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => setIsScrolled(window.scrollY > 10));
    };

    if (location.pathname !== '/') {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? 'bg-white/95 shadow-md text-gray-700 backdrop-blur-md py-3 md:py-4'
          : 'bg-transparent py-4 md:py-6 text-white'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <div
          className={`rounded-full p-1 transition-all duration-500 ${
            isScrolled ? 'bg-white shadow-md' : 'bg-black/40'
          }`}
        >
          <img src={assets.logo2} alt="Roomy Logo" className="h-4 w-auto" />
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col items-center gap-0.5 text-sm font-medium transition-all duration-300 ${
              location.pathname === link.path
                ? 'text-primary'
                : isScrolled
                ? 'text-gray-700 hover:text-primary'
                : 'text-white hover:text-gray-200'
            }`}
          >
            {link.name}
            <span
              className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-primary'
                  : isScrolled
                  ? 'bg-gray-700'
                  : 'bg-white'
              }`}
            />
          </Link>
        ))}

        {user && (
          <button
            className={`border px-5 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 ${
              isScrolled
                ? 'text-black border-black hover:bg-gray-100'
                : 'text-white border-white hover:bg-white hover:text-black'
            }`}
            onClick={() => (isOwner ? navigate('/owner') : setShowHotelReg(true))}
          >
            {isOwner ? 'Dashboard' : 'List your hotel'}
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="Search"
          className="h-7 transition-all duration-500 cursor-pointer hover:scale-110"
        />
        {user ? (
          <UserButton afterSignOutUrl="/" userProfileMode="navigation">
            <UserButton.MenuItems>
              <UserButton.Action
                label="My bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`px-8 py-2 rounded-full transition-all duration-500 shadow-sm ${
              isScrolled
                ? 'text-white bg-black hover:bg-gray-800'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton afterSignOutUrl="/" userProfileMode="navigation">
            <UserButton.MenuItems>
              <UserButton.Action
                label="My bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img
          src={assets.menuIcon}
          alt="Open menu"
          aria-label="Open mobile menu"
          className="h-6 transition-all duration-300 cursor-pointer hover:scale-110"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-transform duration-500 ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <button
          className="absolute top-4 right-4 p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={assets.closeIcon}
            alt="Close menu"
            className="h-6 hover:scale-110 transition-all"
          />
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={`text-lg transition-colors duration-300 ${
              location.pathname === link.path ? 'text-primary font-semibold' : ''
            }`}
          >
            {link.name}
          </Link>
        ))}

        {user && (
          <button
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all border-black hover:bg-gray-100"
            onClick={() => (isOwner ? navigate('/owner') : setShowHotelReg(true))}
          >
            {isOwner ? 'Dashboard' : 'List your hotel'}
          </button>
        )}

        {!user && (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-300 hover:bg-gray-800"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
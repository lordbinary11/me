'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Handle hash scrolling when page loads or hash changes
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait a bit for the page to render
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const headerOffset = 100; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 100);
      }
    };

    // Scroll on mount and when pathname changes
    handleHashScroll();

    // Also listen for hash changes
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, [pathname]);

  return null;
}


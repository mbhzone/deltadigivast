'use client';

import Image from 'next/image';
import React from 'react';

export default function BrandLogoSection() {
  const logoData = [
    { logo: '/image/landing/perfect.jpg', alt: 'Perfect Living' },
    { logo: '/image/landing/nb.jpg', alt: 'NB' },
    { logo: '/image/landing/rifi.jpg', alt: 'Rifi' },
    { logo: '/image/landing/rajshai florist.jpg', alt: 'Rajshahi Florist' },
    { logo: '/image/landing/toha.jpg', alt: 'Toha' },
    { logo: '/image/landing/chowkat.jpg', alt: 'Chowkat' },
    { logo: '/image/landing/Probity.jpg', alt: 'Probity' },
    { logo: '/image/landing/alpha edu.jpg', alt: 'Alpha Edu' },
    { logo: '/image/landing/am bazar.jpg', alt: 'Am Bazar' },
    { logo: '/image/landing/anfa.jpg', alt: 'Anfa' },
    { logo: '/image/landing/enomic.jpg', alt: 'Enomic' },
    { logo: '/image/landing/mim.jpg', alt: 'Mim' },
    { logo: '/image/landing/nefrone.jpg', alt: 'Nefrone' },
    { logo: '/image/landing/one code.jpg', alt: 'One Code' },
    { logo: '/image/landing/rajshai cooling.jpg', alt: 'Rajshahi Cooling' },
    { logo: '/image/landing/style shoes.jpg', alt: 'Style Shoes' },
    { logo: '/image/landing/tori.jpg', alt: 'Tori' },
  ];

  return (
    <section className=" transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Trusted by Rajshahi&apos;s Leading Brands
          </h2>
          <p className="mt-2 text-sm md:text-xl text-gray-500 dark:text-gray-300">
            Powering success for brands across various industries
          </p>
        </div>

        {/* Logo Slider - Right to Left */}
        <div className="overflow-hidden relative">
          <style jsx>{`
            @keyframes scrollRTL {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-scroll-rtl {
              animation: scrollRTL 30s linear infinite;
              width: fit-content;
              display: flex;
            }
          `}</style>

          <div className="animate-scroll-rtl hover:[animation-play-state:paused]">
            {[...logoData, ...logoData].map((item, i) => (
              <div key={i} className="relative h-14 w-32 flex-shrink-0 mx-4">
                <Image
                  src={item.logo}
                  alt={item.alt}
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-110"
                  sizes="128px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

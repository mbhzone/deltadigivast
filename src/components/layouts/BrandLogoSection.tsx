'use client';

import Image from 'next/image';
import React from 'react';

export default function BrandLogoSection() {
  const logoData = [
    { logo: '/image/landing/1.jpg', alt: 'RANGS' },
    { logo: '/image/landing/2.jpg', alt: 'Claraz' },
    { logo: '/image/landing/3.jpeg', alt: 'Ojler SAP' },
    { logo: '/image/landing/4.png', alt: 'Othoba' },
    { logo: '/image/landing/5.png', alt: 'SME 1' },
    { logo: '/image/landing/6.png', alt: 'SME 3' },
    { logo: '/image/landing/7.png', alt: 'SME 5' },
    { logo: '/image/landing/8.png', alt: 'SME 6' },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Trusted by Rajshahi's Leading Brands
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
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

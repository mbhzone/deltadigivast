import BrandLogoSection from '@/components/layouts/BrandLogoSection';
import { Hero } from '@/components/layouts/hero';
import HeroVideo from '@/components/layouts/HeroVideo';
import React from 'react';

export default function HomePage() {
  return (
    <div>
      <Hero
        badge="Trusted by 200+ Brands Worldwide"
        heading="Build Your Agency Website"
        description="We create modern, scalable and beautiful web applications."
        image={{
          src: '/image/banner-image.jpeg',
          alt: 'Agency Hero Image',
        }}
      />
      <BrandLogoSection></BrandLogoSection>
      <HeroVideo></HeroVideo>
    </div>
  );
}

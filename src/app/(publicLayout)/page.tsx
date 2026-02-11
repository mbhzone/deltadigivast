import { Hero1 } from '@/components/hero1';
import React from 'react';

export default function HomePage() {
  return (
    <div>
      <Hero1
        heading="Build Your Agency Website"
        description="We create modern, scalable and beautiful web applications."
        image={{
          src: '/image/banner-image.jpeg',
          alt: 'Agency Hero Image',
        }}
      />
    </div>
  );
}

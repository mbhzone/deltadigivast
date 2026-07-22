import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  copyright?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const Footer = ({
  logo = {
    url: '/',
    src: '/image/logo.png',
    alt: 'logo',
    title: 'Delta Digivast',
  },
  socialLinks = [
    { icon: <FaInstagram className="size-5" />, href: 'https://www.instagram.com/deltadigivast', label: 'Instagram' },
    { icon: <FaFacebook className="size-5" />, href: 'https://www.facebook.com/deltadigivast', label: 'Facebook' },
    { icon: <FaTwitter className="size-5" />, href: '#', label: 'Twitter' },
    { icon: <FaLinkedin className="size-5" />, href: '#', label: 'LinkedIn' },
  ],
  legalLinks = [
    { name: 'Login', href: '/login' },
    { name: 'Privacy Policy', href: '#' },
  ],
  copyright = '© 2026 Delta Digivast. All rights reserved.',
  className,
}: FooterProps) => {
  // Footer sections based on Navbar
  const sections = [
    {
      title: 'Main Menu',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Blog', href: '/blog' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Video Production', href: '/services/videography' },
        { name: 'Graphics Design', href: '/services/photography' },
        { name: 'Digital Marketing', href: '/services/digital-marketing' },
        {
          name: 'Web Design & Development',
          href: '/services/web-design-development',
        },
        { name: 'VSMM', href: '/services/vsmm' },
      ],
    },
  ];

  return (
    <section className={cn(' bg-[#f4ffe8] dark:bg-[#020817]', className)}>
      {/* Premium Bottom Decorative Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#6efd0b]/30 to-transparent"></div>
      <div className="container mx-auto px-2 md:px-0 md:mt-7 pt-5">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          {/* Logo & description */}
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={logo.url}>
                <Image
                  src={logo.src}
                  width={24}
                  height={24}
                  className="max-h-6"
                  alt={logo.alt}
                />
              </Link>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              Professional services and solutions for your business growth.
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div className="grid w-full gap-6 md:grid-cols-2 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Footer };

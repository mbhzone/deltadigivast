'use client';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { ModeToggle } from './ModeToggle';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const features = [
    {
      title: 'Videography',
      description:
        'Professional video production services for commercials, events, corporate shoots, and creative storytelling.',
      href: '/services/videography',
    },
    {
      title: 'Photography',
      description:
        'High-quality photography services including product, event, corporate, and lifestyle shoots.',
      href: '/services/photography',
    },
    {
      title: 'Digital Marketing',
      description:
        'Result-driven digital marketing strategies including SEO, social media marketing, and paid advertising.',
      href: '/services/digital-marketing',
    },
    {
      title: 'Web Design & Development',
      description:
        'Modern, responsive, and scalable website design and development tailored to your business needs.',
      href: '/services/web-design-development',
    },
    {
      title: 'VSMM',
      description:
        'Video & Social Media Marketing services to grow your brand visibility and engagement online.',
      href: '/services/vsmm',
    },
  ];

  return (
    <section className={cn('py-4 bg-background border-b', className)}>
      <div className="container mx-auto px-2 md:px-0">
        <nav className="flex items-center justify-between">
          {/* ================= Logo ================= */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/image/logo.png"
              width={24}
              height={24}
              className="max-h-6"
              alt="Delta Digivast"
            />
            <span className="text-lg font-semibold tracking-tight">
              Delta Digivast
            </span>
          </Link>

          {/* ================= Desktop Menu ================= */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/portfolio"
                  className={navigationMenuTriggerStyle()}
                >
                  Portfolio
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/blog"
                  className={navigationMenuTriggerStyle()}
                >
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about-us"
                  className={navigationMenuTriggerStyle()}
                >
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map(feature => (
                      <NavigationMenuLink
                        key={feature.title}
                        href={feature.href}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <p className="mb-1 font-semibold">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* ================= Right Side ================= */}
          <div className="flex items-center gap-3">
            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-4">
              <ModeToggle />
              <Button
                className="
    bg-gradient-to-r
    from-[#6efd0b] via-[#8bff3a] to-[#4fd100]
    text-black
    dark:from-[#4fd100] dark:via-[#6efd0b] dark:to-[#a3ff5f]
    dark:text-black
    hover:opacity-90
    transition
  "
              >
                Free Consultation
              </Button>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <ModeToggle />

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MenuIcon className="h-4 w-4" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="top" className="max-h-screen overflow-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" className="flex items-center gap-2">
                        <Image
                          src="/image/logo.png"
                          width={24}
                          height={24}
                          className="max-h-6"
                          alt="Delta Digivast"
                        />
                        <span className="text-lg font-semibold">
                          Delta Digivast
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col p-4">
                    <Accordion type="single" collapsible className="mt-4 mb-2">
                      <AccordionItem value="features" className="border-none">
                        <AccordionTrigger className="text-base hover:no-underline">
                          Features
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid md:grid-cols-2">
                            {features.map(feature => (
                              <Link
                                key={feature.title}
                                href={feature.href}
                                className="rounded-md p-3 transition-colors hover:bg-muted/70"
                              >
                                <p className="mb-1 font-semibold">
                                  {feature.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {feature.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex flex-col gap-6 mt-4">
                      <Link href="#" className="font-medium">
                        Templates
                      </Link>
                      <Link href="#" className="font-medium">
                        Blog
                      </Link>
                      <Link href="#" className="font-medium">
                        Pricing
                      </Link>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                      <Button variant="outline">Sign in</Button>
                      <Button>Start for free</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };

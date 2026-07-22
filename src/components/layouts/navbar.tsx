/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { LayoutDashboard, LogOut, MenuIcon, Moon, Sun } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

import { clearAuthData, getStoredUser } from '@/utils/auth.utils';
import { useEffect, useState } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setUser(getStoredUser());
    setMounted(true);
  }, []);
  const features = [
    {
      title: 'Video Production',
      description:
        'Professional video production services for commercials, events, corporate shoots, and creative storytelling.',
      href: '/services/videography',
    },
    {
      title: 'Graphics Design',
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
    // {
    //   title: 'VSMM',
    //   description:
    //     'Video & Social Media Marketing services to grow your brand visibility and engagement online.',
    //   href: '/services/vsmm',
    // },
  ];
  const router = useRouter();

  const handleLogout = () => {
    clearAuthData();
    router.push('/login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <section
      className={cn(
        'py-4 bg-[#F6FFF0] dark:bg-gray-950 border-b sticky top-0 z-50',
        className,
      )}
    >
      <div className="container mx-auto px-2 md:px-0">
        <nav className="flex items-center justify-between">
          {/* mobile menu */}
          <div className=" sm:hidden block">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  onClick={() => setSheetOpen(true)}
                  variant="outline"
                  size="icon"
                >
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
                  {/* Main Menu */}
                  <div className="flex flex-col gap-5 mt-6 text-base font-medium">
                    <Link
                      onClick={() => setSheetOpen(false)}
                      href="/"
                      className="hover:text-primary"
                    >
                      Home
                    </Link>

                    <Link
                      onClick={() => setSheetOpen(false)}
                      href="/portfolio"
                      className="hover:text-primary"
                    >
                      Portfolio
                    </Link>

                    <Link
                      onClick={() => setSheetOpen(false)}
                      href="/blog"
                      className="hover:text-primary"
                    >
                      Blog
                    </Link>

                    <Link
                      onClick={() => setSheetOpen(false)}
                      href="/about-us"
                      className="hover:text-primary"
                    >
                      About Us
                    </Link>

                    <Link
                      onClick={() => setSheetOpen(false)}
                      href="/contact"
                      className="hover:text-primary"
                    >
                      Contact
                    </Link>
                  </div>

                  {/* Services Accordion */}
                  <Accordion type="single" collapsible className="mt-6">
                    <AccordionItem value="services" className="border-none">
                      <AccordionTrigger className="text-base hover:no-underline">
                        Services
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="flex flex-col gap-3 mt-2">
                          {features.map(feature => (
                            <Link
                              onClick={() => setSheetOpen(false)}
                              key={feature.title}
                              href={feature.href}
                              className="rounded-md p-2 hover:bg-muted/70"
                            >
                              <p className="font-semibold">{feature.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
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
                  href="/services"
                  className={navigationMenuTriggerStyle()}
                >
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                </NavigationMenuLink>

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
                <NavigationMenuLink
                  href="/blog"
                  className={navigationMenuTriggerStyle()}
                >
                  Blog
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* ================= Right Side ================= */}
          <div className="flex items-center gap-3">
            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                                   text-gray-600 dark:text-gray-300 transition-colors
                                   hidden sm:block"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              {/* <Button
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
              </Button> */}

              {mounted && user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 focus:outline-none group">
                      {/* Avatar with Gradient */}
                      <div className="relative">
                        <div
                          className="w-9 h-9 rounded-full overflow-hidden 
                bg-gradient-to-br from-[#6efd0b] via-[#8bff3a] to-[#4fd100]
                flex items-center justify-center
                text-white font-semibold text-sm
                shadow-md"
                        >
                          {user?.photoUrl ? (
                            <Image
                              src={user.photoUrl}
                              width={36}
                              height={36}
                              alt={user?.name || 'User'}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="uppercase">
                              {user?.name?.charAt(0) || 'U'}
                            </span>
                          )}
                        </div>
                        {/* Online Status Indicator */}
                        <span
                          className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white 
                         dark:border-gray-900 rounded-full"
                        ></span>
                      </div>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-56 mt-2 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl"
                  >
                    {/* Menu Items */}

                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 
                   hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer
                   transition-colors duration-200 group"
                      >
                        <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
                          <LayoutDashboard
                            size={16}
                            className="text-purple-600 dark:text-purple-400"
                          />
                        </div>
                        <span className="flex-1">Dashboard</span>
                        <span className="text-xs text-gray-400">⌘D</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 
                 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer
                 transition-colors duration-200 group"
                    >
                      <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
                        <LogOut
                          size={16}
                          className="text-red-600 dark:text-red-400"
                        />
                      </div>
                      <span className="flex-1">Logout</span>
                      <span className="text-xs text-gray-400">⌘Q</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                                   text-gray-600 dark:text-gray-300 transition-colors
                                   sm:hidden block"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <div className=" sm:hidden block">
                {mounted && user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 focus:outline-none group">
                        {/* Avatar with Gradient */}
                        <div className="relative">
                          <div
                            className="w-9 h-9 rounded-full overflow-hidden 
                bg-gradient-to-br from-[#6efd0b] via-[#8bff3a] to-[#4fd100]
                flex items-center justify-center
                text-white font-semibold text-sm
                shadow-md"
                          >
                            {user?.photoUrl ? (
                              <Image
                                src={user.photoUrl}
                                width={36}
                                height={36}
                                alt={user?.name || 'User'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="uppercase">
                                {user?.name?.charAt(0) || 'U'}
                              </span>
                            )}
                          </div>
                          {/* Online Status Indicator */}
                          <span
                            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white 
                         dark:border-gray-900 rounded-full"
                          ></span>
                        </div>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-56 mt-2 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl"
                    >
                      {/* Menu Items */}

                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 
                   hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer
                   transition-colors duration-200 group"
                        >
                          <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
                            <LayoutDashboard
                              size={16}
                              className="text-purple-600 dark:text-purple-400"
                            />
                          </div>
                          <span className="flex-1">Dashboard</span>
                          <span className="text-xs text-gray-400">⌘D</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 
                 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer
                 transition-colors duration-200 group"
                      >
                        <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
                          <LogOut
                            size={16}
                            className="text-red-600 dark:text-red-400"
                          />
                        </div>
                        <span className="flex-1">Logout</span>
                        <span className="text-xs text-gray-400">⌘Q</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };

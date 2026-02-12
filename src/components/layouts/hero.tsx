import { ArrowRight, ArrowUpRight, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HeroProps {
  badge?: string;
  heading?: string;
  description?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
}

const Hero = ({
  badge,
  heading,
  description,
  stats = [
    { value: '200+', label: 'Projects Delivered' },
    { value: '50+', label: 'Happy Clients' },
    { value: '8+', label: 'Years Experience' },
  ],
  buttons = {
    primary: {
      text: 'Start Your Project',
      url: '/contact',
    },
    secondary: {
      text: 'See Our Work',
      url: '/portfolio',
    },
  },
  image = {
    src: '/image/banner-image.jpeg',
    alt: 'Agency team working on digital projects - web design and development showcase',
  },
  className,
}: HeroProps) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20',
        'pb-5 md:py-16 lg:py-24',
        className,
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute right-0 top-0 h-72 w-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-2 sm:px-0">
        <div className="grid items-center md:gap-8 lg:grid-cols-2 lg:gap-16 grid-rows-2 lg:grid-rows-1">
          {/* Right Image (Mobile first) */}
          <div className="relative  order-1 lg:order-2">
            <div className="relative rounded-md overflow-hidden shadow-2xl">
              <img
                src={image.src}
                alt={image.alt}
                className="h-[400px] sm:h-[500px] lg:h-[545px]  w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
            </div>

            {/* Trust badge - Mobile only */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:hidden">
              <Users className="size-4" />
              <span>Join 200+ growing businesses</span>
            </div>
          </div>

          {/* Left Content */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left order-2 lg:order-1">
            {/* Badge with animation */}
            {badge && (
              <Badge
                variant="outline"
                className="animate-in fade-in slide-in-from-top-5 duration-500 border-primary/20 bg-primary/5 px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
              >
                <Sparkles className="mr-2 size-4 text-primary" />
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}

            {/* Main Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {heading}
              <span className="block mt-2 bg-gradient-to-r from-lime-100 to-[#4fd100] bg-clip-text text-transparent">
                Your Success Partner
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4 lg:justify-start">
              {buttons.primary && (
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r
    from-[#6efd0b] via-[#8bff3a] to-[#4fd100] text-black dark:from-[#4fd100] dark:via-[#6efd0b] dark:to-[#a3ff5f] dark:text-black hover:opacity-90 transition transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <a href={buttons.primary.url}>
                    <span className="relative z-10">
                      {buttons.primary.text}
                    </span>
                    <ArrowRight className="relative z-10 ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-lime-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              )}
              {buttons.secondary && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto group border-2 hover:bg-secondary/80 transition-all duration-300"
                >
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              )}
            </div>

            {/* Stats Section */}
            {stats && (
              <div className="mt-8 grid w-full grid-cols-3 gap-4 border-t pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-xl font-bold sm:text-2xl lg:text-3xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };

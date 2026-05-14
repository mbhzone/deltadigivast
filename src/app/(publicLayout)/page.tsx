import BrandLogoSection from '@/components/layouts/BrandLogoSection';
import ClientReview from '@/components/layouts/ClientReview';
import { Contact2 } from '@/components/layouts/contact2';
import { Hero } from '@/components/layouts/hero';
import HeroVideo from '@/components/layouts/HeroVideo';
import { ServiceSection } from '@/components/layouts/ServiceSection';
import ProjectCardHome from '@/components/module/comon/ProjectCardHome';
import { getHeroData } from '@/service/hero.service';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string | null;
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/portfolio`,
    {
      cache: 'no-store',
    },
  );
  const data = await res.json();

  return data.data;
}

export default async function HomePage() {
  const data = await getHeroData();
  const projects = await getProjects();
  const hero = data?.data;
  return (
    <div className="bg-[#FAFFF7] dark:bg-gray-950 space-y-10 md:space-y-20">
      <Hero
        badge="Trusted by 50+ Brands In Rajshahi"
        heading={hero?.title}
        // description={hero?.description}
        image={{
          src: hero?.imageUrl,
          alt: hero?.heading,
        }}
      />
      <BrandLogoSection></BrandLogoSection>
      <HeroVideo></HeroVideo>
      <ServiceSection></ServiceSection>
      <ClientReview></ClientReview>
      {/* Project Grid + Filter */}
      <ProjectCardHome projects={projects} />
      <Contact2></Contact2>
    </div>
  );
}

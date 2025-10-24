import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Mi Sueño",
    link: "https://example.com",
    thumbnail: "/images/portfolio/mi-sueno-carousel.png",
  },
  // Second row starts here: website images
  {
    title: "Barbershop Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/barbershop-website.png",
  },
  {
    title: "Green Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/green-website.png",
  },
  {
    title: "InAction Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/inaction-website-hero.png",
  },
  {
    title: "Smart Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/smart-website.png",
  },
  {
    title: "Paisanos Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/paisanos-website.png",
  },
  {
    title: "Solar Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/solar-website.png",
  },
  {
    title: "Yummy Website",
    link: "https://example.com",
    thumbnail: "/images/portfolio/yummy-website.png",
  },
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Mi Sueño",
    link: "https://example.com",
    thumbnail: "/images/portfolio/mi-sueno-carousel.png",
  },
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Mi Sueño",
    link: "https://example.com",
    thumbnail: "/images/portfolio/mi-sueno-carousel.png",
  },
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Mi Sueño",
    link: "https://example.com",
    thumbnail: "/images/portfolio/mi-sueno-carousel.png",
  },
  {
    title: "Agua App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/agua-app-carousel.png",
  },
  {
    title: "Booker App",
    link: "https://example.com",
    thumbnail: "/images/portfolio/booker-app-carousel.png",
  },
  {
    title: "Tacos Slopes",
    link: "https://example.com",
    thumbnail: "/images/portfolio/tacos-slopes-carousel.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <HeroParallax products={products} />
      
      {/* Placeholder Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          {/* Empty placeholder section */}
        </div>
      </section>
    </div>
  );
}

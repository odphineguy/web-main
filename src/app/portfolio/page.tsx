import { AppleCardsCarousel, AppleCardItem } from "@/components/AppleCardsCarousel";

const items: AppleCardItem[] = [
  {
    id: "1",
    title: "Agua App",
    description: "Hydration and heath tracker",
    imageSrc: "/images/portfolio/agua-app-carousel.png",
    imageAlt: "Agua app screenshot",
  },
  {
    id: "2",
    title: "Booker App",
    description: "Haircut booking app",
    imageSrc: "/images/portfolio/booker-app-carousel.png",
    imageAlt: "Booker app screenshot",
  },
  {
    id: "3",
    title: "Tacos and Slopes",
    description: "Restaurant ordering app",
    imageSrc: "/images/portfolio/tacos-slopes-carousel.png",
    imageAlt: "Tacos and Slopes app screenshot",
  },
  {
    id: "4",
    title: "Mi Sueno App",
    description: "A dream interpretation app",
    imageSrc: "/images/portfolio/mi-sueno-carousel.png",
    imageAlt: "Mi Sueno app screenshot",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="px-6 pt-8 md:pt-12 pb-16 sm:px-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-12 text-center">
          The <span className="text-orange-500">Portfolio</span>
        </h1>
        <AppleCardsCarousel items={items} />
      </div>
      
      {/* Placeholder Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            More exciting content will be added here soon.
          </p>
        </div>
      </section>
    </div>
  );
}



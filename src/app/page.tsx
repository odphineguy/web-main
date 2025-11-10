import Link from "next/link";
import { Button } from "@/components/ui/button";
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
      
      {/* Content Section: Image Left, Text Right */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="min-h-[320px] rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/20 flex items-center justify-center">
            <div className="text-center space-y-4 px-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-orange-500/30 bg-white/80 dark:bg-neutral-900/80">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
                  Image
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-xs mx-auto leading-relaxed">
                A frustrated business owner staring at their outdated phone website.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white dark:bg-neutral-950 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              Section Title
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Tired of feeling invisible online?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Most small business owners say the same things:
            </p>
            <ul className="space-y-3 text-lg text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                <span>&ldquo;My website looks basic.&rdquo;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                <span>&ldquo;No one clicks my ads.&rdquo;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                <span>&ldquo;I don&rsquo;t even know where to start with AI or automation.&rdquo;</span>
              </li>
            </ul>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              And every day it stays like that you lose trust, lose clients, and lose opportunities — especially when
              people check your business online first.
            </p>
            <div className="h-0.5 w-24 bg-gradient-to-r from-orange-500 to-orange-600" />
          </div>
        </div>
      </section>

      {/* Content Section: Text Left, Image Right */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-gray-50 dark:bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              Bilingual Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              We build custom bilingual digital tools that make you look legit.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Abe Media gives you the clean, modern, bilingual (English / Español) digital presence that makes people say:
              “wow — this business looks professional.”
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Satisfaction guaranteed.
            </p>
            <div className="h-0.5 w-24 bg-gradient-to-r from-orange-500 to-orange-600" />
          </div>
          <div className="order-1 lg:order-2 min-h-[320px] rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/20 flex items-center justify-center">
            <div className="text-center space-y-4 px-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-orange-500/30 bg-white/80 dark:bg-neutral-900/80">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
                  Image
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-xs mx-auto leading-relaxed">
                Friendly portrait of you: clean headshot, simple background, approachable vibe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white dark:bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              FAQs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Everything you want to know before we get started.
            </h2>
          </div>
          <div className="space-y-8">
            <div className="rounded-3xl border border-orange-500/20 bg-white dark:bg-neutral-900/60 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Do I need to know tech?</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                No. We make it simple — we guide you the whole way.
              </p>
            </div>
            <div className="rounded-3xl border border-orange-500/20 bg-white dark:bg-neutral-900/60 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Can we start small?</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Yes. We customize everything — we can start with just a website or just ads.
              </p>
            </div>
            <div className="rounded-3xl border border-orange-500/20 bg-white dark:bg-neutral-900/60 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What if I’m not happy?</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Satisfaction guaranteed — if it’s not right, we fix it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Start this month and get a free 30-minute strategy call.
          </p>
          <Link href="/contact" className="inline-block">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base md:text-lg">
              Let&apos;s Talk
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";

import { useLocale, useTranslations } from 'next-intl';

export default function TopNavbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = (mounted ? resolvedTheme : undefined) === "dark";

  // Check if a link is active
  const isActive = (href: string) => {
    const localePath = pathname.replace(/^\/(?:en|es)(?=\/|$)/, "") || "/";
    if (href === "/") return localePath === "/";
    return localePath.startsWith(href);
  };
  const localizedHref = (href: string) => `/${locale}${href === "/" ? "" : href}`;
  const { scrollY } = useScroll();

  // Theme animation hook
  const { ref: themeRef, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 750,
    isDarkMode: isDark,
    onDarkModeChange: (isDark) => {
      setTheme(isDark ? "dark" : "light");
    }
  });

  // Height/padding/max-width stay fixed. They used to shrink on scroll
  // (88->56, 24->12, 1280->1000), and the narrower container squeezed the nav
  // until "Case Studies", "How It Works" and "About Abe" each wrapped to two
  // lines. Only the bottom border still reacts to scroll - it costs no layout.
  const borderColor = useTransform(scrollY, [0, 200], ["rgba(255,255,255,0)", "rgba(255,255,255,0.12)"]);


  return (
    <motion.header
      style={{ borderBottomColor: borderColor, borderBottomWidth: 1, borderBottomStyle: "solid" }}
      className="sticky top-0 z-50 h-[88px] w-full backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
        {/* shrink-0 is load-bearing: without it the logo is a shrinkable flex child
            and the nav row eats it rather than overflowing the page. That hid the
            overflow bug - at 1024px the logo measured 7px wide in EN and 0px (i.e.
            invisible) in ES, and it never reached its full 192px in ES at any width. */}
        <div className="flex shrink-0 items-center gap-3">
          <Link href={localizedHref("/")} className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/portfolio/abemedia.logo.nobg.png"
              alt="Abe Media"
              width={192}
              height={38}
              className="block dark:hidden w-32 sm:w-40 md:w-44 lg:w-48 h-auto"
              priority
            />
            <Image
              src="/images/portfolio/abemedia.logo.nobg.png"
              alt="Abe Media"
              width={192}
              height={38}
              className="hidden dark:block w-32 sm:w-40 md:w-44 lg:w-48 h-auto"
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        {/* The row is whitespace-nowrap next to a shrink-0 logo inside a max-w-1280
            container, so it either fits or overflows the page - it cannot wrap or
            steal space. Measured requirement with the logo at its full 192px:
            gap-4 -> EN 1209px / ES 1293px;  gap-2.5 -> EN 1155px / ES 1239px.
            Spanish is the binding constraint (~85px longer) and 1293px does not fit
            the 1280px container, which is why the gap stays at 2.5 at every width
            instead of widening. The row therefore switches on at xl: (1280px), not
            lg: - at 1024px Spanish needs ~1239px and cannot fit even with smaller
            type and a smaller logo (~1101px). Below xl: the hamburger handles it. */}
        <nav className="hidden xl:flex items-center gap-2.5 text-base ml-2 whitespace-nowrap">
          <Link href={localizedHref("/services")} className={`font-bold transition-colors ${isActive("/services") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>{t('services')}</Link>
          <Link href="/en/industries" hrefLang="en" className={`font-bold transition-colors ${isActive("/industries") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>{t('industries')}</Link>
          <Link href="/en/portfolio" hrefLang="en" className={`font-bold transition-colors ${isActive("/portfolio") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>{t('caseStudies')}</Link>
          <Link href="/en/systems-we-build" hrefLang="en" className={`font-bold transition-colors ${isActive("/systems-we-build") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>{t('builds')}</Link>
          <Link href={localizedHref("/how-it-works")} className={`font-bold transition-colors ${isActive("/how-it-works") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>{t('howItWorks')}</Link>
          <Link href={localizedHref("/pricing")} className={`font-bold transition-colors ${isActive("/pricing") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>{t('pricing')}</Link>
          <Link href="/en/about/abe-perez" hrefLang="en" className={`font-bold transition-colors ${isActive("/about") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>{t('about')}</Link>
          {/* No "Contact" text link: it pointed at the same /contact route as the
              Get Started button below, so it cost a slot and a gap for a duplicate
              destination. Get Started is the single entry point to that page. */}
          <Link
            href={localizedHref("/contact")}
            className="group ml-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
          >
            {t('getStarted')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            ref={themeRef}
            onClick={toggleSwitchTheme}
            aria-label="Toggle theme"
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border opacity-80 hover:opacity-100"
          >
            {mounted && (isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />)}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            ref={themeRef}
            onClick={toggleSwitchTheme}
            aria-label="Toggle theme"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border opacity-80 hover:opacity-100"
          >
            {mounted && (isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />)}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border opacity-80 hover:opacity-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="xl:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 dark:supports-[backdrop-filter]:bg-neutral-900/95 border-t border-border"
        >
          <nav className="flex flex-col py-4 px-6 space-y-3">
            <Link href={localizedHref("/services")} className={`font-bold py-2 transition-colors ${isActive("/services") ? "text-orange-500" : "text-foreground opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>{t('services')}</Link>
            <Link href="/en/industries" hrefLang="en" className={`font-bold py-2 transition-colors ${isActive("/industries") ? "text-orange-500" : "text-foreground opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>{t('industries')}</Link>
            <Link href="/en/portfolio" hrefLang="en" className={`font-bold py-2 transition-colors ${isActive("/portfolio") ? "text-orange-500" : "text-foreground opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>{t('caseStudies')}</Link>
            <Link href="/en/systems-we-build" hrefLang="en" className={`font-bold py-2 transition-colors ${isActive("/systems-we-build") ? "text-orange-500" : "text-foreground opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>{t('builds')}</Link>
            <Link href={localizedHref("/how-it-works")} className={`font-bold py-2 transition-colors ${isActive("/how-it-works") ? "text-orange-500" : "text-foreground opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>{t('howItWorks')}</Link>
            <Link href={localizedHref("/pricing")} className={`font-bold py-2 transition-colors ${isActive("/pricing") ? "text-orange-500" : "text-foreground opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>{t('pricing')}</Link>
            <Link href="/en/about/abe-perez" hrefLang="en" className={`font-bold py-2 transition-colors ${isActive("/about") ? "text-orange-500" : "text-foreground opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>{t('about')}</Link>
            <Link
              href={localizedHref("/contact")}
              className="group mt-2 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-orange-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('getStarted')}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}

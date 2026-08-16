"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function TopNavbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const localePath = pathname.replace(/^\/(?:en|es)(?=\/|$)/, "") || "/";
  const isHome = localePath === "/";
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroPassed, setHeroPassed] = useState(!isHome);

  useEffect(() => {
    setMounted(true);
    if (!isHome) {
      setHeroPassed(true);
      return;
    }

    const hero = document.querySelector<HTMLElement>("[data-home-hero]");
    if (!hero) {
      setHeroPassed(true);
      return;
    }

    const updateNav = () => {
      const next = hero.getBoundingClientRect().bottom <= 72;
      setHeroPassed((current) => (current === next ? current : next));
    };
    const sentinel = hero.querySelector<HTMLElement>("[data-home-hero-end]") ?? hero;
    const observer = new IntersectionObserver(updateNav, { threshold: 0 });
    observer.observe(sentinel);
    window.addEventListener("scroll", updateNav, { passive: true });
    updateNav();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateNav);
    };
  }, [isHome]);

  const isDark = (mounted ? resolvedTheme : undefined) === "dark";
  const navVisible = !isHome || heroPassed;
  const localizedHref = (href: string) => `/${locale}${href === "/" ? "" : href}`;
  const isActive = (href: string) => href === "/" ? localePath === "/" : localePath.startsWith(href);

  const { ref: themeRef, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 750,
    isDarkMode: isDark,
    onDarkModeChange: (nextIsDark) => setTheme(nextIsDark ? "dark" : "light"),
  });

  const closeMenu = () => setMobileMenuOpen(false);
  const linkClass = (href: string) =>
    `font-bold transition-colors ${isActive(href) ? "text-orange-500" : "text-[#111827]/75 hover:text-[#111827]"}`;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4">
      <AnimatePresence initial={false}>
        {navVisible ? (
          <motion.header
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative mx-auto min-h-[68px] max-w-[1280px] rounded-full border border-black/10 bg-[#f7f5ef]/95 text-[#111827] shadow-[0_18px_55px_rgba(17,24,39,0.14)] backdrop-blur-xl"
          >
            <div className="flex min-h-[68px] items-center justify-between gap-5 px-4 pl-6">
              <Link href={localizedHref("/")} className="shrink-0 transition-opacity hover:opacity-75">
                <Image
                  src="/images/home/abemedia-new-darkmode.png"
                  alt="Abe Media"
                  width={2172}
                  height={724}
                  className="h-auto w-32 sm:w-40 lg:w-44"
                  priority
                />
              </Link>

              <nav className="hidden items-center gap-2.5 whitespace-nowrap text-sm xl:flex">
                <Link href={localizedHref("/services")} className={linkClass("/services")}>{t("services")}</Link>
                <Link href="/en/industries" hrefLang="en" className={linkClass("/industries")}>{t("industries")}</Link>
                <Link href="/en/portfolio" hrefLang="en" className={linkClass("/portfolio")}>{t("caseStudies")}</Link>
                <Link href="/en/systems-we-build" hrefLang="en" className={linkClass("/systems-we-build")}>{t("builds")}</Link>
                <Link href={localizedHref("/how-it-works")} className={linkClass("/how-it-works")}>{t("howItWorks")}</Link>
                <Link href={localizedHref("/pricing")} className={linkClass("/pricing")}>{t("pricing")}</Link>
                <Link href="/en/about/abe-perez" hrefLang="en" className={linkClass("/about")}>{t("about")}</Link>
                <Link
                  href={localizedHref("/contact")}
                  className="group ml-2 inline-flex items-center gap-2 rounded-full bg-orange-500 py-2.5 pr-2.5 pl-5 font-semibold text-white transition-colors hover:bg-[#111827]"
                >
                  {t("getStarted")}
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-white/40">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
                <button
                  ref={themeRef}
                  onClick={toggleSwitchTheme}
                  aria-label="Toggle theme"
                  className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-colors hover:border-orange-500"
                >
                  {mounted && (isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />)}
                </button>
              </nav>

              <div className="flex items-center gap-2 xl:hidden">
                <button
                  ref={themeRef}
                  onClick={toggleSwitchTheme}
                  aria-label="Toggle theme"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
                >
                  {mounted && (isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />)}
                </button>
                <button
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {mobileMenuOpen ? (
                <motion.nav
                  initial={{ opacity: 0, gridTemplateRows: "0fr" }}
                  animate={{ opacity: 1, gridTemplateRows: "1fr" }}
                  exit={{ opacity: 0, gridTemplateRows: "0fr" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="grid overflow-hidden rounded-b-[2rem] bg-[#f7f5ef] xl:hidden"
                >
                  <div className="min-h-0">
                    <div className="flex flex-col gap-1 px-6 pt-3 pb-6">
                      {[
                        ["/services", t("services")], ["/industries", t("industries")],
                        ["/portfolio", t("caseStudies")], ["/systems-we-build", t("builds")],
                        ["/how-it-works", t("howItWorks")], ["/pricing", t("pricing")],
                        ["/about/abe-perez", t("about")],
                      ].map(([href, label]) => (
                        <Link key={href} href={localizedHref(href)} onClick={closeMenu} className="border-b border-black/10 py-3 text-lg font-bold">
                          {label}
                        </Link>
                      ))}
                      <Link href={localizedHref("/contact")} onClick={closeMenu} className="mt-3 rounded-full bg-orange-500 px-5 py-3 text-center font-bold text-white">
                        {t("getStarted")}
                      </Link>
                    </div>
                  </div>
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </motion.header>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

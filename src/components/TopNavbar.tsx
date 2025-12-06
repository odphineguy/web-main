"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";
import { Menu, X } from "lucide-react";

export default function TopNavbar() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = (mounted ? resolvedTheme : undefined) === "dark";

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
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

  const height = useTransform(scrollY, [0, 200], [88, 56]);
  const paddingX = useTransform(scrollY, [0, 200], [24, 12]);
  const borderColor = useTransform(scrollY, [0, 200], ["rgba(255,255,255,0)", "rgba(255,255,255,0.12)"]);
  const containerMaxWidth = useTransform(scrollY, [0, 200], [1280, 1000]);


  return (
    <motion.header
      style={{ height, borderBottomColor: borderColor, borderBottomWidth: 1, borderBottomStyle: "solid" }}
      className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <motion.div
        style={{ paddingLeft: paddingX, paddingRight: paddingX, maxWidth: mounted ? containerMaxWidth : 1280 }}
        className="mx-auto flex h-full items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/portfolio/abemedia.black.svg"
              alt="Abe Media"
              width={192}
              height={38}
              className="block dark:hidden w-32 sm:w-40 md:w-44 lg:w-48 h-auto"
              priority
            />
            <Image
              src="/images/portfolio/abemedia.white.svg"
              alt="Abe Media"
              width={192}
              height={38}
              className="hidden dark:block w-32 sm:w-40 md:w-44 lg:w-48 h-auto"
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 md:gap-6 text-base ml-3 sm:ml-6 md:ml-10">
          <Link href="/services" className={`font-bold transition-colors ${isActive("/services") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>Services</Link>
          <Link href="/pricing" className={`font-bold transition-colors ${isActive("/pricing") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>Pricing</Link>
          <Link href="/portfolio" className={`font-bold transition-colors ${isActive("/portfolio") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>Portfolio</Link>
          <Link href="/blog" className={`font-bold transition-colors ${isActive("/blog") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>Blog</Link>
          <Link href="/contact" className={`font-bold transition-colors ${isActive("/contact") ? "text-orange-500" : "opacity-80 hover:opacity-100"}`}>Contact</Link>
          <button
            ref={themeRef}
            onClick={toggleSwitchTheme}
            aria-label="Toggle theme"
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border opacity-80 hover:opacity-100"
          >
            {mounted && (isDark ? "🌙" : "☀️")}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            ref={themeRef}
            onClick={toggleSwitchTheme}
            aria-label="Toggle theme"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border opacity-80 hover:opacity-100"
          >
            {mounted && (isDark ? "🌙" : "☀️")}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border opacity-80 hover:opacity-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 dark:supports-[backdrop-filter]:bg-neutral-900/95 border-t border-border"
        >
          <nav className="flex flex-col py-4 px-6 space-y-3">
            <Link href="/services" className={`font-bold py-2 transition-colors ${isActive("/services") ? "text-orange-500" : "text-gray-900 dark:text-white opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/pricing" className={`font-bold py-2 transition-colors ${isActive("/pricing") ? "text-orange-500" : "text-gray-900 dark:text-white opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/portfolio" className={`font-bold py-2 transition-colors ${isActive("/portfolio") ? "text-orange-500" : "text-gray-900 dark:text-white opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
            <Link href="/blog" className={`font-bold py-2 transition-colors ${isActive("/blog") ? "text-orange-500" : "text-gray-900 dark:text-white opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/contact" className={`font-bold py-2 transition-colors ${isActive("/contact") ? "text-orange-500" : "text-gray-900 dark:text-white opacity-80 hover:opacity-100"}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}



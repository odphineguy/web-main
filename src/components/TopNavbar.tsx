"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";
import { Menu, X } from "lucide-react";

export default function TopNavbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = (mounted ? resolvedTheme : undefined) === "dark";
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
            <img
              src="/images/portfolio/abemedia.black.svg?v=5"
              alt="Abe Media"
              className="block dark:hidden w-32 sm:w-40 md:w-44 lg:w-48 h-auto"
            />
            <img
              src="/images/portfolio/abemedia.white.svg?v=5"
              alt="Abe Media"
              className="hidden dark:block w-32 sm:w-40 md:w-44 lg:w-48 h-auto"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 md:gap-6 text-base ml-3 sm:ml-6 md:ml-10">
          <Link href="/" className="font-bold opacity-80 hover:opacity-100">Home</Link>
          <Link href="/services" className="font-bold opacity-80 hover:opacity-100">Services</Link>
          <Link href="/logo-maker" className="font-bold opacity-80 hover:opacity-100">Logo Maker</Link>
          <Link href="/portfolio" className="font-bold opacity-80 hover:opacity-100">Portfolio</Link>
          <Link href="/blog" className="font-bold opacity-80 hover:opacity-100">Blog</Link>
          <Link href="/contact" className="font-bold opacity-80 hover:opacity-100">Contact</Link>
          <Link href="/get-started" className="font-bold opacity-80 hover:opacity-100">Get Started</Link>
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
            <Link href="/" className="text-gray-900 dark:text-white font-bold opacity-80 hover:opacity-100 py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/services" className="text-gray-900 dark:text-white font-bold opacity-80 hover:opacity-100 py-2" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/logo-maker" className="text-gray-900 dark:text-white font-bold opacity-80 hover:opacity-100 py-2" onClick={() => setMobileMenuOpen(false)}>Logo Maker</Link>
            <Link href="/portfolio" className="text-gray-900 dark:text-white font-bold opacity-80 hover:opacity-100 py-2" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
            <Link href="/blog" className="text-gray-900 dark:text-white font-bold opacity-80 hover:opacity-100 py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/contact" className="text-gray-900 dark:text-white font-bold opacity-80 hover:opacity-100 py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link href="/get-started" className="text-gray-900 dark:text-white font-bold opacity-80 hover:opacity-100 py-2" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}



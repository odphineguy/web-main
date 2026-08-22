"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

type AboutFounderProps = { locale: string };

const copy = {
  en: {
    more: "More about Abe",
    facts: ["17 years in SoCal operations", "recycLA dispatch, Los Angeles", "Based in Phoenix, Arizona", "Working nationwide"],
  },
  es: {
    more: "Más sobre Abe",
    facts: ["17 años en operaciones en SoCal", "Dispatch de recycLA, Los Ángeles", "Con base en Phoenix, Arizona", "Trabajo en todo el país"],
  },
} as const;

export default function AboutFounder({ locale }: AboutFounderProps) {
  const t = useTranslations("Home.Founder");
  const text = locale === "es" ? copy.es : copy.en;

  return (
    <section className="bold-about" id="about">
      <div className="bold-home__shell bold-about__layout">
        <div className="bold-about__photo">
          <Image
            src="/images/home/abe-fire.png"
            alt="Abe Perez, founder of Abe Media"
            width={560}
            height={746}
            sizes="(max-width: 900px) 80vw, 24rem"
            loading="lazy"
          />
        </div>
        <div className="bold-about__copy">
          <p className="bold-home__index">{t("badge")}</p>
          <h2>{t("title")}</h2>
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p className="bold-about__now">{t("p3")}</p>
          <ul className="bold-about__facts">
            {text.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
          <Link href={`/${locale}/about/abe-perez`} className="bold-about__link">
            {text.more}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type FaqAccordionItem = {
  question: ReactNode;
  answer: ReactNode;
  key?: string;
};

export function FaqAccordion({
  items,
  className,
}: {
  items: FaqAccordionItem[];
  className?: string;
}) {
  return (
    <div className={cn("site-faq-accordion", className)}>
      {items.map((item, index) => (
        <details key={item.key ?? String(index)}>
          <summary>
            {item.question}
            <b aria-hidden="true">+</b>
          </summary>
          <div className="site-faq-answer">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function FaqBlock({
  eyebrow,
  title,
  items,
  titleId,
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  items: FaqAccordionItem[];
  titleId?: string;
  className?: string;
}) {
  return (
    <div className={cn("site-faq-grid", className)}>
      <header className="site-faq-heading">
        <p className="site-faq-eyebrow">{eyebrow}</p>
        <h2 id={titleId}>{title}</h2>
      </header>
      <FaqAccordion items={items} />
    </div>
  );
}

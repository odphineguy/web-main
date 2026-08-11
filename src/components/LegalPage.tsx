import type { LegalDoc } from "@/content/legal";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] mb-2">{doc.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{doc.updated}</p>
        <p className="text-base leading-relaxed text-muted-foreground mb-10">{doc.intro}</p>
        {doc.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-xl md:text-2xl font-medium tracking-[-0.02em] mb-4">{section.heading}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

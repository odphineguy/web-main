import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    id: "q1",
    question: "What is the Meal Saver App and how does it work?",
    answer: "Answer coming soon.",
  },
  {
    id: "q2",
    question: "How does the Meal Saver App ensure the accuracy of the scanned food results?",
    answer: "Answer coming soon.",
  },
  {
    id: "q3",
    question: "Which products can I scan with the Meal Saver App?",
    answer: "Answer coming soon.",
  },
  {
    id: "q4",
    question: "Can the Meal Saver App be customized to my family's dietary needs?",
    answer: "Answer coming soon.",
  },
  {
    id: "q5",
    question: "Is my data secure when I use the Meal Saver App?",
    answer: "Answer coming soon.",
  },
  {
    id: "q6",
    question: "Is there an Android version of the Meal Saver App available?",
    answer: "Answer coming soon.",
  },
];

export default function HomeFaq() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}



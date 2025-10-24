import ContactForm from "@/components/ContactForm";
import ReceiptScanner from "@/components/ReceiptScanner";
export const metadata = {
  title: "Contact | Abe Media",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-foreground">

      {/* Contact Form Section */}
      <section className="pt-8 md:pt-12 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Send us a <span className="text-orange-500">Message</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Receipt Scanner Demo Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Try Our <span className="text-orange-500">Receipt Scanner</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Upload a receipt and see our AI-powered scanner in action.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Receipt Scanner Demo</h3>
                <p className="text-muted-foreground">Upload an image to get started</p>
              </div>
              <ReceiptScanner />
            </div>
          </div>
        </div>
      </section>
      
      {/* Placeholder Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          {/* Empty placeholder section */}
        </div>
      </section>
    </div>
  );
}



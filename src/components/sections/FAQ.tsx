import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/utils/cn';

const faqs = [
  {
    question: 'What services does Tesle offer?',
    answer:
      'We offer end-to-end digital services including software development, website development, mobile app development, graphics and branding, photography, videography, content creation, digital marketing, SEO, and business automation. Whatever your digital needs, we have the expertise to deliver.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines vary based on scope. A standard website takes 4–6 weeks, mobile apps 8–16 weeks, and larger software projects 12+ weeks. We provide a detailed timeline during the discovery phase and keep you updated throughout.',
  },
  {
    question: 'What is your pricing model?',
    answer:
      'We offer fixed-price packages for well-defined projects and custom quotes for complex work. Our Starter package begins at $2,499, Growth at $6,999, and Enterprise solutions are tailored to your specific needs. We\'re transparent about costs from the start.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes. We provide ongoing maintenance and support for all projects. Our Enterprise plan includes a dedicated project manager, and we offer retainer packages for continuous development, updates, and optimization.',
  },
  {
    question: 'Can you work with our existing team?',
    answer:
      'Absolutely. We frequently collaborate with in-house teams, agencies, and freelancers. Whether you need us to lead the project end-to-end or augment your existing team, we adapt to your workflow and tools.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Simply reach out through our contact form or book a free consultation. We\'ll discuss your goals, answer your questions, and provide a no-obligation proposal within 48 hours.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about Tesle."
        />

        <div className="mt-16 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={cn(
                  'rounded-2xl transition-all duration-300',
                  isOpen
                    ? 'glass bg-white/[0.05]'
                    : 'glass hover:bg-white/[0.03]'
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 text-muted" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

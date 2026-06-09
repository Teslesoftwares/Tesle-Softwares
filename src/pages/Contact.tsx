import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, MessageCircle, Send, ArrowRight, ChevronDown,
  ExternalLink, Building2, Copy, Check,
} from 'lucide-react';
import { offices, hours, serviceInquiries, email, getWhatsAppUrl } from '@/data/contact';
import { contactFormSchema, quoteFormSchema, type ContactFormData, type QuoteFormData } from '@/lib/validations';
import { SEO } from '@/components/layout/SEO';
import { FormInput, FormTextarea, FormSelect } from '@/components/ui/FormInput';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function OfficeCard({ office, index }: { office: typeof offices[0]; index: number }) {
  const [copied, setCopied] = useState(false);
  const copyAddress = () => {
    navigator.clipboard.writeText(office.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={itemVariants} className="glass rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent/20 transition-all duration-500 group">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img loading="lazy" decoding="async" src={office.image} alt={office.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <h3 className="text-base font-semibold text-white">{office.name}</h3>
          {office.featured && (
            <span className="text-[10px] font-semibold text-accent">Headquarters</span>
          )}
        </div>
        {office.featured && (
          <div className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-semibold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
            HQ
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted leading-relaxed">{office.address}</p>
            <button onClick={copyAddress} className="flex items-center gap-1 text-[10px] text-accent hover:underline mt-0.5">
              {copied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
              {copied ? 'Copied!' : 'Copy address'}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <a href={`tel:${office.phone}`} className="text-xs text-muted hover:text-white transition-colors">{office.phone}</a>
        </div>
        <div className="flex items-center gap-2.5">
          <Mail className="w-3.5 h-3.5 text-accent flex-shrink-0" />
          <a href={`mailto:${office.email}`} className="text-xs text-muted hover:text-white transition-colors">{office.email}</a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [formTab, setFormTab] = useState<'contact' | 'quote'>('contact');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [showFaq, setShowFaq] = useState<number | null>(null);

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const quoteForm = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const onContactSubmit = (data: ContactFormData) => {
    console.log('Contact form:', data);
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 3000);
    contactForm.reset();
  };

  const onQuoteSubmit = (data: QuoteFormData) => {
    console.log('Quote form:', data);
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 3000);
    quoteForm.reset();
  };

  return (
    <main>
      <SEO title="Contact Us" description="Get in touch with Tesle. Send us a message, request a quote, or visit our offices in Accra, Kumasi, or Takoradi, Ghana." />
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Let's Build Something{' '}
              <span className="text-gradient">Amazing</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              Whether you have a project in mind, need a quote, or just want to say hello —
              we'd love to hear from you. Reach out and let's make it happen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Strip */}
      <section className="relative pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Mail, label: 'Email Us', value: email.general, href: `mailto:${email.general}`, sub: 'We reply within 24h' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: getWhatsAppUrl(), sub: 'Fastest response', external: true },
              { icon: Phone, label: 'Call Us', value: offices[0].phone, href: `tel:${offices[0].phone}`, sub: 'Mon–Fri, 8AM–6PM' },
              { icon: MapPin, label: 'Visit Us', value: offices[0].name, href: '#offices', sub: '3 locations in Ghana' },
            ].map((item) => {
              const Icon = item.icon;
              const Comp = item.external ? 'a' : 'a';
              const extraProps = item.external ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  {...extraProps}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl p-4 sm:p-5 border border-white/[0.06] hover:border-accent/20 transition-all duration-300 group flex flex-col items-center text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xs font-semibold text-white mb-1">{item.label}</h3>
                  <p className="text-sm font-medium text-accent mb-0.5">{item.value}</p>
                  <p className="text-[10px] text-muted">{item.sub}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="text-center lg:text-left mb-8">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                    Send a Message
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Get in Touch</h2>
                  <p className="text-base text-muted leading-relaxed max-w-lg">
                    Fill in the form below and our team will get back to you within 24 hours.
                  </p>
                </div>
              </AnimatedSection>

              {/* Tab toggle */}
              <div className="flex items-center gap-1 bg-white/[0.04] rounded-full p-1 w-fit mb-8 mx-auto lg:mx-0">
                <button
                  onClick={() => setFormTab('contact')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                    formTab === 'contact' ? 'bg-accent text-black' : 'text-muted hover:text-white'
                  }`}
                >
                  Send a Message
                </button>
                <button
                  onClick={() => setFormTab('quote')}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                    formTab === 'quote' ? 'bg-accent text-black' : 'text-muted hover:text-white'
                  }`}
                >
                  Request a Quote
                </button>
              </div>

              <AnimatePresence mode="wait">
                {formTab === 'contact' ? (
                  <motion.form
                    key="contact"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={contactForm.handleSubmit(onContactSubmit)}
                    className="glass rounded-2xl p-5 sm:p-6 border border-white/[0.06] space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormInput label="Full Name" name="name" register={contactForm.register} error={contactForm.formState.errors.name} placeholder="Your name" required />
                      <FormInput label="Email" name="email" register={contactForm.register} error={contactForm.formState.errors.email} placeholder="you@example.com" type="email" required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormInput label="Phone" name="phone" register={contactForm.register} error={contactForm.formState.errors.phone} placeholder="+233 XX XXX XXXX" />
                      <FormSelect label="Service" name="service" register={contactForm.register} error={contactForm.formState.errors.service} options={serviceInquiries} required />
                    </div>
                    <FormTextarea label="Message" name="message" register={contactForm.register} error={contactForm.formState.errors.message} placeholder="Tell us about your project or inquiry..." required />

                    {contactSubmitted ? (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <Send className="w-5 h-5 text-green-400" />
                        <div><p className="text-sm font-medium text-green-400">Message Sent!</p><p className="text-xs text-muted">We'll get back to you within 24 hours.</p></div>
                      </motion.div>
                    ) : (
                      <button type="submit" className="w-full h-12 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all duration-300 inline-flex items-center justify-center gap-2">
                        Send Message <Send className="w-4 h-4" />
                      </button>
                    )}
                  </motion.form>
                ) : (
                  <motion.form
                    key="quote"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={quoteForm.handleSubmit(onQuoteSubmit)}
                    className="glass rounded-2xl p-5 sm:p-6 border border-white/[0.06] space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormInput label="Full Name" name="name" register={quoteForm.register} error={quoteForm.formState.errors.name} placeholder="Your name" required />
                      <FormInput label="Email" name="email" register={quoteForm.register} error={quoteForm.formState.errors.email} placeholder="you@example.com" type="email" required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormInput label="Company" name="company" register={quoteForm.register} error={quoteForm.formState.errors.company} placeholder="Company name" required />
                      <FormSelect label="Service Needed" name="service" register={quoteForm.register} error={quoteForm.formState.errors.service} options={serviceInquiries} required />
                    </div>
                    <FormSelect label="Budget Range" name="budget" register={quoteForm.register} error={quoteForm.formState.errors.budget}
                      options={[
                        { value: 'under-5k', label: 'Under $5,000' },
                        { value: '5k-15k', label: '$5,000 – $15,000' },
                        { value: '15k-50k', label: '$15,000 – $50,000' },
                        { value: '50k-100k', label: '$50,000 – $100,000' },
                        { value: '100k-plus', label: '$100,000+' },
                        { value: 'not-sure', label: 'Not sure yet' },
                      ]}
                      placeholder="Select budget range" required
                    />
                    <FormTextarea label="Project Description" name="description" register={quoteForm.register} error={quoteForm.formState.errors.description} placeholder="Tell us about your project, goals, timeline..." required />

                    {quoteSubmitted ? (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <ArrowRight className="w-5 h-5 text-green-400" />
                        <div><p className="text-sm font-medium text-green-400">Quote Requested!</p><p className="text-xs text-muted">We'll send you a custom quote within 1-2 business days.</p></div>
                      </motion.div>
                    ) : (
                      <button type="submit" className="w-full h-12 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all duration-300 inline-flex items-center justify-center gap-2">
                        Request Quote <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {/* Quick Contact */}
              <GlassCard className="!p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">General</p>
                      <a href={`mailto:${email.general}`} className="text-sm text-white hover:text-accent transition-colors">{email.general}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">Sales</p>
                      <a href={`mailto:${email.sales}`} className="text-sm text-white hover:text-accent transition-colors">{email.sales}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">Support</p>
                      <a href={`mailto:${email.support}`} className="text-sm text-white hover:text-accent transition-colors">{email.support}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">Careers</p>
                      <a href={`mailto:${email.careers}`} className="text-sm text-white hover:text-accent transition-colors">{email.careers}</a>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* WhatsApp CTA */}
              <GlassCard className="!p-5 !bg-[#25D366]/5 !border-[#25D366]/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Chat on WhatsApp</h3>
                    <p className="text-xs text-muted leading-relaxed mb-3">Get instant responses from our team. Typically replies within minutes during business hours.</p>
                    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-full bg-[#25D366] text-white hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Start Chat <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </GlassCard>

              {/* Office Hours */}
              <GlassCard className="!p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-white">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between text-xs">
                      <span className="text-muted">{h.day}</span>
                      <span className={`text-white font-medium ${h.hours === 'Closed' ? 'text-red-400' : ''}`}>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Offices / Map Section */}
      <section className="relative pb-16 sm:pb-24" id="offices">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Our Offices
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Visit Us</h2>
              <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                We have three offices across Ghana. Come by and say hello.
              </p>
            </div>
          </AnimatedSection>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
          >
            {offices.map((office, i) => (
              <OfficeCard key={office.id} office={office} index={i} />
            ))}
          </motion.div>

          {/* Static Map */}
          <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
            <div className="aspect-[21/9] min-h-[250px] bg-gradient-to-br from-accent/[0.03] via-purple/[0.02] to-transparent relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted">
                    Accra · Kumasi · Takoradi
                  </p>
                  <p className="text-xs text-muted/60 mt-1">
                    Serving clients across Ghana and beyond
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/Tesle+digital+agency+Ghana`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 text-xs font-medium bg-accent text-black rounded-full hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
                  >
                    View on Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              {/* Decorative grid lines */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            </div>
          </AnimatedSection>

          <div className="space-y-2">
            {[
              { q: 'How quickly do you respond to inquiries?', a: 'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, reach out via WhatsApp for the fastest response.' },
              { q: 'Do you work with international clients?', a: 'Absolutely. We serve clients across Africa, Europe, North America, and beyond. All our project management is done remotely with regular video check-ins.' },
              { q: 'What information do I need to provide for a quote?', a: 'The more detail the better. Tell us about your project goals, timeline, preferred technologies, and budget range. This helps us provide an accurate and tailored quote.' },
              { q: 'Can I visit your office?', a: 'Yes! We welcome visitors at any of our three offices. We recommend scheduling an appointment in advance so the right team members are available.' },
              { q: 'Do you offer post-project support?', a: 'Yes. All our projects come with a warranty period and we offer ongoing maintenance and support packages to keep your project running smoothly.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl border border-white/[0.06] overflow-hidden"
              >
                <button
                  onClick={() => setShowFaq(showFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-white hover:bg-white/[0.02] transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 flex-shrink-0 ${showFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-xs text-muted leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection delay={0.1}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Start Your Project
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Ready to Transform Your{' '}
              <span className="text-gradient">Digital Presence?</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Let's discuss your project and create something extraordinary together.
              No obligation, just great ideas.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${email.sales}`} className="px-9 py-4 text-lg font-medium bg-accent text-black rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                Start a Conversation <ArrowRight className="w-5 h-5" />
              </a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="px-9 py-4 text-lg font-medium border border-white/20 text-white rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 inline-flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

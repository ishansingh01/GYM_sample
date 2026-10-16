import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Dumbbell, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Award
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function AboutContact() {
  const { brand, showToast } = useStore();

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: 'Customer Support',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: 'How are heavy steel barbells and dumbbell pairs shipped?',
      a: 'All heavy items over 50 lbs ship via specialized freight with tracked ground logistics and liftgate delivery. You will receive real-time SMS dispatch alerts and a scheduling link directly from the freight carrier.'
    },
    {
      q: 'What is the 30-Day Ironclad Guarantee policy?',
      a: 'If you are not 100% satisfied with the quality, feel, or flavor of any IronPulse gear or supplements, return it within 30 days of delivery for a full refund or exchange. We even cover standard return shipping on domestic equipment.'
    },
    {
      q: 'Are IronPulse supplements certified banned-substance free?',
      a: 'Yes. 100% of our supplements are manufactured in NSF-certified, cGMP facilities and tested by third-party laboratories (Informed-Choice and WADA compliance) with verifiable certificates of analysis available for every batch.'
    },
    {
      q: 'How does the Lifetime Barbell Warranty work?',
      a: 'Our Cerakote and Hard Chrome barbells are guaranteed for life against shaft bending, snap-ring failure, or bushing detachment under ordinary gym and powerlifting use. Contact support with your order ID for an instant replacement.'
    },
    {
      q: 'Do you offer bulk pricing for commercial gym outfitting?',
      a: 'Yes! We outfit commercial powerlifting gyms, CrossFit boxes, collegiate athletic training rooms, and private studios. Contact our wholesale team at wholesale@ironpulse.fitness for custom quotes.'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast('Your inquiry has been received. A strength advisor will respond within 24 hours.', 'success');
    setContactForm({
      name: '',
      email: '',
      category: 'Customer Support',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-12">
      <Helmet>
        <title>About Us & Support | {brand.name}</title>
        <meta name="description" content="Learn about IronPulse fitness engineering, lifetime warranty, contact our Austin TX headquarters, and browse athlete FAQ." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Brand Mission Hero */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Dumbbell className="w-4 h-4 text-orange-500" />
            <span>Forged in Austin, Texas &bull; Built for Champions</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black text-white uppercase tracking-tight">
            NO EXCUSES. <span className="text-gradient-orange">NO GIMMICKS.</span> <br />
            JUST PURE PERFORMANCE.
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans max-w-3xl mx-auto">
            {brand.name} was born in the chalk-dusted pits of hardcore powerlifting and functional fitness gyms. We grew fed up with hollow barbells that bent under 400 lbs, chalky protein loaded with fillers, and gear built for Instagram instead of heavy iron.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-3xl font-display font-bold text-orange-500">215K</div>
              <div className="text-xs text-zinc-400 uppercase mt-1">PSI Tensile Steel</div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-3xl font-display font-bold text-lime-400">100%</div>
              <div className="text-xs text-zinc-400 uppercase mt-1">Tested Purity</div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-3xl font-display font-bold text-white">50K+</div>
              <div className="text-xs text-zinc-400 uppercase mt-1">Lifters Worldwide</div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="text-3xl font-display font-bold text-orange-400">30-Day</div>
              <div className="text-xs text-zinc-400 uppercase mt-1">Ironclad Trial</div>
            </div>
          </div>
        </section>

        {/* Contact Us & Headquarters */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Contact Info & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                DIRECT CHANNELS
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase mt-1">
                TALK TO A STRENGTH ADVISOR
              </h2>
              <p className="text-zinc-400 text-sm mt-2">
                Have questions regarding barbell knurl patterns, supplement stacks, or order logistics? Our athlete support team is ready.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Headquarters & Showroom</h4>
                  <p className="text-xs text-zinc-300 mt-1">{brand.contact.address}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Phone Support</h4>
                  <p className="text-xs text-zinc-300 mt-1">{brand.contact.phone}</p>
                  <p className="text-[11px] text-zinc-500">Toll-free across North America</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Email Inquiries</h4>
                  <p className="text-xs text-zinc-300 mt-1">{brand.contact.email}</p>
                  <p className="text-[11px] text-zinc-500">Response guaranteed in &lt; 24 business hours</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">Operating Hours</h4>
                  <p className="text-xs text-zinc-300 mt-1">Monday – Saturday: 7:00 AM – 8:00 PM CST</p>
                  <p className="text-[11px] text-zinc-500">Warehouse dispatches orders 6 days a week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
              <div>
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                  DISPATCH A MESSAGE
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Fill in your details below and our strength engineering team will reach out.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    <h4 className="text-base font-bold">Message Transmitted!</h4>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Thank you for reaching out. We have received your inquiry and our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Alex Vance"
                        className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="athlete@domain.com"
                        className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase">Department</label>
                      <select
                        value={contactForm.category}
                        onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                        className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option value="Customer Support">Customer Support</option>
                        <option value="Order Tracking">Order & Freight Tracking</option>
                        <option value="Lifetime Warranty Claim">Lifetime Warranty Claim</option>
                        <option value="Wholesale Gym Outfitting">Wholesale Gym Outfitting</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-300 uppercase">Subject</label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Brief summary"
                        className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase">Message</label>
                    <textarea
                      required
                      rows="4"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe your inquiry or order details..."
                      className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-zinc-950 font-display font-bold text-sm uppercase tracking-wider shadow-glow-orange flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </section>

        {/* Interactive FAQ Accordion */}
        <section id="warranty" className="pt-8 border-t border-zinc-800/80">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase">
              ATHLETE & EQUIPMENT FAQ
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-white text-base uppercase hover:text-orange-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-zinc-300 font-sans leading-relaxed border-t border-zinc-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LegalModals } from './components/modals/LegalModals';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Articles } from './sections/Articles';
import { ContactForm } from './sections/ContactForm';

export function App() {
  const [activeModal, setActiveModal] = useState<'tcle' | 'privacy' | null>(null);
  const [tcleAccepted, setTcleAccepted] = useState(false);

  useEffect(() => {
    // Design System IntersectionObserver for .rv & .service-wipe reveals
    const revealEls = document.querySelectorAll('.rv, .service-wipe');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.add('in');
            obs.unobserve(target);
          }
        });
      },
      { threshold: 0.11, rootMargin: '0px 0px -25px 0px' }
    );

    revealEls.forEach((el) => obs.observe(el));

    // Design System Parallax for .pic img
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const handleParallax = () => {
      rafId = 0;
      if (reduced) return;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLImageElement>('.pic img').forEach((img) => {
        const parent = img.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const fromCenter = (r.top + r.height / 2 - vh / 2) / vh;
        const shift = Math.max(-32, Math.min(32, -fromCenter * 30));
        img.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(handleParallax);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleParallax();

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-navy">
      <Navbar onOpenModal={(m) => setActiveModal(m)} />

      <main className="flex-grow">
        <Hero onOpenModal={(m) => setActiveModal(m)} />
        <About />
        <Services onOpenModal={(m) => setActiveModal(m)} />
        <Articles />
        <ContactForm
          onOpenModal={(m) => setActiveModal(m)}
          tcleAccepted={tcleAccepted}
          onToggleTcle={(val) => setTcleAccepted(val)}
        />
      </main>

      <Footer onOpenModal={(m) => setActiveModal(m)} />

      <LegalModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onAcceptTcle={() => setTcleAccepted(true)}
        tcleAccepted={tcleAccepted}
      />
    </div>
  );
}

export default App;

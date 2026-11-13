import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { PROFESSIONAL_INFO } from '../../data/siteContent';

interface NavbarProps {
  onOpenModal: (modal: 'tcle' | 'privacy') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isSolid, setIsSolid] = useState(false);
  const [isTucked, setIsTucked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let scrollUp = true;

    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const doc = document.documentElement.scrollHeight - vh;
      const delta = y - lastY;

      if (delta < -2) scrollUp = true;
      else if (delta > 2) scrollUp = false;
      lastY = y;

      setScrollProgress(doc > 0 ? Math.max(0, Math.min(1, y / doc)) : 0);

      const heroEl = document.getElementById('inicio');
      const heroHeight = heroEl ? heroEl.offsetHeight : vh * 0.85;
      const pastHero = y > heroHeight - 110;

      setIsSolid(pastHero);
      setIsTucked(pastHero && !scrollUp && Math.abs(delta) > 0 && y > heroHeight);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre Mim', href: '#sobre-mim' },
    { label: 'Atendimentos', href: '#atendimentos' },
    { label: 'Artigos e Notícias', href: '#artigos' },
    { label: 'Contato', href: '#contato' },
  ];

  const showSolid = isSolid || mobileMenuOpen;

  return (
    <>
      {/* Top Scroll Progress Bar (Design System #progress) */}
      <div
        id="progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header
        id="nav"
        className={`site-nav ${showSolid ? 'solid' : ''} ${
          isTucked && !mobileMenuOpen ? 'tuck' : ''
        }`}
      >
        {/* Brand Logo & CRFa */}
        <a
          href="#inicio"
          className="flex items-center gap-3.5 group focus:outline-none"
          aria-label="Fga. Me. Jéssica Alves Rodrigues - Início"
        >
          <img
            src={
              showSolid
                ? '/brand/assinatura-principal.svg'
                : '/brand/assinatura-secundaria.svg'
            }
            alt="Fga. Me. Jéssica Alves Rodrigues"
            className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span
            className={`hidden xl:inline-block pl-3.5 border-l text-[10px] font-extrabold uppercase tracking-[0.16em] ${
              showSolid
                ? 'border-brand-navy/20 text-brand-wine'
                : 'border-brand-rose/30 text-brand-rose'
            }`}
          >
            {PROFESSIONAL_INFO.crfa}
          </span>
        </a>

        {/* Desktop Editorial Navigation */}
        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Menu principal"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.14em] font-bold hover:opacity-60 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons (TCLE + Design System .nav-book CTA) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenModal('tcle')}
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] border transition-colors ${
              showSolid
                ? 'border-brand-navy/20 text-brand-wine bg-brand-rose/25 hover:bg-brand-rose/50'
                : 'border-brand-rose/35 text-brand-rose bg-white/5 hover:bg-white/15'
            }`}
            title="Termo de Consentimento para Telefonoaudiologia (Resolução CFFa nº 580/2020)"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TCLE On-line</span>
          </button>

          <a
            href="#contato"
            className={`ds-btn-outline ${
              showSolid
                ? 'border-brand-navy text-brand-navy hover:bg-brand-wine hover:text-brand-cream hover:border-brand-wine'
                : 'border-brand-rose text-white hover:bg-brand-rose hover:text-brand-navy'
            }`}
          >
            <span>Agendar Consulta</span>
            <b aria-hidden="true">↗</b>
          </a>
        </div>

        {/* Mobile Menu Toggle & Compact CTA */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="#contato"
            className={`md:hidden inline-flex items-center gap-1.5 border px-2.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] ${
              showSolid
                ? 'border-brand-navy text-brand-navy'
                : 'border-brand-rose/60 text-white'
            }`}
          >
            <span>Agendar</span>
            <b aria-hidden="true">↗</b>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 border transition-colors ${
              showSolid
                ? 'border-brand-navy/20 text-brand-navy hover:bg-brand-rose/30'
                : 'border-white/25 text-white hover:bg-white/10'
            }`}
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-cream text-brand-navy border-b border-brand-navy/15 px-5 pt-4 pb-6 shadow-2xl space-y-4">
            <div className="pb-3 border-b border-brand-navy/10 flex items-center justify-between">
              <span className="eyebrow text-brand-wine">
                {PROFESSIONAL_INFO.name}
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-navy/70">
                {PROFESSIONAL_INFO.crfa}
              </span>
            </div>

            <nav className="flex flex-col divide-y divide-brand-navy/10">
              {navLinks.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.14em] text-brand-navy hover:text-brand-wine transition-colors"
                >
                  <span>
                    <small className="text-brand-wine mr-2">0{idx + 1}</small>
                    {item.label}
                  </span>
                  <span>↗</span>
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('tcle');
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-brand-navy/20 bg-brand-rose/35 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-wine"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>TCLE Telefonoaudiologia (CFFa 580/2020)</span>
              </button>

              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="ds-btn justify-between"
              >
                <span>Agendar Consulta</span>
                <b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

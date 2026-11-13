import React from 'react';
import { ShieldCheck, Lock, Phone, ExternalLink, MapPin } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';
import { PROFESSIONAL_INFO } from '../../data/siteContent';

interface FooterProps {
  onOpenModal: (modal: 'tcle' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-[#0F172B] text-white border-t border-white/15 ds-pad py-14 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
        {/* Col 1: Brand Signature & Credentials */}
        <div className="md:col-span-5 space-y-4">
          <img
            src="/brand/assinatura-secundaria.svg"
            alt="Fga. Me. Jéssica Alves Rodrigues"
            className="h-16 w-auto object-contain"
          />
          <div className="space-y-1">
            <p className="archivo font-extrabold text-xl tracking-[-0.03em] text-white">
              {PROFESSIONAL_INFO.name}
            </p>
            <p className="text-[11px] font-bold text-brand-rose uppercase tracking-[0.16em]">
              {PROFESSIONAL_INFO.role} • {PROFESSIONAL_INFO.crfa}
            </p>
            <p className="text-xs text-white/80">{PROFESSIONAL_INFO.degree}</p>
          </div>
          <p className="serif-accent text-base text-brand-rose">
            “{PROFESSIONAL_INFO.slogan}”
          </p>
        </div>

        {/* Col 2: Navigation & Legal */}
        <div className="md:col-span-3 space-y-3.5">
          <h4 className="eyebrow text-brand-rose">Navegação e Termos</h4>
          <ul className="space-y-2.5 text-xs uppercase tracking-[0.12em] font-bold text-white/85">
            <li>
              <a
                href="#inicio"
                className="hover:text-brand-rose transition-colors"
              >
                Início
              </a>
            </li>
            <li>
              <a
                href="#sobre-mim"
                className="hover:text-brand-rose transition-colors"
              >
                Sobre Mim
              </a>
            </li>
            <li>
              <a
                href="#atendimentos"
                className="hover:text-brand-rose transition-colors"
              >
                Atendimentos Presencial e On-line
              </a>
            </li>
            <li>
              <a
                href="#artigos"
                className="hover:text-brand-rose transition-colors"
              >
                Artigos e Notícias
              </a>
            </li>
            <li className="pt-1">
              <button
                type="button"
                onClick={() => onOpenModal('tcle')}
                className="inline-flex items-center gap-1.5 text-brand-rose hover:text-white transition-colors text-left"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>TCLE Telefonoaudiologia (CFFa 580/2020)</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenModal('privacy')}
                className="inline-flex items-center gap-1.5 text-brand-rose hover:text-white transition-colors text-left"
              >
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Política de Privacidade (LGPD)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact & Location */}
        <div className="md:col-span-4 space-y-3.5">
          <h4 className="eyebrow text-brand-rose">Atendimento e Contato</h4>
          <div className="space-y-3 text-xs sm:text-sm text-white/85">
            <p className="flex items-start gap-2.5 leading-relaxed">
              <MapPin className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
              <span>
                <strong>Asa Norte — Brasília/DF:</strong>{' '}
                {PROFESSIONAL_INFO.location.building} (em parceria com o{' '}
                {PROFESSIONAL_INFO.location.partner})
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-rose shrink-0" />
              <a
                href={`https://wa.me/${PROFESSIONAL_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-rose underline underline-offset-4"
              >
                WhatsApp: {PROFESSIONAL_INFO.whatsappDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <InstagramIcon className="w-4 h-4 text-brand-rose shrink-0" />
              <a
                href={PROFESSIONAL_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-rose underline underline-offset-4 inline-flex items-center gap-1"
              >
                <span>Instagram: {PROFESSIONAL_INFO.instagramHandle}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
            <p className="pt-1 text-xs text-white/70">
              Currículo Lattes:{' '}
              <a
                href={PROFESSIONAL_INFO.lattesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-rose underline underline-offset-4 hover:text-white"
              >
                http://lattes.cnpq.br/6864509082428945
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Design System Footer Meta Bar (.footer-meta) */}
      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] uppercase tracking-[0.13em] text-white/65">
        <p>
          © {new Date().getFullYear()} {PROFESSIONAL_INFO.name} (
          {PROFESSIONAL_INFO.crfa}). Todos os direitos reservados.
        </p>
        <p>
          Em conformidade com a {PROFESSIONAL_INFO.cffaResolution} e LGPD (Lei
          nº 13.709/2018).
        </p>
        <a
          href="#inicio"
          className="text-brand-rose font-bold hover:text-white transition-colors"
        >
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  );
};

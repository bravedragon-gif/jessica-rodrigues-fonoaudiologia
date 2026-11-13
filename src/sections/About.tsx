import React from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { PROFESSIONAL_INFO } from '../data/siteContent';

export const About: React.FC = () => {
  const highlights = [
    {
      num: '01',
      icon: <GraduationCap className="w-4 h-4 text-brand-wine" />,
      title: 'Mestra em Ciências da Reabilitação (UnB)',
      desc: 'Formação acadêmica sólida pela Universidade de Brasília e pós-graduanda em Linguagem.',
    },
    {
      num: '02',
      icon: <BookOpen className="w-4 h-4 text-brand-wine" />,
      title: 'Leitura, Escrita e Matemática',
      desc: 'Foco clínico na avaliação e intervenção nas dificuldades e transtornos de aprendizagem (incluindo Dislexia).',
    },
    {
      num: '03',
      icon: <Sparkles className="w-4 h-4 text-brand-wine" />,
      title: 'Fala, TPAC, TEA e Equoterapia',
      desc: 'Diagnóstico e tratamento das alterações de fala, reabilitação auditiva (TPAC), atendimento a crianças e adultos com TEA e prática em equoterapia.',
    },
    {
      num: '04',
      icon: <Users className="w-4 h-4 text-brand-wine" />,
      title: 'Docência e Mentorias Acadêmicas/Profissionais',
      desc: 'Vivência destacada em docência do ensino superior, supervisão clínica de estágios e mentorias para fonoaudiólogos e estudantes.',
    },
  ];

  return (
    <section
      id="sobre-mim"
      className="py-20 lg:py-36 ds-pad ds-border-b bg-brand-cream"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Editorial Portrait / Brand Composition (.about-image) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rv relative overflow-hidden border border-brand-navy/15 bg-brand-navy text-white">
            {/* Image Frame with Parallax Target */}
            <div className="pic relative overflow-hidden bg-white aspect-[4/4.3]">
              <img
                src="/brand/comunicar-bem.png"
                alt="Comunicar bem é viver bem - Fga. Me. Jéssica Alves Rodrigues"
                loading="lazy"
                className="w-full h-[112%] object-cover will-change-transform"
              />
            </div>

            {/* Editorial Metadata Footer inside Card */}
            <div className="p-6 sm:p-8 bg-brand-navy text-white space-y-5 border-t border-brand-rose/20">
              <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4">
                <span className="px-3 py-1 bg-brand-wine text-brand-cream text-[11px] font-extrabold uppercase tracking-[0.14em]">
                  {PROFESSIONAL_INFO.crfa}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-rose">
                  Brasília • DF
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="archivo font-extrabold text-2xl tracking-[-0.04em] text-white">
                  {PROFESSIONAL_INFO.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-rose">
                  {PROFESSIONAL_INFO.degree}
                </p>
                <p className="text-xs text-white/75">
                  {PROFESSIONAL_INFO.postgrad}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={PROFESSIONAL_INFO.lattesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-btn w-full bg-brand-rose text-brand-navy hover:bg-white"
                >
                  <span className="inline-flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-wine" />
                    Acessar Currículo Lattes (CNPq)
                  </span>
                  <b
                    aria-hidden="true"
                    className="!bg-brand-navy !text-brand-cream"
                  >
                    ↗
                  </b>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Copy & Structured Highlights (.about-copy) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
          <div className="rv space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-brand-navy/15 pb-4">
              <span className="eyebrow text-brand-wine">
                02 / Sobre Mim — Trajetória Clínica &amp; Acadêmica
              </span>
              <span className="eyebrow text-brand-navy/60">UnB • CRFa 5-13805</span>
            </div>

            <h2 className="ds-section-h2 text-brand-navy pt-2">
              CIÊNCIA, ACOLHIMENTO E<br />
              <em className="text-brand-wine">evidências.</em>
            </h2>
          </div>

          <div className="rv space-y-5 text-base sm:text-lg text-brand-navy/85 leading-[1.85] max-w-2xl">
            <p>
              Sou{' '}
              <strong className="text-brand-navy">
                Fonoaudióloga, Mestre em Ciências da Reabilitação
              </strong>{' '}
              pela Universidade de Brasília (UnB) e{' '}
              <strong className="text-brand-navy">
                pós-graduanda em Linguagem
              </strong>
              . Dedico minha prática clínica principalmente à avaliação e
              intervenção nas{' '}
              <strong className="text-brand-wine">
                dificuldades e transtornos de aprendizagem
              </strong>{' '}
              que impactam a leitura, a escrita e a matemática.
            </p>
            <p>
              Também atuo no diagnóstico e tratamento das{' '}
              <strong className="text-brand-navy">alterações de fala</strong> e
              na{' '}
              <strong className="text-brand-navy">reabilitação auditiva</strong>
              , oferecendo um acompanhamento personalizado e baseado em
              evidências. Além da atuação clínica, realizo{' '}
              <strong className="text-brand-wine">
                mentorias profissionais e acadêmicas
              </strong>{' '}
              para fonoaudiólogos e estudantes da área.
            </p>
          </div>

          {/* Editorial Signature Callout */}
          <div className="rv p-5 sm:p-6 bg-white border border-brand-navy/15 border-l-4 border-l-brand-wine flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/brand/assinatura-principal.svg"
                alt="Assinatura Fga. Me. Jéssica Alves Rodrigues"
                className="h-10 w-auto object-contain hidden sm:block"
              />
              <div>
                <p className="font-extrabold text-brand-navy text-base">
                  {PROFESSIONAL_INFO.name}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-wine">
                  {PROFESSIONAL_INFO.role} • {PROFESSIONAL_INFO.crfa}
                </p>
              </div>
            </div>

            <a
              href={PROFESSIONAL_INFO.lattesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand-wine border-b border-brand-wine pb-0.5 hover:text-brand-navy hover:border-brand-navy transition-colors"
            >
              http://lattes.cnpq.br/6864509082428945 ↗
            </a>
          </div>

          {/* 4 Structured Highlights Grid (.info-grid from Design System) */}
          <div className="rv grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.num}
                className="p-5 border border-brand-navy/15 bg-white/80 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-brand-navy/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="text-xs font-extrabold uppercase tracking-[0.08em] text-brand-navy">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-brand-wine/70">
                    {item.num}
                  </span>
                </div>
                <p className="text-xs text-brand-navy/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Credentials & CTA */}
          <div className="rv pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-brand-navy/15">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-brand-navy/80">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-wine" />
                Atendimento de Crianças, Adolescentes e Adultos
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-wine" />
                Supervisão Clínica e Docência no Ensino Superior
              </span>
            </div>

            <a href="#contato" className="ds-btn">
              <span>Agendar Consulta</span>
              <b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

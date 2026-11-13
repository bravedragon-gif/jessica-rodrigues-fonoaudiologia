import React, { useEffect, useRef } from 'react';
import {
  ShieldCheck,
  MapPin,
  Video,
  GraduationCap,
  CheckCircle2,
  Ear,
  BookOpen,
  Brain,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { PROFESSIONAL_INFO, CORE_AREAS } from '../data/siteContent';

interface HeroProps {
  onOpenModal: (modal: 'tcle' | 'privacy') => void;
}

const WALL_ITEMS = [
  {
    type: 'image' as const,
    src: '/brand/comunicar-bem.png',
    label: 'Comunicar bem é viver bem',
    bg: '#FAF1F1',
  },
  {
    type: 'plate' as const,
    kicker: '01 / Fala',
    title: 'PRECISÃO ARTICULATÓRIA',
    sub: 'Aquisição dos sons da fala em crianças e adultos',
    bg: '#58203A',
    color: '#FAF1F1',
  },
  {
    type: 'image' as const,
    src: '/brand/ass-principal-azul.png',
    label: 'Identidade Oficial Azul',
    bg: '#16223F',
  },
  {
    type: 'plate' as const,
    kicker: '02 / Aprendizagem',
    title: 'LEITURA, ESCRITA & MATEMÁTICA',
    sub: 'Intervenção em Dislexia e desafios escolares',
    bg: '#243D5B',
    color: '#FAF1F1',
  },
  {
    type: 'image' as const,
    src: '/brand/ass-principal-rosa.png',
    label: 'Identidade Oficial Rosa',
    bg: '#FAF1F1',
  },
  {
    type: 'plate' as const,
    kicker: '03 / Cognição & Linguagem',
    title: 'ESTIMULAÇÃO COGNITIVA & TEA',
    sub: 'Atenção, memória, linguagem e equoterapia',
    bg: '#74465B',
    color: '#FAF1F1',
  },
  {
    type: 'image' as const,
    src: '/brand/ass-principal-vinho.png',
    label: 'Identidade Oficial Vinho',
    bg: '#58203A',
  },
  {
    type: 'plate' as const,
    kicker: '04 / Audição',
    title: 'REABILITAÇÃO AUDITIVA (TPAC)',
    sub: 'Processamento Auditivo Central e neuroplasticidade',
    bg: '#16223F',
    color: '#EBC4BF',
  },
  {
    type: 'image' as const,
    src: '/brand/icone-fundo.png',
    label: 'Símbolo Institucional',
    bg: '#16223F',
  },
  {
    type: 'plate' as const,
    kicker: 'CFFa nº 580/2020',
    title: 'TELEFONOAUDIOLOGIA',
    sub: 'Anamnese, devolutivas e mentorias on-line seguras',
    bg: '#EBC4BF',
    color: '#16223F',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getIcon = (id: string) => {
    switch (id) {
      case 'fala':
        return <MessageCircle className="w-5 h-5" />;
      case 'aprendizagem':
        return <BookOpen className="w-5 h-5" />;
      case 'cognitiva':
        return <Brain className="w-5 h-5" />;
      case 'auditiva':
        return <Ear className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCardVisual = (idx: number) => {
    const visuals = [
      {
        bg: 'linear-gradient(160deg, #16223F 0%, #243D5B 55%, #58203A 100%)',
        img: '/brand/icone-fundo.png',
        accent: '#EBC4BF',
      },
      {
        bg: 'linear-gradient(160deg, #58203A 0%, #74465B 60%, #16223F 100%)',
        img: '/brand/comunicar-bem.png',
        accent: '#FAF1F1',
      },
      {
        bg: 'linear-gradient(160deg, #243D5B 0%, #16223F 60%, #74465B 100%)',
        img: '/brand/ass-principal-roxo.png',
        accent: '#EBC4BF',
      },
      {
        bg: 'linear-gradient(160deg, #16223F 0%, #58203A 65%, #243D5B 100%)',
        img: '/brand/ass-principal-vinho.png',
        accent: '#EBC4BF',
      },
    ];
    return visuals[idx % visuals.length];
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let mx = 0;
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;

      if (heroSectionRef.current && heroBgRef.current) {
        const h = Math.max(1, heroSectionRef.current.offsetHeight);
        const progress = Math.max(0, Math.min(1, y / h));
        heroBgRef.current.style.transform = `translate3d(0, ${progress * 12}%, 0)`;
      }

      if (wallRef.current) {
        const rect = wallRef.current.getBoundingClientRect();
        const wp = Math.max(
          0,
          Math.min(1, (vh - rect.top) / (vh + rect.height * 0.6))
        );
        const amplitude = Math.max(90, window.innerWidth * 0.18);
        rowRefs.current.forEach((row, i) => {
          if (!row) return;
          const sign = i % 2 ? 1 : -1;
          row.style.transform = `translate3d(${
            sign * ((wp - 0.5) * amplitude + mx * 32)
          }px, 0, 0)`;
        });
      }
    };

    const requestUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const onPointerMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      requestUpdate();
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="inicio" className="relative">
      {/* 00 / Full-Viewport Editorial Hero (100svh from Design System) */}
      <div
        ref={heroSectionRef}
        className="relative isolate min-h-[100svh] flex flex-col justify-between overflow-hidden bg-brand-navy text-white pt-28 pb-10 sm:pb-14 ds-pad"
      >
        {/* Parallax Editorial Background Layer */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute -inset-y-[10%] inset-x-0 -z-20 will-change-transform"
          style={{
            background:
              'radial-gradient(circle at 82% 22%, rgba(88, 32, 58, 0.72) 0%, rgba(22, 34, 63, 0.92) 52%, #111A30 100%)',
          }}
        >
          <img
            src="/brand/icone-fundo.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <img
            src="/brand/malha-grafica.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <img
            src="/brand/onda-1.svg"
            alt=""
            aria-hidden="true"
            className="absolute -right-24 top-12 w-[540px] opacity-25 rotate-12"
          />
        </div>

        {/* Editorial Contrast Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(16, 22, 38, 0.35) 0%, transparent 32%, rgba(22, 34, 63, 0.25) 55%, rgba(15, 22, 42, 0.88) 100%)',
          }}
        />

        {/* Hero Topline Metadata */}
        <div className="w-full border-b border-brand-rose/20 pb-4 flex flex-wrap items-center justify-between gap-4 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-brand-rose">
          <div className="flex flex-wrap items-center gap-2.5">
            <img
              src="/brand/icone.svg"
              alt=""
              className="w-4 h-4 object-contain brightness-0 invert"
            />
            <span className="font-bold">
              {PROFESSIONAL_INFO.role} • {PROFESSIONAL_INFO.crfa}
            </span>
            <span className="hidden sm:inline opacity-40">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/90">
              <GraduationCap className="w-3.5 h-3.5 text-brand-rose" />
              {PROFESSIONAL_INFO.degree}
            </span>
          </div>
          <span className="text-white/80 font-semibold">
            Asa Norte (Brasília/DF) &amp; Telefonoaudiologia
          </span>
        </div>

        {/* Hero Centerpiece: Slogan & Monumental Display Name */}
        <div className="my-auto py-10 sm:py-14 space-y-6">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-brand-rose/35 bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-rose" />
            <span className="eyebrow text-brand-rose">
              “{PROFESSIONAL_INFO.slogan}” — {PROFESSIONAL_INFO.postgrad}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brand-rose/90 font-bold">
              {PROFESSIONAL_INFO.name}
            </p>
            <h1 className="archivo font-black uppercase tracking-[-0.07em] leading-[0.86] text-[clamp(44px,8.6vw,138px)] text-white">
              JÉSSICA ALVES
              <br />
              <span className="serif-accent font-normal text-brand-rose lowercase tracking-[-0.04em]">
                fonoaudiologia.
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-2xl leading-relaxed font-normal">
            Avaliação, diagnóstico e intervenção fonoaudiológica com
            fundamentação prática e científica.
          </p>
        </div>

        {/* Hero Bottom Bar: CTAs, CFFa Seal & Scroll Mark */}
        <div className="pt-6 border-t border-brand-rose/20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
            <a
              href="#contato"
              className="ds-btn bg-brand-rose text-brand-navy hover:bg-white"
            >
              <span>Agendar Consulta</span>
              <b
                aria-hidden="true"
                className="!bg-brand-navy !text-brand-cream"
              >
                ↗
              </b>
            </a>

            <a
              href="#atendimentos"
              className="ds-btn-outline border-brand-rose/50 text-white hover:bg-brand-wine hover:border-brand-wine py-3.5 px-5"
            >
              <span>Conhecer Atendimentos</span>
              <b aria-hidden="true">↗</b>
            </a>

            {/* Official Seal CFFa nº 580/2020 */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 border border-brand-rose/30 bg-brand-navy/80 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-brand-rose shrink-0" />
              <div className="text-[11px] leading-snug">
                <p className="font-bold uppercase tracking-wider text-brand-rose">
                  Selo de Conformidade • Telefonoaudiologia (
                  {PROFESSIONAL_INFO.cffaResolution})
                </p>
                <p className="text-white/80">
                  Canal seguro com sigilo profissional.{' '}
                  <button
                    type="button"
                    onClick={() => onOpenModal('tcle')}
                    className="underline font-bold text-brand-rose hover:text-white ml-1"
                  >
                    Ler e aceitar TCLE ↗
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-brand-rose/85 shrink-0">
            <span>Role para explorar</span>
            <i className="block w-14 h-px bg-brand-rose/60" />
            <span>↓</span>
          </div>
        </div>
      </div>

      {/* Infinite Specialty Marquee (.marquee-wrap from Design System) */}
      <div
        aria-label="Áreas de atuação fonoaudiológica"
        className="marquee-wrap"
      >
        <div className="marquee-track">
          {[0, 1].map((copyIdx) => (
            <div
              key={copyIdx}
              className="marquee-set"
              aria-hidden={copyIdx === 1 ? 'true' : undefined}
            >
              <span>FALA &amp; ARTICULAÇÃO</span>
              <i />
              <span>TRANSTORNOS DE APRENDIZAGEM</span>
              <i />
              <span>DISLEXIA</span>
              <i />
              <span>PROCESSAMENTO AUDITIVO (TPAC)</span>
              <i />
              <span>ESTIMULAÇÃO COGNITIVA</span>
              <i />
              <span>TEA (CRIANÇAS &amp; ADULTOS)</span>
              <i />
              <span>EQUOTERAPIA</span>
              <i />
              <span>DOCÊNCIA &amp; MENTORIAS</span>
              <i />
            </div>
          ))}
        </div>
      </div>

      {/* 01 / Editorial Intro & Resumo das Áreas de Atuação */}
      <div className="py-20 lg:py-32 ds-pad ds-border-b bg-brand-cream">
        <div className="rv flex flex-col md:flex-row md:items-start justify-between gap-6 pb-10 ds-border-b">
          <span className="eyebrow text-brand-wine">
            01 / Resumo das Áreas de Atuação
          </span>
          <span className="archivo text-xs font-extrabold tracking-[0.16em] uppercase text-brand-navy">
            COMUNICAR BEM É VIVER BEM.
          </span>
        </div>

        <p className="rv mt-12 archivo font-bold tracking-[-0.055em] leading-[1.06] text-[clamp(30px,4.8vw,78px)] text-brand-navy max-w-6xl">
          Ciência e sensibilidade clínica para transformar a{' '}
          <em className="serif-accent text-brand-wine">comunicação,</em> a{' '}
          <em className="serif-accent text-brand-wine">aprendizagem</em> e o
          processamento{' '}
          <em className="serif-accent text-brand-wine">auditivo.</em>
        </p>

        {/* Full Clinical Summary + Location & Online Modalities */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="rv lg:col-span-7 p-7 sm:p-10 border border-brand-navy/15 bg-white flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-navy/10 pb-4">
                <span className="eyebrow text-brand-wine">
                  Síntese Clínica &amp; Acadêmica
                </span>
                <span className="ds-tag text-brand-navy">
                  {PROFESSIONAL_INFO.crfa} • UnB
                </span>
              </div>

              <p className="text-base sm:text-lg text-brand-navy/90 leading-[1.8]">
                Atuação com fundamentação prática e científica na avaliação,
                diagnóstico e intervenção fonoaudiológica em{' '}
                <strong className="text-brand-wine">
                  distúrbios da fala, linguagem escrita e Transtorno do
                  Processamento Auditivo Central (TPAC)
                </strong>
                . Experiência no atendimento de{' '}
                <strong className="text-brand-navy">
                  crianças e adultos com Transtorno do Espectro Autista (TEA)
                </strong>
                , crianças com{' '}
                <strong className="text-brand-navy">
                  Dislexia e dificuldades de aprendizagem
                </strong>
                , prática em{' '}
                <strong className="text-brand-navy">
                  equoterapia e métodos terapêuticos complementares
                </strong>
                . Vivência destacada em{' '}
                <strong className="text-brand-wine">
                  docência do ensino superior e supervisão clínica de estágios
                </strong>
                .
              </p>
            </div>

            <div className="pt-4 border-t border-brand-navy/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-brand-navy/75">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-wine" />
                Prática Baseada em Evidências Científicas
              </span>
              <span>Brasília/DF &amp; On-line</span>
            </div>
          </div>

          <div className="rv lg:col-span-5 grid grid-cols-1 gap-4">
            <div className="p-6 border border-brand-navy/15 bg-[#F4E6E5] flex items-start gap-4">
              <div className="p-3 bg-brand-wine text-white shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="eyebrow text-brand-wine">
                  Modalidade 01 / Presencial
                </span>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-brand-navy">
                  Atendimento Presencial na Asa Norte
                </h3>
                <p className="text-sm text-brand-navy/80 leading-relaxed">
                  {PROFESSIONAL_INFO.location.building} — Em parceria com o{' '}
                  <strong>{PROFESSIONAL_INFO.location.partner}</strong> (
                  {PROFESSIONAL_INFO.location.area}).
                </p>
              </div>
            </div>

            <div className="p-6 border border-brand-navy/15 bg-brand-navy text-white flex items-start gap-4">
              <div className="p-3 bg-brand-rose text-brand-navy shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="eyebrow text-brand-rose">
                  Modalidade 02 / {PROFESSIONAL_INFO.cffaResolution}
                </span>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-white">
                  Modalidade On-line Segura (Telefonoaudiologia)
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Consultas iniciais de anamnese, devolutivas diagnósticas e
                  mentorias profissionais/acadêmicas por videoconferência.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid — Design System 3:4 Service Cards with Clip-Path Wipe */}
        <div className="mt-20">
          <div className="rv flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="eyebrow text-brand-wine">
                Pilares Clínicos — Áreas Principais de Atendimento
              </span>
              <h2 className="ds-section-h2 text-brand-navy mt-3">
                ESPECIALIDADES <em>clínicas.</em>
              </h2>
            </div>
            <p className="text-sm text-brand-navy/75 max-w-xs leading-relaxed">
              Quatro eixos fundamentais conduzidos com rigor diagnóstico,
              planejamento individualizado e acolhimento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {CORE_AREAS.map((area, idx) => {
              const visual = getCardVisual(idx);
              return (
                <article
                  key={area.id}
                  className="service-wipe aspect-[3/4] flex flex-col justify-between p-6 text-white group border border-brand-navy/15"
                  style={{ background: visual.bg }}
                >
                  <img
                    src={visual.img}
                    alt={area.title}
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 w-full h-[112%] object-cover opacity-20 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/85"
                  />

                  {/* Top Badge & Icon */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="px-3 py-1.5 border border-white/25 bg-black/25 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.14em] text-brand-rose">
                      {area.badge}
                    </span>
                    <div className="w-10 h-10 border border-white/25 bg-white/10 grid place-items-center text-brand-rose">
                      {getIcon(area.id)}
                    </div>
                  </div>

                  {/* Bottom Editorial Title & Description */}
                  <div className="relative z-10 space-y-3 pt-12">
                    <p className="text-xs text-white/85 leading-relaxed">
                      {area.shortDesc}
                    </p>
                    <p className="text-[11px] text-brand-rose/85 leading-relaxed border-t border-white/15 pt-2.5">
                      {area.details}
                    </p>
                    <div className="pt-2 flex items-end justify-between gap-3 border-t border-white/20">
                      <h3 className="archivo font-extrabold text-[clamp(20px,2.1vw,30px)] leading-[0.95] tracking-[-0.04em] text-white">
                        {area.title}
                      </h3>
                      <small className="text-[10px] font-bold tracking-[0.14em] uppercase text-brand-rose shrink-0">
                        0{idx + 1} / 04
                      </small>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Design System Pattern: Interactive Photo / Brand Wall (170% x -14deg) */}
      <div
        className="py-14 bg-brand-cream ds-border-b overflow-hidden"
        aria-label="Mosaico visual institucional"
      >
        <div className="ds-pad flex items-center justify-between gap-4 mb-8">
          <span className="eyebrow text-brand-wine">
            Identidade &amp; Prática Clínica / Estudo Visual
          </span>
          <span className="eyebrow text-brand-navy/70">[ CRFa 5-13805 — UnB ]</span>
        </div>

        <div ref={wallRef} className="ds-wall">
          <div className="ds-plane">
            {[0, 1, 2, 3].map((rowIndex) => (
              <div
                key={rowIndex}
                ref={(el) => {
                  rowRefs.current[rowIndex] = el;
                }}
                className="ds-wall-row"
              >
                {Array.from({ length: 7 }).map((_, colIndex) => {
                  const item =
                    WALL_ITEMS[(rowIndex * 3 + colIndex) % WALL_ITEMS.length];
                  return (
                    <div
                      key={colIndex}
                      className="ds-wall-shot"
                      style={{ background: item.bg }}
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.src}
                          alt={item.label}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full p-5 flex flex-col justify-between"
                          style={{ color: item.color }}
                        >
                          <span className="text-[9px] font-bold uppercase tracking-[0.18em] opacity-80">
                            {item.kicker}
                          </span>
                          <div>
                            <p className="archivo font-extrabold text-lg sm:text-xl leading-tight tracking-[-0.04em]">
                              {item.title}
                            </p>
                            <p className="text-[11px] opacity-80 mt-1 leading-snug">
                              {item.sub}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

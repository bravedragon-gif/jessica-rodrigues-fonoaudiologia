import React, { useEffect, useRef } from 'react';
import {
  MapPin,
  Video,
  ShieldCheck,
  Receipt,
  CheckCircle2,
  Building2,
  BookOpen,
  MessageCircle,
  Ear,
  Brain,
  Users,
  FileCheck,
} from 'lucide-react';
import { PROFESSIONAL_INFO } from '../data/siteContent';

interface ServicesProps {
  onOpenModal: (modal: 'tcle' | 'privacy') => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenModal }) => {
  const projRefs = useRef<(HTMLElement | null)[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const clinicalFocus = [
    {
      icon: <BookOpen className="w-5 h-5 text-brand-wine" />,
      title: 'Transtornos e Dificuldades de Aprendizagem',
      description:
        'Avaliação e intervenção focadas nos processos de leitura, escrita e matemática, incluindo acompanhamento especializado para crianças com Dislexia e desafios acadêmicos.',
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-brand-wine" />,
      title: 'Alterações de Fala',
      description:
        'Avaliação e intervenção focadas na aquisição dos sons da fala, articulação e precisão de fala em crianças e adultos.',
    },
    {
      icon: <Ear className="w-5 h-5 text-brand-wine" />,
      title: 'Reabilitação Auditiva (TPAC)',
      description:
        'Acompanhamento e treino de habilidades auditivas alteradas pelo Transtorno do Processamento Auditivo Central (TPAC).',
    },
    {
      icon: <Brain className="w-5 h-5 text-brand-wine" />,
      title: 'Estimulação Cognitiva e TEA',
      description:
        'Intervenção fonoaudiológica fundamentada em evidências para estimulação cognitiva, desenvolvimento da linguagem em crianças e adultos com Transtorno do Espectro Autista (TEA) e métodos terapêuticos complementares.',
    },
  ];

  const onlineServices = [
    {
      num: '01',
      title: 'Primeira Consulta (Anamnese)',
      desc: 'Escuta clínica inicial detalhada, levantamento de histórico de desenvolvimento, queixas escolares/familiares e direcionamento do plano de avaliação.',
    },
    {
      num: '02',
      title: 'Devolutivas Diagnósticas e Orientação',
      desc: 'Apresentação detalhada de resultados de avaliações, entrega de relatórios e orientações práticas para a família e equipe multidisciplinar/escolar.',
    },
    {
      num: '03',
      title: 'Mentorias Profissionais e Acadêmicas',
      desc: 'Supervisão de casos clínicos, discussão de protocolos de avaliação/intervenção e orientação acadêmica para fonoaudiólogos e estudantes de Fonoaudiologia.',
    },
  ];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sticky Stack Scale & Brightness + Results Clip-Path Filling (from Design System)
    let rafId = 0;
    const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
    const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));

    const onScrollFrame = () => {
      rafId = 0;
      if (reduced) return;
      const vh = window.innerHeight;

      const cards = projRefs.current.filter(Boolean) as HTMLElement[];
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const nextRect = cards[i + 1].getBoundingClientRect();
        const p = clamp((vh * 0.85 - nextRect.top) / Math.max(1, vh * 0.85 - 86));
        card.style.transform = `scale(${lerp(1, 0.94, p)})`;
        card.style.filter = `brightness(${lerp(1, 0.78, p)})`;
      });

      if (resultsRef.current) {
        const rr = resultsRef.current.getBoundingClientRect();
        const rp = clamp((vh - rr.top) / (vh + rr.height * 0.2));
        const inset = lerp(28, 0, clamp(rp * 2));
        const radius = lerp(28, 0, clamp(rp * 2));
        resultsRef.current.style.clipPath = `inset(${inset}px ${inset}px ${inset}px ${inset}px round ${radius}px)`;
      }
    };

    const requestFrame = () => {
      if (!rafId) rafId = requestAnimationFrame(onScrollFrame);
    };

    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame, { passive: true });
    requestFrame();

    // Results Number Counter Observer (from Design System)
    let counted = false;
    const goals = [4, 580, 100];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || counted) return;
          counted = true;
          obs.disconnect();

          countRefs.current.forEach((el, idx) => {
            if (!el) return;
            const goal = goals[idx];
            if (reduced) {
              el.textContent = String(goal);
              return;
            }
            let start: number | null = null;
            const tick = (ts: number) => {
              if (start === null) start = ts;
              const t = clamp((ts - start) / 1600);
              const ease = 1 - Math.pow(1 - t, 3);
              el.textContent = String(Math.round(ease * goal));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        });
      },
      { threshold: 0.25 }
    );

    if (resultsRef.current) {
      obs.observe(resultsRef.current);
    }

    return () => {
      window.removeEventListener('scroll', requestFrame);
      window.removeEventListener('resize', requestFrame);
      if (rafId) cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, []);

  return (
    <section id="atendimentos" className="pt-20 lg:pt-32 pb-12 bg-brand-cream ds-border-b">
      {/* Section Header (.section-head from Design System) */}
      <div className="ds-pad rv flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16">
        <div>
          <span className="eyebrow text-brand-wine">
            03 / Atendimentos e Modalidades
          </span>
          <h2 className="ds-section-h2 text-brand-navy mt-4">
            CUIDADO<br />
            <em className="text-brand-wine">especializado.</em>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-brand-navy/80 max-w-md leading-relaxed">
          Acompanhamento especializado, personalizado e baseado em evidências
          científicas — promovendo o desenvolvimento da linguagem, aprendizagem,
          audição e comunicação em espaço clínico estruturado na Asa Norte e por
          Telefonoaudiologia.
        </p>
      </div>

      {/* Sticky Stack Cards (.work-stack / .ds-proj from Design System) */}
      <div className="ds-pad">
        {/* Sticky Card 01: Atendimento Presencial • Asa Norte */}
        <article
          ref={(el) => {
            projRefs.current[0] = el;
          }}
          className="ds-proj bg-white border border-brand-navy/15 shadow-soft"
        >
          {/* Top Editorial Banner */}
          <div className="relative overflow-hidden bg-brand-wine text-white p-7 sm:p-10 border-b border-brand-navy/15">
            <img
              src="/brand/onda-1.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 w-80 opacity-15"
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-rose/40 bg-black/20 text-brand-rose text-[10px] font-extrabold uppercase tracking-[0.16em]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>01 / Modalidade Presencial • Asa Norte</span>
                </div>
                <h3 className="archivo font-extrabold uppercase tracking-[-0.025em] leading-[1.02] text-[clamp(28px,4vw,56px)] text-white">
                  PRESENCIAL — ASA NORTE
                </h3>
                <p className="text-sm sm:text-base text-brand-rose/95 max-w-2xl">
                  Parceria com o{' '}
                  <strong className="text-white">
                    {PROFESSIONAL_INFO.location.partner}
                  </strong>{' '}
                  — realizado em espaço estruturado, acessível e preparado para
                  avaliações e intervenções clínicas.
                </p>
              </div>

              {/* Location Box */}
              <div className="p-5 bg-brand-navy/90 border border-brand-rose/30 flex items-start gap-3.5 shrink-0 max-w-md">
                <div className="p-2.5 bg-brand-rose text-brand-navy shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-rose">
                    Localização Clínica
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                    {PROFESSIONAL_INFO.location.building}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    {PROFESSIONAL_INFO.location.area} • Em parceria com o{' '}
                    {PROFESSIONAL_INFO.location.partner}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Foco Clínico Presencial Grid */}
          <div className="p-7 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3">
              <h4 className="eyebrow text-brand-wine">
                Foco Clínico Presencial
              </h4>
              <span className="text-xs font-bold text-brand-navy/60">
                Agendamento com hora marcada
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalFocus.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 border border-brand-navy/15 bg-brand-cream/55 flex items-start gap-4"
                >
                  <div className="p-2.5 bg-white border border-brand-navy/15 shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-extrabold uppercase tracking-wide text-brand-navy">
                      {item.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-brand-navy/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Meta Footer (.proj-meta from Design System) */}
            <div className="pt-4 border-t border-brand-navy/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="ds-tag">Asa Norte — Brasília/DF</span>
                <span className="ds-tag">Golden Office Corporate</span>
                <span className="ds-tag">Instituto Monter</span>
              </div>
              <a href="#contato" className="ds-btn">
                <span>Solicitar Horário Presencial</span>
                <b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>
        </article>

        {/* Sticky Card 02: Atendimento On-line • Telefonoaudiologia */}
        <article
          ref={(el) => {
            projRefs.current[1] = el;
          }}
          className="ds-proj bg-brand-navy text-white border border-brand-rose/30 shadow-2xl"
        >
          <div className="relative overflow-hidden p-7 sm:p-10 border-b border-white/15 bg-gradient-to-r from-brand-navy via-[#1E2F52] to-brand-wine">
            <img
              src="/brand/malha-grafica.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-10"
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-brand-rose/40 bg-white/10 text-brand-rose text-[10px] font-extrabold uppercase tracking-[0.16em]">
                  <Video className="w-3.5 h-3.5" />
                  <span>
                    02 / Modalidade On-line • Telefonoaudiologia (
                    {PROFESSIONAL_INFO.cffaResolution})
                  </span>
                </div>
                <h3 className="archivo font-extrabold uppercase tracking-[-0.025em] leading-[1.02] text-[clamp(28px,4vw,56px)] text-white">
                  TELEFONOAUDIOLOGIA
                </h3>
                <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
                  Consultas e Mentorias a Distância com Sigilo e Segurança — em
                  estrita conformidade com as normas da{' '}
                  <strong className="text-brand-rose">
                    {PROFESSIONAL_INFO.cffaResolution}
                  </strong>
                  , garantindo canal seguro para videoconferência, sigilo
                  profissional, segurança de dados e aplicação do Termo de
                  Consentimento Livre e Esclarecido (TCLE).
                </p>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-3 border border-brand-rose/35 bg-brand-navy/80 text-xs font-bold text-brand-rose shrink-0">
                <Users className="w-4 h-4" />
                <span>Para pacientes, famílias e profissionais</span>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-10 space-y-8">
            <div className="space-y-4">
              <h4 className="eyebrow text-brand-rose">
                Serviços Realizados na Modalidade On-line
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {onlineServices.map((srv) => (
                  <div
                    key={srv.num}
                    className="p-5 border border-white/15 bg-white/5 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-brand-rose">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-widest">
                          {srv.num} / 03
                        </span>
                      </div>
                      <h5 className="text-base font-extrabold text-white">
                        {srv.title}
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* TCLE & Privacy Compliance Bar */}
            <div className="p-6 border border-brand-rose/35 bg-brand-wine/85 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-3.5">
                <ShieldCheck className="w-6 h-6 text-brand-rose shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-extrabold uppercase tracking-wider text-white">
                    Termo de Consentimento (TCLE) e Privacidade Transparente
                  </p>
                  <p className="text-xs sm:text-sm text-white/85">
                    Consulte e registre seu aceite no Termo de Consentimento
                    Livre e Esclarecido para atendimento a distância antes da
                    sua sessão on-line.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenModal('tcle')}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-brand-cream text-brand-navy text-xs font-extrabold uppercase tracking-[0.12em] hover:bg-brand-rose transition-colors"
                >
                  <FileCheck className="w-4 h-4 text-brand-wine" />
                  <span>Abrir e Aceitar TCLE On-line</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenModal('privacy')}
                  className="inline-flex items-center gap-2 px-4 py-3 border border-white/30 bg-white/10 text-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-white/20 transition-colors"
                >
                  <span>Política de Privacidade (LGPD)</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="ds-tag !border-white/20 text-brand-rose">
                  Anamnese On-line
                </span>
                <span className="ds-tag !border-white/20 text-brand-rose">
                  Devolutivas
                </span>
                <span className="ds-tag !border-white/20 text-brand-rose">
                  Mentorias Acadêmicas &amp; Clínicas
                </span>
              </div>
              <a
                href="#contato"
                className="ds-btn bg-brand-rose text-brand-navy hover:bg-white"
              >
                <span>Agendar Atendimento On-line</span>
                <b
                  aria-hidden="true"
                  className="!bg-brand-navy !text-brand-cream"
                >
                  ↗
                </b>
              </a>
            </div>
          </div>
        </article>

        {/* Sticky Card 03: Informações Práticas • Particular & Reembolso */}
        <article
          ref={(el) => {
            projRefs.current[2] = el;
          }}
          className="ds-proj bg-white border border-brand-navy/15 shadow-soft p-7 sm:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <span className="eyebrow text-brand-wine">
                03 / Informações Práticas
              </span>
              <h3 className="archivo font-black uppercase tracking-[-0.05em] leading-[0.95] text-3xl sm:text-4xl text-brand-navy">
                MODALIDADE &amp; REEMBOLSO NO PLANO DE SAÚDE
              </h3>
              <p className="text-xs sm:text-sm text-brand-navy/75 leading-relaxed">
                Transparência administrativa e documentação completa para
                solicitação de reembolso.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 border border-brand-navy/15 bg-brand-cream/65 flex items-start gap-4 h-full">
              <CheckCircle2 className="w-6 h-6 text-brand-wine shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-brand-navy">
                  Modalidade Particular
                </h4>
                <p className="text-xs sm:text-sm text-brand-navy/80 leading-relaxed">
                  Atendimentos particulares individualizados, com tempo e
                  planejamento dedicados às necessidades de cada paciente.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 border border-brand-navy/15 bg-brand-cream/65 flex items-start gap-4 h-full">
              <Receipt className="w-6 h-6 text-brand-wine shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-brand-navy">
                  Recibo / Nota Fiscal para Reembolso
                </h4>
                <p className="text-xs sm:text-sm text-brand-navy/80 leading-relaxed">
                  Emitimos recibo/nota fiscal profissional com todos os dados
                  necessários para solicitação de reembolso junto ao seu plano
                  de saúde.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* 04 / Results Filling Section (from Design System .results) */}
      <div
        ref={resultsRef}
        className="mt-8 bg-brand-blue text-white py-20 lg:py-32 ds-pad relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #243D5B 0%, #16223F 52%, #58203A 100%)',
          clipPath: 'inset(28px 28px 28px 28px round 28px)',
        }}
      >
        <img
          src="/brand/onda-1.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 w-96 opacity-10"
        />
        <div className="relative z-10">
          <span className="eyebrow text-brand-rose">
            04 / Compromisso Clínico &amp; Científico
          </span>
          <h2 className="ds-section-h2 text-white mt-4 mb-16">
            MAIS QUE<br />
            <em className="text-brand-rose">técnica.</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-white/35 pt-6">
              <div className="archivo font-extrabold text-[clamp(56px,8vw,125px)] leading-none tracking-[-0.08em] text-brand-rose">
                <span>0</span>
                <span
                  ref={(el) => {
                    countRefs.current[0] = el;
                  }}
                >
                  4
                </span>
              </div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white mt-4">
                Eixos Principais de Especialidade
              </p>
              <p className="text-xs text-white/75 mt-1">
                Fala, Aprendizagem (Dislexia), Estimulação Cognitiva/TEA e
                Reabilitação Auditiva (TPAC)
              </p>
            </div>

            <div className="border-t border-white/35 pt-6">
              <div className="archivo font-extrabold text-[clamp(56px,8vw,125px)] leading-none tracking-[-0.08em] text-white">
                <span
                  ref={(el) => {
                    countRefs.current[1] = el;
                  }}
                >
                  580
                </span>
                <span className="text-brand-rose text-[0.5em] ml-1">/2020</span>
              </div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white mt-4">
                Resolução CFFa Telefonoaudiologia
              </p>
              <p className="text-xs text-white/75 mt-1">
                Conformidade ética, sigilo profissional, LGPD e Termo de
                Consentimento (TCLE)
              </p>
            </div>

            <div className="border-t border-white/35 pt-6">
              <div className="archivo font-extrabold text-[clamp(56px,8vw,125px)] leading-none tracking-[-0.08em] text-brand-rose">
                <span
                  ref={(el) => {
                    countRefs.current[2] = el;
                  }}
                >
                  100
                </span>
                <span>%</span>
              </div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white mt-4">
                Prática Baseada em Evidências
              </p>
              <p className="text-xs text-white/75 mt-1">
                Mestrado em Ciências da Reabilitação (UnB), docência superior e
                cuidado individualizado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

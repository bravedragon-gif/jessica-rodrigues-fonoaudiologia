import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { ARTICLES_DATA, PROFESSIONAL_INFO } from '../data/siteContent';

export const Articles: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleArticle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="artigos"
      className="py-20 lg:py-32 ds-pad ds-border-b bg-brand-cream"
    >
      {/* Editorial Section Header */}
      <div className="rv flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 ds-border-b">
        <div className="space-y-3">
          <span className="eyebrow text-brand-wine">
            05 / Artigos e Notícias
          </span>
          <h2 className="ds-section-h2 text-brand-navy">
            CONTEÚDO<br />
            <em className="text-brand-wine">científico.</em>
          </h2>
        </div>

        <div className="space-y-5 max-w-md">
          <p className="text-sm sm:text-base text-brand-navy/80 leading-relaxed">
            Conteúdo informativo baseado em evidências científicas — orientações
            sobre fala, leitura, escrita, processamento auditivo central (TPAC)
            e desenvolvimento cognitivo.
          </p>

          <a
            href={PROFESSIONAL_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-btn-outline border-brand-navy text-brand-navy hover:bg-brand-wine hover:text-brand-cream hover:border-brand-wine"
          >
            <span className="inline-flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-brand-wine" />
              Acompanhar em {PROFESSIONAL_INFO.instagramHandle}
            </span>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </div>

      {/* Editorial Articles Grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {ARTICLES_DATA.map((article, idx) => {
          const isExpanded = expandedId === article.id;
          return (
            <article
              key={article.id}
              className="rv border border-brand-navy/15 bg-white p-7 sm:p-8 flex flex-col justify-between transition-colors hover:border-brand-wine"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-brand-navy/10">
                  <span className="ds-tag text-brand-wine border-brand-wine/30 bg-brand-rose/20">
                    {article.category}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-navy/60">
                    0{idx + 1} • {article.readTime}
                  </span>
                </div>

                <h3 className="archivo font-extrabold text-xl sm:text-2xl tracking-[-0.03em] leading-[1.15] text-brand-navy">
                  {article.title}
                </h3>

                <p className="text-sm text-brand-navy/80 leading-[1.75]">
                  {article.excerpt}
                </p>

                {isExpanded && (
                  <div className="pt-4 border-t border-brand-navy/15 space-y-3 text-sm text-brand-navy/90 leading-[1.8] whitespace-pre-line bg-brand-cream/40 p-4">
                    {article.content}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-brand-navy/15 flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy/65 inline-flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-wine" />
                  {article.date}
                </span>

                <button
                  type="button"
                  onClick={() => toggleArticle(article.id)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.13em] text-brand-wine hover:text-brand-navy transition-colors"
                >
                  <span>
                    {isExpanded ? 'Recolher leitura' : 'Ler artigo completo'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { PROFESSIONAL_INFO } from '../../data/siteContent';

interface LegalModalsProps {
  activeModal: 'tcle' | 'privacy' | null;
  onClose: () => void;
  onAcceptTcle?: () => void;
  tcleAccepted?: boolean;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  activeModal,
  onClose,
  onAcceptTcle,
  tcleAccepted,
}) => {
  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white shadow-2xl border border-brand-navy/25 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-brand-navy text-white px-6 py-5 flex items-center justify-between border-b border-brand-rose/25">
          <div className="flex items-center gap-3">
            {activeModal === 'tcle' ? (
              <ShieldCheck className="w-6 h-6 text-brand-rose shrink-0" />
            ) : (
              <Lock className="w-6 h-6 text-brand-rose shrink-0" />
            )}
            <div>
              <span className="eyebrow text-brand-rose block">
                {activeModal === 'tcle'
                  ? PROFESSIONAL_INFO.cffaResolution
                  : 'Lei nº 13.709/2018 (LGPD)'}
              </span>
              <h3 className="archivo text-lg sm:text-xl font-extrabold tracking-[-0.02em] leading-snug mt-0.5">
                {activeModal === 'tcle'
                  ? 'Termo de Consentimento Livre e Esclarecido (TCLE)'
                  : 'Política de Privacidade e Proteção de Dados (LGPD)'}
              </h3>
              <p className="text-xs text-white/80 mt-0.5">
                {PROFESSIONAL_INFO.name} • {PROFESSIONAL_INFO.crfa}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[68vh] overflow-y-auto space-y-4 text-sm text-brand-navy/90 leading-relaxed">
          {activeModal === 'tcle' ? (
            <>
              <div className="p-4 bg-brand-cream border border-brand-navy/15 border-l-4 border-l-brand-wine flex items-start gap-3">
                <FileText className="w-5 h-5 text-brand-wine shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-brand-wine uppercase text-xs tracking-wider">
                    Atendimento a Distância (Telefonoaudiologia) —{' '}
                    {PROFESSIONAL_INFO.cffaResolution}
                  </p>
                  <p className="text-xs text-brand-navy/80 mt-1">
                    Este termo esclarece as condições éticas, técnicas e de
                    segurança para realização de consultas de anamnese,
                    devolutivas e mentorias na modalidade on-line.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold uppercase text-xs tracking-wider text-brand-navy">
                  1. Objetivo e Modalidades
                </h4>
                <p>
                  A Telefonoaudiologia é regulamentada pelo Conselho Federal de
                  Fonoaudiologia ({PROFESSIONAL_INFO.cffaResolution}) e
                  destina-se, na prática clínica da {PROFESSIONAL_INFO.name} (
                  {PROFESSIONAL_INFO.crfa}), à realização de{' '}
                  <strong>
                    consultas iniciais de anamnese, devolutivas diagnósticas e
                    mentorias profissionais/acadêmicas
                  </strong>
                  .
                </p>

                <h4 className="font-extrabold uppercase text-xs tracking-wider text-brand-navy">
                  2. Sigilo Profissional e Segurança do Canal
                </h4>
                <p>
                  As sessões virtuais são conduzidas por meio de canal seguro de
                  videoconferência com criptografia, garantindo o sigilo
                  profissional previsto no Código de Ética da Fonoaudiologia e
                  na Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
                  É vedada a gravação de áudio ou imagem da sessão sem
                  autorização expressa de ambas as partes.
                </p>

                <h4 className="font-extrabold uppercase text-xs tracking-wider text-brand-navy">
                  3. Recomendações Técnicas e Limitações
                </h4>
                <p>
                  Para a adequada qualidade da consulta on-line, recomenda-se
                  que o paciente ou responsável legal esteja em ambiente
                  silencioso, reservado e com conexão estável à internet. Caso a
                  avaliação presencial seja indispensável para testes clínicos
                  específicos (como protocolos presenciais de fala, linguagem ou
                  processamento auditivo), a fonoaudióloga fará a devida
                  orientação e encaminhamento para o atendimento presencial na
                  Asa Norte.
                </p>

                <h4 className="font-extrabold uppercase text-xs tracking-wider text-brand-navy">
                  4. Autonomia e Revogação
                </h4>
                <p>
                  O paciente ou responsável legal tem plena liberdade para
                  esclarecer dúvidas a qualquer momento e revogar este
                  consentimento sem qualquer prejuízo ao seu acompanhamento.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-brand-cream border border-brand-navy/15 border-l-4 border-l-brand-wine flex items-start gap-3">
                <Lock className="w-5 h-5 text-brand-wine shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-brand-wine uppercase text-xs tracking-wider">
                    Transparência e Proteção de Dados Pessoais (LGPD — Lei nº
                    13.709/2018)
                  </p>
                  <p className="text-xs text-brand-navy/80 mt-1">
                    Compromisso ético com a privacidade e segurança das
                    informações fornecidas pelos pacientes e responsáveis
                    legais.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold uppercase text-xs tracking-wider text-brand-navy">
                  1. Coleta Mínima de Dados no Pré-Agendamento
                </h4>
                <p>
                  O formulário deste site funciona exclusivamente como um
                  facilitador para estruturar sua mensagem inicial via WhatsApp.
                  Não armazenamos seus dados clínicos em bancos de dados
                  externos ao enviar o formulário: as informações preenchidas
                  são formatadas diretamente no seu dispositivo para envio
                  voluntário ao canal oficial de atendimento.
                </p>

                <h4 className="font-extrabold uppercase text-xs tracking-wider text-brand-navy">
                  2. Orientação sobre Dados Sensíveis
                </h4>
                <p>
                  Para sua proteção e segurança, orientamos que o campo de
                  descrição da demanda seja utilizado apenas para um{' '}
                  <strong>breve resumo</strong> da sua necessidade ou dúvida.
                  Laudos médicos, exames audiológicos e históricos clínicos
                  detalhados serão avaliados diretamente durante a consulta, em
                  ambiente protegido pelo sigilo fonoaudiológico.
                </p>

                <h4 className="font-extrabold uppercase text-xs tracking-wider text-brand-navy">
                  3. Finalidade do Tratamento
                </h4>
                <p>
                  Os dados de identificação e contato (nome, idade, responsável
                  legal e telefone) são utilizados estritamente para retorno de
                  contato, agendamento de consultas, emissão de recibo/nota
                  fiscal para reembolso e comunicação direta com a fonoaudióloga{' '}
                  {PROFESSIONAL_INFO.name} ({PROFESSIONAL_INFO.crfa}).
                </p>

                <h4 className="font-extrabold uppercase text-xs tracking-wider text-brand-navy">
                  4. Direitos do Titular
                </h4>
                <p>
                  A qualquer momento, o titular dos dados ou seu responsável
                  legal pode solicitar informações, atualização ou exclusão de
                  seus dados de contato por meio do canal oficial de atendimento
                  no WhatsApp ({PROFESSIONAL_INFO.whatsappDisplay}).
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-brand-cream px-6 py-4 border-t border-brand-navy/15 flex flex-wrap items-center justify-between gap-3">
          {activeModal === 'tcle' && onAcceptTcle ? (
            <button
              type="button"
              onClick={() => {
                onAcceptTcle();
                onClose();
              }}
              className="ds-btn"
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {tcleAccepted
                  ? 'Termo de Consentimento já aceito'
                  : 'Li e concordo com o Termo (TCLE)'}
              </span>
              <b aria-hidden="true">✓</b>
            </button>
          ) : (
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-navy/70">
              Em conformidade com a LGPD e Resolução CFFa nº 580/2020
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 border border-brand-navy/25 text-brand-navy font-bold text-xs uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-colors ml-auto"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

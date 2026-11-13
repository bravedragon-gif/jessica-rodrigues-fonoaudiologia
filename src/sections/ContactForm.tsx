import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Phone,
  MapPin,
  FileText,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { PROFESSIONAL_INFO } from '../data/siteContent';

interface ContactFormProps {
  onOpenModal: (modal: 'tcle' | 'privacy') => void;
  tcleAccepted: boolean;
  onToggleTcle: (val: boolean) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onOpenModal,
  tcleAccepted,
  onToggleTcle,
}) => {
  const [patientName, setPatientName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  const [legalGuardian, setLegalGuardian] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [modality, setModality] = useState<
    'Presencial (Asa Norte)' | 'On-line (Telefonoaudiologia)'
  >('Presencial (Asa Norte)');
  const [demandSummary, setDemandSummary] = useState('');
  const [hasReferral, setHasReferral] = useState<'Não' | 'Sim'>('Não');
  const [referralDetails, setReferralDetails] = useState('');
  const [hasDiagnosis, setHasDiagnosis] = useState<'Não' | 'Sim'>('Não');
  const [diagnosisDetails, setDiagnosisDetails] = useState('');
  const [paymentModality, setPaymentModality] = useState<
    'Particular' | 'Particular com recibo/nota fiscal para reembolso'
  >('Particular com recibo/nota fiscal para reembolso');
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleBirthDateChange = (val: string) => {
    setBirthDate(val);
    if (val) {
      const birth = new Date(val);
      const today = new Date();
      if (!isNaN(birth.getTime())) {
        let years = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          years--;
        }
        if (years >= 0 && years < 120) {
          setAge(`${years} anos`);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lgpdConsent) return;

    const formattedBirth = birthDate
      ? birthDate.split('-').reverse().join('/')
      : 'Não informada';

    const messageLines = [
      `Olá, *${PROFESSIONAL_INFO.name}*! Gostaria de solicitar agendamento / informações sobre atendimento fonoaudiológico.`,
      ``,
      `*1. IDENTIFICAÇÃO BÁSICA DO PACIENTE*`,
      `• *Nome do(a) paciente:* ${patientName}`,
      `• *Data de nascimento:* ${formattedBirth} (${
        age || 'Idade não informada'
      })`,
      `• *Responsável legal:* ${legalGuardian || 'O próprio paciente'}`,
      `• *Telefone/WhatsApp:* ${contactPhone}`,
      contactEmail ? `• *E-mail:* ${contactEmail}` : null,
      ``,
      `*2. MODALIDADE E DEMANDA*`,
      `• *Modalidade de atendimento:* ${modality}`,
      `• *Breve descrição da demanda:* ${demandSummary}`,
      `• *Possui indicação/encaminhamento de outro profissional?* ${hasReferral}${
        hasReferral === 'Sim' && referralDetails ? ` (${referralDetails})` : ''
      }`,
      `• *Possui diagnóstico estabelecido?* ${hasDiagnosis}${
        hasDiagnosis === 'Sim' && diagnosisDetails
          ? ` (${diagnosisDetails})`
          : ''
      }`,
      ``,
      `*3. MODALIDADE DE PAGAMENTO PRETENDIDA*`,
      `• ${paymentModality}`,
      ``,
      `*4. CONSENTIMENTO E TERMOS*`,
      `• *Consentimento LGPD:* Aceito em fornecer os dados para contato e agendamento conforme a Política de Privacidade.`,
      modality === 'On-line (Telefonoaudiologia)' || tcleAccepted
        ? `• *Termo Telefonoaudiologia (CFFa nº 580/2020):* Aceito.`
        : null,
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/${
      PROFESSIONAL_INFO.whatsappNumber
    }?text=${encodeURIComponent(messageLines.join('\n'))}`;

    setSubmittedSuccess(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const inputClass =
    'w-full px-4 py-3 border border-brand-navy/25 bg-brand-cream/40 text-sm text-brand-navy placeholder:text-brand-navy/45 focus:outline-none focus:border-brand-wine focus:bg-white transition-colors';

  return (
    <section
      id="contato"
      className="py-20 lg:py-32 ds-pad bg-brand-navy text-white relative overflow-hidden"
    >
      <img
        src="/brand/malha-grafica.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-5"
      />

      <div className="relative z-10 space-y-16">
        {/* Monumental Contact Header (from Design System .contact-heading) */}
        <div className="rv border-b border-white/15 pb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="eyebrow text-brand-rose">
              06 / Como Entrar em Contato — Agendamento &amp; Orientação
            </span>
            <h2 className="archivo font-black uppercase tracking-[-0.075em] leading-[0.86] text-[clamp(48px,9vw,148px)] text-white">
              COMUNICAR BEM
              <br />
              <em className="serif-accent font-normal text-brand-rose lowercase tracking-[-0.04em]">
                é viver bem.
              </em>
            </h2>
          </div>

          <div className="space-y-4 max-w-md">
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Para agilizar seu atendimento presencial na Asa Norte ou sua
              consulta on-line (Telefonoaudiologia), preencha o formulário de
              pré-agendamento abaixo ou fale diretamente pelo WhatsApp oficial.
            </p>
            <a
              href={`https://wa.me/${PROFESSIONAL_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block archivo font-extrabold text-xl sm:text-3xl tracking-[-0.04em] text-brand-rose border-b border-brand-rose pb-1 hover:text-white hover:border-white transition-colors"
            >
              WHATSAPP: {PROFESSIONAL_INFO.whatsappDisplay} ↗
            </a>
          </div>
        </div>

        {/* Main Grid: Direct Channels (Left) + Complete Pre-Scheduling Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Channels & Location */}
          <div className="rv lg:col-span-5 space-y-6">
            <div className="border border-white/20 bg-white/5 backdrop-blur-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3.5 pb-5 border-b border-white/15">
                <img
                  src="/brand/icone.svg"
                  alt=""
                  className="w-9 h-9 object-contain brightness-0 invert"
                />
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">
                    {PROFESSIONAL_INFO.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-rose">
                    {PROFESSIONAL_INFO.role} • {PROFESSIONAL_INFO.crfa}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-sm">
                <a
                  href={`https://wa.me/${PROFESSIONAL_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-white/15 bg-white/5 hover:bg-brand-wine/80 hover:border-brand-rose/40 transition-colors"
                >
                  <div className="p-2.5 bg-brand-rose text-brand-navy shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-rose font-bold uppercase tracking-[0.14em]">
                      WhatsApp Oficial
                    </p>
                    <p className="text-base font-extrabold text-white">
                      {PROFESSIONAL_INFO.whatsappDisplay}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto text-brand-rose" />
                </a>

                <a
                  href={PROFESSIONAL_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-white/15 bg-white/5 hover:bg-brand-wine/80 hover:border-brand-rose/40 transition-colors"
                >
                  <div className="p-2.5 bg-brand-rose text-brand-navy shrink-0">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-rose font-bold uppercase tracking-[0.14em]">
                      Instagram Profissional
                    </p>
                    <p className="text-base font-extrabold text-white">
                      {PROFESSIONAL_INFO.instagramHandle}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto text-brand-rose" />
                </a>

                <div className="flex items-start gap-4 p-4 border border-white/15 bg-white/5">
                  <div className="p-2.5 bg-white/10 text-brand-rose shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-rose font-bold uppercase tracking-[0.14em]">
                      Atendimento Presencial
                    </p>
                    <p className="text-sm font-extrabold text-white mt-0.5">
                      {PROFESSIONAL_INFO.location.building}
                    </p>
                    <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
                      {PROFESSIONAL_INFO.location.area} • Em parceria com o{' '}
                      {PROFESSIONAL_INFO.location.partner}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onOpenModal('tcle')}
                  className="text-xs font-bold uppercase tracking-wider text-brand-rose hover:text-white underline inline-flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>Ver Termo Telefonoaudiologia (TCLE)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenModal('privacy')}
                  className="text-xs font-bold uppercase tracking-wider text-white/75 hover:text-brand-rose underline text-left"
                >
                  Política LGPD
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Pre-Scheduling Form */}
          <div className="rv lg:col-span-7">
            <div className="bg-white text-brand-navy border border-brand-rose/40 p-6 sm:p-10 shadow-2xl">
              {submittedSuccess && (
                <div
                  role="status"
                  className="mb-7 p-5 border-l-4 border-l-emerald-600 bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2"
                >
                  <div className="flex items-center gap-2.5 font-extrabold text-emerald-900 uppercase text-xs tracking-wider">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Mensagem de Confirmação Automatizada</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-emerald-900/90">
                    Recebemos o preenchimento dos seus dados! O WhatsApp oficial
                    da{' '}
                    <strong>
                      {PROFESSIONAL_INFO.name} (
                      {PROFESSIONAL_INFO.whatsappDisplay})
                    </strong>{' '}
                    foi aberto com o resumo estruturado da sua solicitação. Caso
                    a janela não tenha aberto automaticamente, basta clicar
                    novamente no botão de envio abaixo. Retornaremos o mais
                    breve possível para agendamento e esclarecimentos!
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-brand-navy/15 pb-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="eyebrow text-brand-wine">
                      Pré-Agendamento Estruturado
                    </span>
                    <h3 className="archivo font-extrabold text-2xl sm:text-3xl tracking-[-0.04em] text-brand-navy mt-1">
                      FORMULÁRIO DE PRÉ-AGENDAMENTO E CONTATO
                    </h3>
                    <p className="text-xs text-brand-navy/70 mt-1">
                      Todos os dados são enviados diretamente para o WhatsApp da
                      fonoaudióloga.
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-brand-wine shrink-0" />
                </div>

                {/* 1. Identificação Básica do Paciente */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="patientName"
                      className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy mb-1.5"
                    >
                      Identificação básica do paciente (Nome completo) *
                    </label>
                    <input
                      id="patientName"
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Ex.: Maria Clara Rodrigues"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="birthDate"
                      className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy mb-1.5"
                    >
                      Data de nascimento *
                    </label>
                    <input
                      id="birthDate"
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => handleBirthDateChange(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="age"
                      className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy mb-1.5"
                    >
                      Idade *
                    </label>
                    <input
                      id="age"
                      type="text"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Ex.: 8 anos"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="legalGuardian"
                      className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy mb-1.5"
                    >
                      Responsável legal (se menor ou aplicável)
                    </label>
                    <input
                      id="legalGuardian"
                      type="text"
                      value={legalGuardian}
                      onChange={(e) => setLegalGuardian(e.target.value)}
                      placeholder="Nome do responsável (ou próprio paciente)"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactPhone"
                      className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy mb-1.5"
                    >
                      Dados de contato (Telefone / WhatsApp) *
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="(61) 99999-9999"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactEmail"
                      className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy mb-1.5"
                    >
                      E-mail (opcional)
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="modality"
                      className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy mb-1.5"
                    >
                      Modalidade de Atendimento *
                    </label>
                    <select
                      id="modality"
                      value={modality}
                      onChange={(e) =>
                        setModality(
                          e.target.value as
                            | 'Presencial (Asa Norte)'
                            | 'On-line (Telefonoaudiologia)'
                        )
                      }
                      className={inputClass}
                    >
                      <option value="Presencial (Asa Norte)">
                        Presencial — Asa Norte (Golden Office Corporate)
                      </option>
                      <option value="On-line (Telefonoaudiologia)">
                        On-line — Telefonoaudiologia (Anamnese, Devolutiva ou
                        Mentoria)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Sensitive Data Orientation + Demand Description */}
                <div className="space-y-3">
                  <div className="p-4 bg-brand-cream border border-brand-navy/15 border-l-4 border-l-brand-wine flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-brand-wine shrink-0 mt-0.5" />
                    <p className="text-xs text-brand-navy/90 leading-relaxed">
                      <strong>Orientações sobre dados sensíveis:</strong> Para
                      sua segurança, utilize este espaço apenas para um breve
                      resumo da sua dúvida ou necessidade. Informações clínicas
                      detalhadas e laudos serão avaliados diretamente durante a
                      consulta.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="demandSummary"
                      className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy mb-1.5"
                    >
                      Breve descrição da demanda *
                    </label>
                    <textarea
                      id="demandSummary"
                      rows={3}
                      required
                      value={demandSummary}
                      onChange={(e) => setDemandSummary(e.target.value)}
                      placeholder="Descreva brevemente o motivo do contato (ex.: avaliação de leitura/escrita, fala, processamento auditivo, mentoria...)"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Referral & Diagnosis Questions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-brand-navy/15 bg-brand-cream/35 space-y-2.5">
                    <label className="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-navy">
                      Possui indicação/encaminhamento de outro profissional? *
                    </label>
                    <div className="flex items-center gap-5 text-sm font-semibold text-brand-navy">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasReferral"
                          checked={hasReferral === 'Sim'}
                          onChange={() => setHasReferral('Sim')}
                          className="accent-brand-wine"
                        />
                        <span>Sim</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasReferral"
                          checked={hasReferral === 'Não'}
                          onChange={() => setHasReferral('Não')}
                          className="accent-brand-wine"
                        />
                        <span>Não</span>
                      </label>
                    </div>
                    {hasReferral === 'Sim' && (
                      <input
                        type="text"
                        value={referralDetails}
                        onChange={(e) => setReferralDetails(e.target.value)}
                        placeholder="Qual especialidade/escola encaminhou?"
                        className="w-full mt-2 px-3 py-2 border border-brand-navy/25 bg-white text-xs text-brand-navy focus:outline-none focus:border-brand-wine"
                      />
                    )}
                  </div>

                  <div className="p-4 border border-brand-navy/15 bg-brand-cream/35 space-y-2.5">
                    <label className="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-navy">
                      Possui diagnóstico estabelecido? *
                    </label>
                    <div className="flex items-center gap-5 text-sm font-semibold text-brand-navy">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasDiagnosis"
                          checked={hasDiagnosis === 'Sim'}
                          onChange={() => setHasDiagnosis('Sim')}
                          className="accent-brand-wine"
                        />
                        <span>Sim</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasDiagnosis"
                          checked={hasDiagnosis === 'Não'}
                          onChange={() => setHasDiagnosis('Não')}
                          className="accent-brand-wine"
                        />
                        <span>Não / Em investigação</span>
                      </label>
                    </div>
                    {hasDiagnosis === 'Sim' && (
                      <input
                        type="text"
                        value={diagnosisDetails}
                        onChange={(e) => setDiagnosisDetails(e.target.value)}
                        placeholder="Informe brevemente (ex.: TEA, Dislexia, TPAC...)"
                        className="w-full mt-2 px-3 py-2 border border-brand-navy/25 bg-white text-xs text-brand-navy focus:outline-none focus:border-brand-wine"
                      />
                    )}
                  </div>
                </div>

                {/* Payment Modality */}
                <div className="p-4 border border-brand-navy/15 bg-brand-cream/40 space-y-2.5">
                  <label className="block text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy">
                    Modalidade de pagamento pretendida *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label
                      className={`flex items-center gap-2.5 p-3 border text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                        paymentModality === 'Particular'
                          ? 'bg-brand-wine text-white border-brand-wine'
                          : 'bg-white text-brand-navy border-brand-navy/20 hover:bg-brand-cream'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentModality"
                        checked={paymentModality === 'Particular'}
                        onChange={() => setPaymentModality('Particular')}
                        className="sr-only"
                      />
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Particular</span>
                    </label>

                    <label
                      className={`flex items-center gap-2.5 p-3 border text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                        paymentModality ===
                        'Particular com recibo/nota fiscal para reembolso'
                          ? 'bg-brand-wine text-white border-brand-wine'
                          : 'bg-white text-brand-navy border-brand-navy/20 hover:bg-brand-cream'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentModality"
                        checked={
                          paymentModality ===
                          'Particular com recibo/nota fiscal para reembolso'
                        }
                        onChange={() =>
                          setPaymentModality(
                            'Particular com recibo/nota fiscal para reembolso'
                          )
                        }
                        className="sr-only"
                      />
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Particular com recibo para reembolso</span>
                    </label>
                  </div>
                </div>

                {/* Consent Checkboxes (LGPD + TCLE Telefonoaudiologia) */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 p-3.5 border border-brand-navy/15 bg-brand-cream/50 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={lgpdConsent}
                      onChange={(e) => setLgpdConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-brand-wine shrink-0"
                    />
                    <span className="text-xs text-brand-navy/90 leading-relaxed">
                      <strong>Consentimento ativo (LGPD):</strong> Concordo em
                      fornecer meus dados para que a fonoaudióloga entre em
                      contato para agendamento e esclarecimentos, conforme a{' '}
                      <button
                        type="button"
                        onClick={() => onOpenModal('privacy')}
                        className="font-bold text-brand-wine underline hover:text-brand-navy"
                      >
                        Política de Privacidade
                      </button>
                      . *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 border border-brand-navy/15 bg-brand-cream/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tcleAccepted}
                      onChange={(e) => onToggleTcle(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-brand-wine shrink-0"
                    />
                    <span className="text-xs text-brand-navy/85 leading-relaxed">
                      <strong>
                        Telefonoaudiologia ({PROFESSIONAL_INFO.cffaResolution}):
                      </strong>{' '}
                      Caso opte por consulta inicial de anamnese, devolutiva ou
                      mentoria on-line, declaro ciência e aceite do{' '}
                      <button
                        type="button"
                        onClick={() => onOpenModal('tcle')}
                        className="font-bold text-brand-wine underline hover:text-brand-navy"
                      >
                        Termo de Consentimento Livre e Esclarecido (TCLE) para
                        Atendimento a Distância
                      </button>
                      .
                    </span>
                  </label>
                </div>

                {/* Editorial Submit Button (.ds-btn) */}
                <button type="submit" className="ds-btn w-full">
                  <span>Enviar Solicitação via WhatsApp</span>
                  <b aria-hidden="true">↗</b>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

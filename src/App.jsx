import { useState, useCallback, useMemo } from 'react';
import { SECTIONS, getVisibleSections } from './data/formSchema';
import { useFormState } from './hooks/useFormState';
import Sidebar from './components/Sidebar';
import FormSection from './components/FormSection';
import SuccessModal from './components/SuccessModal';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formData,
    errors,
    handleChange,
    handleCheckboxChange,
    handleFileChange,
    validateSection,
    getSectionCompletion,
    resetForm,
  } = useFormState();

  // Compute visible sections based on selected services
  const visibleSections = useMemo(() => {
    const selected = formData.servicesRequired || [];
    return getVisibleSections(selected);
  }, [formData.servicesRequired]);

  const safeCurrentSection = Math.min(currentSection, visibleSections.length - 1);
  const section = visibleSections[safeCurrentSection];

  const handleSectionClick = useCallback((index) => {
    if (index < visibleSections.length) {
      setCurrentSection(index);
    }
  }, [visibleSections.length]);

  const goNext = useCallback(() => {
    if (validateSection(section)) {
      if (safeCurrentSection < visibleSections.length - 1) {
        setCurrentSection(safeCurrentSection + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [safeCurrentSection, section, validateSection, visibleSections.length]);

  const goPrev = useCallback(() => {
    if (safeCurrentSection > 0) {
      setCurrentSection(safeCurrentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [safeCurrentSection]);

  const handleSubmit = useCallback(async () => {
    if (!validateSection(section)) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const payload = {};
    visibleSections.forEach((s) => {
      s.fields.forEach((field) => {
        const value = formData[field.id];
        payload[field.id] = field.type === 'file' && value ? value.name : value;
      });
    });
    console.log('Form submitted:', payload);

    setIsSubmitting(false);
    setIsSubmitted(true);
  }, [formData, section, validateSection, visibleSections]);

  const handleReset = useCallback(() => {
    resetForm();
    setCurrentSection(0);
    setIsSubmitted(false);
  }, [resetForm]);

  // Compute progress based on visible sections only
  const filledCount = useMemo(() => {
    return visibleSections.reduce((acc, sec) => {
      return acc + sec.fields.filter((field) => {
        const value = formData[field.id];
        if (field.type === 'checkbox') return value && value.length > 0;
        if (field.type === 'file') return value !== null;
        return value && value.toString().trim() !== '';
      }).length;
    }, 0);
  }, [formData, visibleSections]);

  const totalVisibleFields = useMemo(() => {
    return visibleSections.reduce((acc, sec) => acc + sec.fields.length, 0);
  }, [visibleSections]);

  const progress = totalVisibleFields > 0 ? (filledCount / totalVisibleFields) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#FAFCFE]">
      {/* ── TechX top accent bar ── */}
      <header className="bg-gradient-to-r from-[#0F2A5C] to-[#0A86E8] h-2 w-full" />

      {/* ── Brand bar (TechX IT Services header) ── */}
      <div className="bg-white border-b border-[#DCE6F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a
            href="https://techxitservices.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
            title="Visit TechX IT Services"
          >
            <img
              src="/techx-logo.svg"
              alt="TechX IT Services"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-[0_2px_8px_rgba(10,134,232,0.18)]"
            />
          </a>
          <a
            href="https://techxitservices.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-[#69788E] hover:text-[#0A86E8] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Visit Website
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-0">
        {/* ── Form title card (TechX gradient header) ── */}
        <div className="bg-gradient-to-br from-[#0F2A5C] to-[#0A86E8] rounded-t-lg mt-6 px-6 sm:px-10 py-8 relative overflow-hidden shadow-lg shadow-[#0F2A5C]/15">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="80" cy="20" r="60" stroke="white" strokeWidth="0.5" />
              <circle cx="90" cy="30" r="40" stroke="white" strokeWidth="0.5" />
              <circle cx="70" cy="10" r="30" stroke="white" strokeWidth="0.5" />
              <circle cx="60" cy="40" r="20" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white/90 text-xs font-medium mb-3 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5AC8FA] animate-pulse" />
            New Client Onboarding
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-1 relative z-10" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
            Client Onboarding &amp; Project Details
          </h1>
          <p className="text-sm text-white/75 relative z-10 max-w-2xl">
            Please fill out this form to help us understand your requirements and securely collect necessary credentials for your project. Your information will be kept strictly confidential.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5AC8FA] to-[#0A86E8]" />
        </div>

        {/* ── Main form area ── */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form card */}
          <div className="flex-1 min-w-0">
            {/* Progress bar */}
            <div className="bg-white rounded-t-none border-t-0 border border-[#DCE6F0] px-6 sm:px-10 pt-4 pb-2 rounded-b-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#69788E]">
                    Page <span className="font-semibold text-[#0F2A5C]">{safeCurrentSection + 1}</span> of {visibleSections.length}
                  </span>
                  <span className="text-[#DCE6F0]">|</span>
                  <span className="text-xs text-[#69788E]">
                    <span className="font-semibold text-[#0F2A5C]">{filledCount}</span> of {totalVisibleFields} answered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1 bg-[#EEF4FA] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0F2A5C] to-[#0A86E8] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#0A86E8]">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Selected services chips */}
              {formData.servicesRequired && formData.servicesRequired.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-[#EEF4FA]">
                  {formData.servicesRequired.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EEF4FA] text-[#0F2A5C] border border-[#DCE6F0]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A86E8]" />
                      {service}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Section content */}
            <div className="bg-white border border-t-0 border-[#DCE6F0] mt-0 px-6 sm:px-10 py-6 rounded-b-lg shadow-sm">
              <FormSection
                section={section}
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onCheckboxChange={handleCheckboxChange}
                onFileChange={handleFileChange}
              />

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EEF4FA]">
                <button
                  onClick={goPrev}
                  disabled={safeCurrentSection === 0}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    safeCurrentSection === 0
                      ? 'text-[#B6CFE6] cursor-not-allowed'
                      : 'text-[#0F2A5C] hover:bg-[#EEF4FA] border border-[#DCE6F0]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Back
                </button>

                <span className="text-xs text-[#69788E]">
                  {safeCurrentSection + 1} of {visibleSections.length}
                </span>

                {safeCurrentSection < visibleSections.length - 1 ? (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#0F2A5C] to-[#0A86E8] text-white hover:shadow-lg hover:shadow-[#0A86E8]/30 transition-all duration-200"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isSubmitting
                        ? 'bg-[#0A86E8] text-white/80 cursor-wait'
                        : 'bg-gradient-to-r from-[#0F2A5C] to-[#0A86E8] text-white hover:shadow-lg hover:shadow-[#0A86E8]/40'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        Submit Form
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-[#69788E] px-1">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#0A86E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Your information is kept confidential
              </span>
              <span>© TechX IT Services</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-6 lg:mt-0">
            <Sidebar
              currentSection={safeCurrentSection}
              onSectionClick={handleSectionClick}
              getSectionCompletion={getSectionCompletion}
              visibleSections={visibleSections}
            />
          </div>
        </div>
      </div>

      {/* Success modal */}
      {isSubmitted && (
        <SuccessModal
          formData={formData}
          onReset={handleReset}
          onClose={() => setIsSubmitted(false)}
          visibleSections={visibleSections}
        />
      )}
    </div>
  );
}

export default App;

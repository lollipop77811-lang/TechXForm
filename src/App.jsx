import { useState, useCallback, useMemo } from 'react';
import { SECTIONS, getVisibleSections } from './data/formSchema';
import { useFormState } from './hooks/useFormState';
import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar';
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

  // Make sure currentSection is valid when sections change
  const safeCurrentSection = Math.min(currentSection, visibleSections.length - 1);
  const section = visibleSections[safeCurrentSection];

  // When services change, clamp the current section index
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
    <div className="min-h-screen bg-[#f0ebf8]">
      {/* ── Google Forms top purple bar ── */}
      <header className="bg-[#673ab7] h-3 w-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-0">
        {/* ── Form title card (Google Forms style) ── */}
        <div className="bg-[#673ab7] rounded-t-lg mt-6 px-6 sm:px-10 py-8 relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="80" cy="20" r="60" stroke="white" strokeWidth="0.5" />
              <circle cx="90" cy="30" r="40" stroke="white" strokeWidth="0.5" />
              <circle cx="70" cy="10" r="30" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-normal text-white mb-1 relative z-10">
            Client Onboarding &amp; Project Details
          </h1>
          <p className="text-sm text-white/70 relative z-10">
            Please fill out this form to help us understand your requirements and securely collect necessary credentials for your project. Your information will be kept strictly confidential.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e8e0f0]" />
        </div>

        {/* ── Main form area ── */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form card */}
          <div className="flex-1 min-w-0">
            {/* Progress bar */}
            <div className="bg-white rounded-t-none border-t-0 border border-[#dadce0] px-6 sm:px-10 pt-4 pb-2 rounded-b-lg shadow-sm">
              {/* Inline progress bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#5f6368]">
                    Page <span className="font-medium text-[#202124]">{safeCurrentSection + 1}</span> of {visibleSections.length}
                  </span>
                  <span className="text-[#dadce0]">|</span>
                  <span className="text-xs text-[#5f6368]">
                    <span className="font-medium text-[#202124]">{filledCount}</span> of {totalVisibleFields} answered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-1 bg-[#e8e0f0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#673ab7] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[#673ab7]">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Selected services chips */}
              {formData.servicesRequired && formData.servicesRequired.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-[#f0ebf8]">
                  {formData.servicesRequired.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#f0ebf8] text-[#673ab7] border border-[#e8e0f0]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#673ab7]" />
                      {service}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Section content */}
            <div className="bg-white border border-t-0 border-[#dadce0] mt-0 px-6 sm:px-10 py-6 rounded-b-lg shadow-sm">
              <FormSection
                section={section}
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onCheckboxChange={handleCheckboxChange}
                onFileChange={handleFileChange}
              />

              {/* Navigation buttons - Google Forms style */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e8e0f0]">
                <button
                  onClick={goPrev}
                  disabled={safeCurrentSection === 0}
                  className={`px-6 py-2 rounded-sm text-sm font-medium transition-colors duration-150 ${
                    safeCurrentSection === 0
                      ? 'text-[#9aa0a6] cursor-not-allowed'
                      : 'text-[#673ab7] hover:bg-[#f0ebf8]'
                  }`}
                >
                  Back
                </button>

                <span className="text-xs text-[#9aa0a6]">
                  {safeCurrentSection + 1} of {visibleSections.length}
                </span>

                {safeCurrentSection < visibleSections.length - 1 ? (
                  <button
                    onClick={goNext}
                    className="px-6 py-2 rounded-sm text-sm font-medium bg-[#673ab7] text-white hover:bg-[#5e35b1] transition-colors duration-150"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-sm text-sm font-medium transition-colors duration-150 ${
                      isSubmitting
                        ? 'bg-[#9c27b0] text-white/70 cursor-wait'
                        : 'bg-[#673ab7] text-white hover:bg-[#5e35b1]'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Google Forms style footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-[#9aa0a6] px-1">
              <span>
                <svg className="w-3.5 h-3.5 inline mr-1 text-[#9aa0a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Your information is kept confidential
              </span>
              <span>TechXForm</span>
            </div>
          </div>

          {/* Sidebar - only show visible sections */}
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

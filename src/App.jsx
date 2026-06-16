import { useState, useCallback } from 'react';
import { SECTIONS } from './data/formSchema';
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

  const section = SECTIONS[currentSection];

  const goNext = useCallback(() => {
    if (validateSection(section)) {
      if (currentSection < SECTIONS.length - 1) {
        setCurrentSection((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentSection, section, validateSection]);

  const goPrev = useCallback(() => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSection]);

  const handleSubmit = useCallback(async () => {
    // Validate current section
    if (!validateSection(section)) return;

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);

    // Build a clean payload for submission
    const payload = {};
    SECTIONS.forEach((s) => {
      s.fields.forEach((field) => {
        const value = formData[field.id];
        if (field.type === 'file' && value) {
          payload[field.id] = value.name;
        } else {
          payload[field.id] = value;
        }
      });
    });

    console.log('Submission payload:', payload);

    setIsSubmitting(false);
    setIsSubmitted(true);
  }, [formData, section, validateSection]);

  const handleReset = useCallback(() => {
    resetForm();
    setCurrentSection(0);
    setIsSubmitted(false);
  }, [resetForm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">TechXForm</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span>Your information is kept confidential</span>
          </div>
        </header>

        {/* Progress bar */}
        <ProgressBar currentSection={currentSection} formData={formData} />

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <Sidebar
            currentSection={currentSection}
            onSectionClick={setCurrentSection}
            getSectionCompletion={getSectionCompletion}
          />

          {/* Main form area */}
          <div className="flex-1 min-w-0">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8">
              <FormSection
                section={section}
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onCheckboxChange={handleCheckboxChange}
                onFileChange={handleFileChange}
              />

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
                <button
                  onClick={goPrev}
                  disabled={currentSection === 0}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentSection === 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-300 hover:bg-slate-800/50 border border-slate-600/50 hover:border-slate-500/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    {currentSection + 1} / {SECTIONS.length}
                  </span>
                </div>

                {currentSection < SECTIONS.length - 1 ? (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 shadow-lg shadow-blue-600/20"
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
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg ${
                      isSubmitting
                        ? 'bg-emerald-700 text-emerald-200 cursor-wait shadow-emerald-700/20'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
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
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-slate-600">
          <p>Please fill out this form to help us understand your requirements and securely collect necessary credentials for your project. Your information will be kept strictly confidential.</p>
        </footer>
      </div>

      {/* Success modal */}
      {isSubmitted && (
        <SuccessModal
          formData={formData}
          onReset={handleReset}
          onClose={() => setIsSubmitted(false)}
        />
      )}
    </div>
  );
}

export default App;

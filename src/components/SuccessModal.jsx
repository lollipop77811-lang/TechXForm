import { useState } from 'react';

export default function SuccessModal({ formData, onClose, onReset, visibleSections }) {
  const [showDetails, setShowDetails] = useState(false);

  const formatValue = (key, value) => {
    if (value === null || value === undefined || value === '') return '—';
    if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : '—';
    if (typeof value === 'object' && value.name) return value.name;
    return value;
  };

  return (
    <div className="fixed inset-0 bg-[#0F2A5C]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#DCE6F0] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* TechX brand bar across the top of the modal */}
        <div className="bg-gradient-to-r from-[#0F2A5C] to-[#0A86E8] h-1.5 rounded-t-2xl" />

        <div className="p-8 text-center">
          {/* TechX logo */}
          <div className="flex items-center justify-center mb-4">
            <img
              src="/techx-logo.png"
              alt="TechX IT Services"
              className="h-16 w-auto"
            />
          </div>

          {/* TechX brand success icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F2A5C] to-[#0A86E8] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#0A86E8]/30">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-[#0F2A5C] mb-2" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
            Response Recorded
          </h2>
          <p className="text-sm text-[#69788E] mb-6 max-w-md mx-auto">
            Thank you for providing your project details. Our team at TechX IT Services will review your information and get back to you shortly.
          </p>

          <div className="flex gap-3 justify-center mb-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-6 py-2 rounded-lg text-sm font-medium text-[#0F2A5C] border border-[#DCE6F0] hover:bg-[#EEF4FA] transition-colors duration-200"
            >
              {showDetails ? 'Hide Summary' : 'View Summary'}
            </button>
            <button
              onClick={onReset}
              className="px-6 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#0F2A5C] to-[#0A86E8] text-white hover:shadow-lg hover:shadow-[#0A86E8]/30 transition-all duration-200"
            >
              Submit another response
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="border-t border-[#DCE6F0] p-6 bg-[#FAFCFE]">
            {visibleSections.map((section) => (
              <div key={section.id} className="mb-5 last:mb-0">
                <h4 className="text-xs font-semibold text-[#0A86E8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-1 h-3 rounded-full bg-[#0A86E8]" />
                  {section.title}
                </h4>
                <div className="bg-white rounded-lg p-3 space-y-1.5 border border-[#EEF4FA]">
                  {section.fields.map((field) => (
                    <div key={field.id} className="flex justify-between items-start py-1 border-b border-[#EEF4FA] last:border-b-0">
                      <span className="text-xs text-[#69788E]">{field.label}</span>
                      <span className="text-xs text-[#0B1424] font-medium text-right ml-4 max-w-[60%] break-all">
                        {formatValue(field.id, formData[field.id])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

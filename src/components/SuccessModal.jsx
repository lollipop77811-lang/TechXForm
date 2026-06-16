import { useState } from 'react';
import { SECTIONS } from '../data/formSchema';

export default function SuccessModal({ formData, onClose, onReset }) {
  const [showDetails, setShowDetails] = useState(false);

  const formatValue = (key, value) => {
    if (value === null || value === undefined || value === '') return '—';
    if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : '—';
    if (typeof value === 'object' && value.name) return value.name;
    return value;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 text-center">
          {/* Google-style success check */}
          <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-[#1e8e3e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-xl font-normal text-[#202124] mb-2">
            Response recorded
          </h2>
          <p className="text-sm text-[#5f6368] mb-6">
            Thank you for providing your project details. Your information will be kept strictly confidential.
          </p>

          <div className="flex gap-3 justify-center mb-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-6 py-2 rounded-sm text-sm font-medium text-[#673ab7] hover:bg-[#f0ebf8] transition-colors duration-150"
            >
              {showDetails ? 'Hide Summary' : 'View Summary'}
            </button>
            <button
              onClick={onReset}
              className="px-6 py-2 rounded-sm text-sm font-medium bg-[#673ab7] text-white hover:bg-[#5e35b1] transition-colors duration-150"
            >
              Submit another response
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="border-t border-[#dadce0] p-6">
            {SECTIONS.map((section) => (
              <div key={section.id} className="mb-5 last:mb-0">
                <h4 className="text-xs font-medium text-[#673ab7] uppercase tracking-wider mb-2">
                  {section.title}
                </h4>
                <div className="bg-[#f8f9fa] rounded-md p-3 space-y-1.5">
                  {section.fields.map((field) => (
                    <div key={field.id} className="flex justify-between items-start py-1 border-b border-[#e8e0f0] last:border-b-0">
                      <span className="text-xs text-[#5f6368]">{field.label}</span>
                      <span className="text-xs text-[#202124] font-medium text-right ml-4 max-w-[60%] break-all">
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

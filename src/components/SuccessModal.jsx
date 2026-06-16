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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 text-center">
          {/* Success icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Form Submitted Successfully!
          </h2>
          <p className="text-slate-400 mb-8">
            Thank you for providing your project details. We'll review your information and get back to you shortly.
          </p>

          <div className="flex gap-3 justify-center mb-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-200 text-sm font-medium"
            >
              {showDetails ? 'Hide Summary' : 'View Summary'}
            </button>
            <button
              onClick={onReset}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 text-sm font-medium"
            >
              Submit Another
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="border-t border-slate-700/50 p-6">
            {SECTIONS.map((section) => (
              <div key={section.id} className="mb-6 last:mb-0">
                <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
                  {section.title}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {section.fields.map((field) => (
                    <div key={field.id} className="flex justify-between items-start py-1.5 border-b border-slate-800/50">
                      <span className="text-sm text-slate-400">{field.label}</span>
                      <span className="text-sm text-white font-medium text-right ml-4 max-w-[60%] break-all">
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

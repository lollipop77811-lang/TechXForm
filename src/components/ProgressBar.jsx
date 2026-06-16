import { SECTIONS, TOTAL_FIELDS } from '../data/formSchema';

export default function ProgressBar({ currentSection, formData }) {
  // Count total filled fields
  const filledCount = SECTIONS.reduce((acc, section) => {
    return acc + section.fields.filter((field) => {
      const value = formData[field.id];
      if (field.type === 'checkbox') return value && value.length > 0;
      if (field.type === 'file') return value !== null;
      return value && value.toString().trim() !== '';
    }).length;
  }, 0);

  const progress = TOTAL_FIELDS > 0 ? (filledCount / TOTAL_FIELDS) * 100 : 0;

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Client Onboarding & Project Details</h1>
            <p className="text-xs text-slate-400">
              Section {currentSection + 1} of {SECTIONS.length} &middot; {filledCount} of {TOTAL_FIELDS} fields completed
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold text-blue-400">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

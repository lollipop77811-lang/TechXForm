import { SECTIONS, TOTAL_FIELDS } from '../data/formSchema';

export default function ProgressBar({ currentSection, formData }) {
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
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-xs text-[#5f6368]">
          Page <span className="font-medium text-[#202124]">{currentSection + 1}</span> of {SECTIONS.length}
        </span>
        <span className="text-[#dadce0]">|</span>
        <span className="text-xs text-[#5f6368]">
          <span className="font-medium text-[#202124]">{filledCount}</span> of {TOTAL_FIELDS} answered
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
  );
}

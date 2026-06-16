export default function FormField({ field, value, error, onChange, onCheckboxChange, onFileChange }) {
  const baseInputClass =
    'w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200';

  const errorInputClass =
    'w-full px-4 py-3 bg-slate-800/50 border border-red-500/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200';

  const inputClass = error ? errorInputClass : baseInputClass;

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
        return (
          <input
            type={field.type}
            id={field.id}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
        );

      case 'password':
        return (
          <input
            type="password"
            id={field.id}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`${inputClass} resize-y min-h-[100px]`}
          />
        );

      case 'radio':
        return (
          <div className="flex flex-wrap gap-3">
            {field.options.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  value === option
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                    : 'bg-slate-800/30 border-slate-600/30 text-slate-300 hover:bg-slate-700/30 hover:border-slate-500/50'
                }`}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    value === option ? 'border-blue-400' : 'border-slate-500'
                  }`}
                >
                  {value === option && (
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                  )}
                </span>
                <span className="text-sm font-medium">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {field.options.map((option) => {
              const isChecked = (value || []).includes(option);
              return (
                <label
                  key={option}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isChecked
                      ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                      : 'bg-slate-800/30 border-slate-600/30 text-slate-300 hover:bg-slate-700/30 hover:border-slate-500/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      onCheckboxChange(field.id, option, e.target.checked)
                    }
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      isChecked ? 'border-blue-400 bg-blue-500' : 'border-slate-500'
                    }`}
                  >
                    {isChecked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-medium">{option}</span>
                </label>
              );
            })}
          </div>
        );

      case 'file':
        return (
          <div className="relative">
            <input
              type="file"
              id={field.id}
              accept={field.accept}
              onChange={(e) => onFileChange(field.id, e.target.files[0] || null)}
              className="sr-only"
            />
            <label
              htmlFor={field.id}
              className="flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-slate-600/50 rounded-xl cursor-pointer hover:border-blue-500/50 hover:bg-slate-800/30 transition-all duration-200"
            >
              <svg className="w-8 h-8 mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-sm text-slate-400">
                {value ? value.name : 'Click to upload or drag and drop'}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                {field.accept ? `Supported: ${field.accept}` : 'Any file type'}
              </span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-5">
      <label
        htmlFor={field.id}
        className="block text-sm font-medium text-slate-200 mb-2"
      >
        <span className="flex items-center gap-2">
          {field.label}
          {field.required && (
            <span className="text-red-400 text-xs">*</span>
          )}
        </span>
      </label>
      {renderField()}
      {error && (
        <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function FormField({ field, value, error, onChange, onCheckboxChange, onFileChange }) {
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
            className={`w-full border-b-2 bg-transparent py-2 px-0 text-[#202124] text-sm placeholder-[#9aa0a6] focus:outline-none transition-colors duration-200 ${
              error ? 'border-[#d93025]' : 'border-[#dadce0] focus:border-[#673ab7]'
            }`}
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
            className={`w-full border-b-2 bg-transparent py-2 px-0 text-[#202124] text-sm placeholder-[#9aa0a6] focus:outline-none transition-colors duration-200 ${
              error ? 'border-[#d93025]' : 'border-[#dadce0] focus:border-[#673ab7]'
            }`}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={`w-full border-b-2 bg-transparent py-2 px-0 text-[#202124] text-sm placeholder-[#9aa0a6] focus:outline-none resize-y min-h-[72px] transition-colors duration-200 ${
              error ? 'border-[#d93025]' : 'border-[#dadce0] focus:border-[#673ab7]'
            }`}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 py-1.5 px-2 rounded-md cursor-pointer hover:bg-[#f0ebf8] transition-colors duration-150"
              >
                <span className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name={field.id}
                    value={option}
                    checked={value === option}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      value === option
                        ? 'border-[#673ab7]'
                        : 'border-[#5f6368]'
                    }`}
                  >
                    {value === option && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#673ab7]" />
                    )}
                  </span>
                </span>
                <span className="text-sm text-[#202124]">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map((option) => {
              const isChecked = (value || []).includes(option);
              return (
                <label
                  key={option}
                  className="flex items-center gap-3 py-1.5 px-2 rounded-md cursor-pointer hover:bg-[#f0ebf8] transition-colors duration-150"
                >
                  <span className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        onCheckboxChange(field.id, option, e.target.checked)
                      }
                      className="sr-only"
                    />
                    <span
                      className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all duration-200 ${
                        isChecked
                          ? 'border-[#673ab7] bg-[#673ab7]'
                          : 'border-[#5f6368]'
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  </span>
                  <span className="text-sm text-[#202124]">{option}</span>
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
              className="flex flex-col items-center justify-center w-full py-8 border-2 border-dashed border-[#dadce0] rounded-lg cursor-pointer hover:border-[#673ab7] hover:bg-[#f0ebf8] transition-all duration-200"
            >
              <svg className="w-10 h-10 mb-2 text-[#5f6368]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-[#5f6368]">
                {value ? value.name : 'Drag and drop a file or click to browse'}
              </span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={field.type !== 'radio' && field.type !== 'checkbox' ? field.id : undefined}
        className="block text-sm font-normal text-[#202124] mb-1"
      >
        {field.label}
        {field.required && (
          <span className="text-[#d93025] ml-1">*</span>
        )}
      </label>
      {renderField()}
      {error && (
        <p className="mt-1 text-xs text-[#d93025] flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

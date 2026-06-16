import FormField from './FormField';

export default function FormSection({ section, formData, errors, onChange, onCheckboxChange, onFileChange }) {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6 pb-4 border-b border-[#e0e0e0]">
        <h2 className="text-lg font-medium text-[#202124] mb-0.5">{section.title}</h2>
        <p className="text-xs text-[#5f6368]">{section.description}</p>
      </div>

      <div className="space-y-0">
        {section.fields.map((field, index) => (
          <div
            key={field.id}
            className="py-4 border-b border-[#f0ebf8] last:border-b-0"
          >
            <div className="flex items-start gap-4">
              <span className="text-xs font-medium text-[#9aa0a6] mt-1 w-5 text-right shrink-0">
                {index + 1}.
              </span>
              <div className="flex-1">
                <FormField
                  field={field}
                  value={formData[field.id]}
                  error={errors[field.id]}
                  onChange={onChange}
                  onCheckboxChange={onCheckboxChange}
                  onFileChange={onFileChange}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import FormField from './FormField';

export default function FormSection({ section, formData, errors, onChange, onCheckboxChange, onFileChange }) {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6 pb-4 border-b border-[#EEF4FA]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#0F2A5C] to-[#0A86E8]" />
          <h2 className="text-lg font-semibold text-[#0F2A5C]" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
            {section.title}
          </h2>
        </div>
        <p className="text-xs text-[#69788E] pl-3">{section.description}</p>
      </div>

      <div className="space-y-0">
        {section.fields.map((field, index) => (
          <div
            key={field.id}
            className="py-4 border-b border-[#EEF4FA] last:border-b-0"
          >
            <div className="flex items-start gap-4">
              <span className="text-xs font-semibold text-[#B6CFE6] mt-1 w-5 text-right shrink-0">
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

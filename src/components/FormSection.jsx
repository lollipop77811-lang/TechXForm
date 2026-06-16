import FormField from './FormField';

export default function FormSection({ section, formData, errors, onChange, onCheckboxChange, onFileChange }) {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">{section.title}</h2>
        <p className="text-slate-400 text-sm">{section.description}</p>
      </div>

      <div className="space-y-1">
        {section.fields.map((field, index) => (
          <div key={field.id} className="relative">
            <div className="absolute -left-8 top-3 text-xs font-mono text-slate-600">
              {index + 1}
            </div>
            <FormField
              field={field}
              value={formData[field.id]}
              error={errors[field.id]}
              onChange={onChange}
              onCheckboxChange={onCheckboxChange}
              onFileChange={onFileChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

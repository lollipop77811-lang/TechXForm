import { useState, useCallback } from 'react';
import { getInitialFormData } from '../data/formSchema';

export function useFormState() {
  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    setErrors((prev) => {
      if (prev[fieldId]) {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      }
      return prev;
    });
  }, []);

  const handleCheckboxChange = useCallback((fieldId, option, checked) => {
    setFormData((prev) => {
      const current = prev[fieldId] || [];
      const updated = checked
        ? [...current, option]
        : current.filter((v) => v !== option);
      return { ...prev, [fieldId]: updated };
    });
  }, []);

  const handleFileChange = useCallback((fieldId, file) => {
    setFormData((prev) => ({ ...prev, [fieldId]: file }));
  }, []);

  const validateSection = useCallback((section) => {
    const sectionErrors = {};
    let isValid = true;

    section.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.id];
        if (!value || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0)) {
          sectionErrors[field.id] = `${field.label} is required`;
          isValid = false;
        }
        if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          sectionErrors[field.id] = 'Please enter a valid email address';
          isValid = false;
        }
      }
    });

    setErrors((prev) => ({ ...prev, ...sectionErrors }));
    return isValid;
  }, [formData]);

  const getSectionCompletion = useCallback((section) => {
    const filledFields = section.fields.filter((field) => {
      const value = formData[field.id];
      if (field.type === 'checkbox') return value && value.length > 0;
      if (field.type === 'file') return value !== null;
      return value && value.toString().trim() !== '';
    });
    return { filled: filledFields.length, total: section.fields.length };
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(getInitialFormData());
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    handleChange,
    handleCheckboxChange,
    handleFileChange,
    validateSection,
    getSectionCompletion,
    resetForm,
  };
}

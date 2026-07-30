import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react';

interface FieldProps {
  label: string;
  error?: string;
}

export function FormInput({ label, error, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-200">{label}</label>
      <input
        {...props}
        className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-colors ${error ? 'border-red-500' : 'border-gray-700'}`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function FormTextarea({ label, error, ...props }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-200">{label}</label>
      <textarea
        {...props}
        rows={4}
        className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-colors resize-y ${error ? 'border-red-500' : 'border-gray-700'}`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface FormSelectProps extends FieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
}

export function FormSelect({ label, error, options, children, ...props }: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-200">{label}</label>
      <select
        {...props}
        className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-[#d4a853] transition-colors ${error ? 'border-red-500' : 'border-gray-700'}`}
      >
        {options
          ? options.map((o) => <option key={o} value={o}>{o}</option>)
          : children}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

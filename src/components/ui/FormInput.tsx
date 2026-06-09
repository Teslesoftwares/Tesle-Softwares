import { type UseFormRegister, type FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export function FormInput({ label, name, register, error, placeholder, type = 'text', required }: FormInputProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full h-10 px-4 text-sm bg-white/[0.04] border text-white placeholder:text-muted rounded-xl focus:outline-none transition-colors ${
          error ? 'border-red-400/50' : 'border-white/[0.10] focus:border-accent/40'
        }`}
      />
      {error && <p className="mt-1 text-[10px] text-red-400">{error.message}</p>}
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function FormTextarea({ label, name, register, error, placeholder, rows = 4, required }: FormTextareaProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        rows={rows}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-sm bg-white/[0.04] border text-white placeholder:text-muted rounded-xl focus:outline-none transition-colors resize-none ${
          error ? 'border-red-400/50' : 'border-white/[0.10] focus:border-accent/40'
        }`}
      />
      {error && <p className="mt-1 text-[10px] text-red-400">{error.message}</p>}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export function FormSelect({ label, name, register, error, options, placeholder = 'Select...', required }: FormSelectProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        {...register(name)}
        className={`w-full h-10 px-4 text-sm bg-white/[0.04] border text-white rounded-xl focus:outline-none transition-colors appearance-none ${
          error ? 'border-red-400/50' : 'border-white/[0.10] focus:border-accent/40'
        }`}
      >
        <option value="" className="bg-bg text-muted">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-bg text-white">{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-[10px] text-red-400">{error.message}</p>}
    </div>
  );
}

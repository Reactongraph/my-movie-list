import { UseFormRegister, FieldError } from 'react-hook-form';

export interface SignInFormInputs {
  email: string;
  password: string;
  confirmPassword?: string; 
  title?: string;
  firstName: string;
  lastName: string;
  remember?: boolean;
  video?: string;
  year?:string;
  terms?:boolean;
}
interface InputProps {
  name: keyof SignInFormInputs;
  type?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  value?: string
  register?: UseFormRegister<SignInFormInputs> | undefined;
  required?: string; // Accept a custom error message
  pattern?: { value: RegExp; message: string }; // Pattern validation with message
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError; // Error object for this input field
}

const CommonInput: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  className,
  label,
  register,
  required,
  pattern,
  onChange,
  error,
  value
}) => {
  return (
    <div className="mb-4">
      {/* Label */}
      {label && (
        <label htmlFor={name} className="block text-gray-400 mb-2">
          {label}
        </label>
      )}

      {/* Input Field */}
      <input
        id={name}
        type={type}
        
        placeholder={placeholder}
        {...(register ? register(name, { required, pattern }) : {})}
        onChange={onChange}
        className={`w-full bg-[#1E3A47] bg-opacity-50 rounded px-4 py-3 text-white placeholder-gray-400 outline-none ${
          error ? 'focus:ring-2 focus:ring-red-500 border-red-500' : 'focus:ring-2 focus:ring-[#40F99B]'
        } ${className}`}
        value={value }
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default CommonInput;

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useCustomNavigate } from "@/app/hooks/useCustomNavigate";
import CommonInput from "@/app/component/common/CommonInput";

interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const {navigate}= useCustomNavigate()
  const onSubmit: SubmitHandler<SignUpFormInputs> = async(formValue) => {
    let payload={
        firstName: formValue?.firstName,
        lastName: formValue?.lastName,
        email: formValue?.email,
        password: formValue?.password,
        action: "signup"
    }
    const res = await fetch('/api/auth/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('User created successfully');
      } else {
       console.error("error in from Be", res)
      } 
  };

  return (
    <div className="min-h-screen bg-[#0A2733] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Main content */}
      <div className="w-full max-w-md px-6 z-10">
        <h1 className="text-white text-4xl font-medium text-center mb-8">
          Sign up
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <CommonInput
                name="firstName"
                type="text"
                placeholder="First Name"
                label="First Name"
                register={register}
                required="First Name is required"
                error={errors.firstName}
              />
            </div>
            <div>
            <CommonInput
                name="lastName"
                type="text"
                placeholder="Last Name"
                label="Last Name"
                register={register}
                required="Last Name is required"
                error={errors.lastName}
              />
            </div>
          </div>

          <div>
          <CommonInput
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
            register={register}
            required="Email is required"
            pattern={{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            }}
            error={errors.email}
          />
          </div>

          <div>
          <CommonInput
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            register={register}
            required="Password is required"
            error={errors.password}
          />
          </div>

          <div>
          <CommonInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
            register={register}
            required="Password is required"
            error={errors.confirmPassword}
          />
          </div>

          <div className="flex items-center">
          <input
              type="checkbox"
              id="terms"
              {...register("terms")}
              className="rounded border-gray-400 text-[#40F99B] focus:ring-[#40F99B]"
            />
            <label htmlFor="terms" className="ml-2 text-gray-400 text-sm">
              I agree to the Terms and Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#40F99B] text-white rounded py-3 font-medium hover:bg-opacity-90 transition-opacity"
          >
            Create Account
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <span className="text-[#40F99B] hover:underline cursor-pointer" onClick={()=>navigate('/login')}>
              Sign in
            </span>
          </p>
        </form>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative h-48">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] opacity-50 transform -skew-y-2"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] transform skew-y-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

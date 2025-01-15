"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";
import { useCustomNavigate } from "@/app/hooks/useCustomNavigate";
import CommonInput, { SignInFormInputs } from "@/app/component/common/CommonInput";


const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();
  const { navigate } = useCustomNavigate();
  const { login } = useAuth();
  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    await login(data.email, data.password);
  };
  return (
    <div className="min-h-screen bg-[#0A2733] flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-6">
        <h1 className="text-white text-4xl font-medium text-center mb-8">
          Sign in
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
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

          {/* Password Input */}
          <CommonInput
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
            register={register}
            required="Password is required"
            error={errors.password}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              {...register("remember")}
              className="rounded border-gray-400 text-[#40F99B] focus:ring-[#40F99B]"
            />
            <label htmlFor="remember" className="ml-2 text-gray-400 text-sm">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#40F99B] text-white rounded py-3 font-medium hover:bg-opacity-90 transition-opacity"
          >
            Login
          </button>
          <p className="text-center text-gray-400 text-sm">
            {`Don't have an account?`}
            <span
              className="text-[#40F99B] hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative h-48">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] opacity-50 transform -skew-y-2"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A3141] transform skew-y-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

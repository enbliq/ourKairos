"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/app/utils/validators";
import { InputForm } from "@/app/components/InputForm";

interface SignupFormProps {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  walletAddress: string;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormProps>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormProps) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <InputForm
        {...register("fullname")}
        label="Fullname"
        error={errors.fullname?.message}
        placeholder="Enter your username"
      />

      <InputForm
        {...register("email")}
        label="Email"
        error={errors.email?.message}
        placeholder="Enter your email"
      />

      <InputForm
        {...register("password")}
        label="Password"
        type="password"
        error={errors.password?.message}
        placeholder="Enter your password"
      />

      <InputForm
        {...register("confirmPassword")}
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        placeholder="Confirm your password"
      />

      <InputForm
        {...register("walletAddress")}
        label="Wallet Address"
        error={errors.walletAddress?.message}
        placeholder="Enter your wallet address"
      />

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-base font-bold text-Button/Primary bg-Button/Primary-background hover:bg-Heading/H1-main focus:outline-none hover:text-white"
      >
        Sign Up
      </button>
    </form>
  );
}

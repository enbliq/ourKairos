"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema } from "@/app/utils/validators";
import { InputForm } from "@/app/components/InputForm";
import { CustomCheckbox } from "@/app/components/CustomCheckbox";
interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormProps) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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



      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field }) => (
              <CustomCheckbox
                id="remember"
                label="Remember me"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <Link
          href="/forgot-password"
          className="text-base font-normal text-Body/Paragraph hover:text-Heading/H1-main"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="!mt-[10rem] w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-base font-bold text-Button/Primary bg-Button/Primary-background hover:bg-Heading/H1-main focus:outline-none hover:text-white"
      >
        Sign In
      </button>
    </form>
  );
}

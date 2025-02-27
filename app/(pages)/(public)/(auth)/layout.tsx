"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/img/logo.png";
import character from "@/public/img/character.png";
import characterMobile from "@/public/img/character-mobile.png";
import rocket from "@/public/img/rocket.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen relative font-manrope bg-auth-background-mobile md:bg-auth-background min-h-[900px] lg:max-h-[1117px]">
      <div className="h-[20%] md:h-full md:flex-1 p-16 flex flex-col justify-center items-center md:-mt-[6rem]">
        <div className="absolute -top-[2%] left-[28%] sm:left-[40%] md:left-[0%] md:top-[0%] md:relative w-full h-full max-w-[259px] max-h-[268px] md:max-w-[550px] md:max-h-[926px]">
          <Image
            src={character}
            alt="Character illustration"
            fill
            className="hidden md:block"
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <Image
            src={characterMobile}
            alt="Character illustration"
            layout="fill"
            objectFit="contain"
            className="block md:hidden"
          />
        </div>
        <h1 className="text-[32px] font-extrabold text-Heading/H1-mainThree text-center hidden md:block -mt-28">
          Capture and Share Moments for the Future
        </h1>
        <p className="text-Heading/H1-mainThree text-center text-base font-semibold hidden md:block mt-2">
          Send messages or media that unlock at the perfect moment.
        </p>
      </div>

      <div className="flex h-full md:flex-1">
        <div
          className="flex flex-1 p-8 flex-col justify-between bg-Button/Primary-backgroundTwo 
        rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[20px] rounded-br-[20px] md:rounded-tl-[50px] md:rounded-tr-none md:rounded-bl-[50px] md:rounded-br-none"
        >
          <div className="flex-col justify-start items-start max-w-md w-full hidden md:flex">
            <div className="text-left">
              <Image
                src={logo}
                alt="TimelyCapsule Logo"
                width={242}
                height={71}
                className="mx-auto"
              />
            </div>
          </div>
          <div className="max-w-[581px] w-full mx-auto md:mt-[10px]">
            <h2 className="text-[32px] text-Heading/H1-mainTwo font-extrabold text-center mb-2">
              Join Timely
              <span className="text-Heading/H1-main font-extrabold">
                Capsule
              </span>
            </h2>
            <p className="text-Subheading/H4 text-center text-lg">
              Unlock your capsules across time and space.
            </p>
          </div>
          <div className="max-w-[581px] w-full mx-auto mt-8">{children}</div>
          <div className="max-w-md w-full mx-auto">
            <p className="mt-6 text-center text-lg text-Subheading/H4 font-semibold">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-Heading/H1-main hover:text-Heading/H1-main/40 text-lg font-bold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 left-[55%] md:top-1/2 md:left-1/2 transform 
        hidden md:block
      lg:-translate-x-[calc(50%+40px)] 
      xl:-translate-x-[calc(50%+40px)] 
      md:-translate-x-[calc(50%+40px)] 
      lg:-translate-y-[calc(50%+90px)] 
      md:-translate-y-[calc(50%+100px)] 
      xl:-translate-y-[calc(50%+100px)] w-36 h-36 md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px] xl:w-[533px] xl:h-[533px]"
      >
        <Image
          src={rocket}
          alt="Rocket illustration"
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

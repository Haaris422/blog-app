'use client';
import { useActionState, useEffect, useState } from "react";
import { login } from "@/app/login/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { animationCalss } from "@/components/Home/Constants/Data";
import { ActionButton } from "@/components/Shared/ActionButton";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Button } from "@/components/Shared/Button";

export function LoginComp() {
  const router = useRouter();
  const [state, action, isPending] = useActionState<FormState, FormData>(login, {});
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    if (state?.success) {
      router.push('/');
    }
  }, [state, router]);
  return (
    <div>
      <h1 className="text-3xl text-center">Welcome Back</h1>
      <h2 className="text-center ">Don't have an account? <Link className={`${animationCalss} hover:underline hover:opacity-60`} href={'/register'}>Register</Link></h2>
      <form action={action} className="flex flex-col justify-center mt-12 px-2 space-y-6">
        <div className="w-full flex flex-col xs:flex-row items-center justify-between">
          <label htmlFor="email">Email:</label>
          <input
            className="p-2 border border-black min-w-[220px]"
            defaultValue={state.data?.email} autoComplete="email"
            id="email" name="email" type="email"
            required />
        </div>
        <div className="w-full flex flex-col xs:flex-row items-center justify-between">
          <label htmlFor="password">Password:</label>
          <div className="p-0 max-w-[220px]
          border border-black flex">
            <input
              className="p-2 min-w-[170px]"
              id="password"
              defaultValue={state.data?.password}
              name="password" type={!showPass?"password":'text'}
              required />
            <Button
            type='button'
            onClick={()=> setShowPass(!showPass)}
              className={`${animationCalss} relative flex justify-center items-center group min-w-[45px] border text-black overflow-hidden`}>
              <span className={`${animationCalss} relative 
            z-5 group-hover:text-white 
            transition-colors duration-300`}>
                {!showPass?<BsEyeFill />:<BsEyeSlashFill/>}
              </span>

              <div className={`${animationCalss} absolute top-0 left-0 h-full bg-black w-0 group-hover:w-full transition-all duration-300 z-0`} />
            </Button>
          </div>

        </div>
        {state?.error && <p className="text-red-600">{state.error}</p>}
        {state?.success && <p className="text-green-600">Login successful!</p>}

        <div className="w-full justify-center flex mt-8">
          <ActionButton type="submit">Log in</ActionButton>
        </div>
        <Link className={`${animationCalss} hover:underline
        hover:opacity-60
        text-center`} href={'/forgot-password'}>Forgot Password?</Link>
      </form>
    </div>
  );
}
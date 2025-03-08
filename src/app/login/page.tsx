"use client";

import Button from "@/etities/Button";
import Input from "@/etities/Input";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return;
    }
    await signIn("credentials", {
      email: email.toString().trim(),
      password: password.toString().trim(),
    });
  };
  useEffect(() => {
    if (session) {
      router.replace(callbackUrl); // 로그인 후 원래 페이지로 이동
    }
  }, [session, callbackUrl, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold text-center pb-4">로그인</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-sm">
        <Input type="email" name="email" placeholder="이메일" />
        <Input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="비밀번호"
        />
        <Button type="submit" variant="primary">
          로그인
        </Button>
      </form>
      <div className="flex flex-col gap-2 w-full max-w-sm pt-4 border-t border-gray-200 mt-4">
        <button
          onClick={() => signIn("kakao")}
          className="text-[#000002] bg-[#f5e113] rounded font-medium py-2 px-4"
        >
          카카오로 로그인
        </button>
        <button
          onClick={() => signIn("naver")}
          className="text-white bg-[#03c158] rounded font-medium py-2 px-4"
        >
          네이버로 로그인
        </button>
        <button
          onClick={() => signIn("google")}
          className="text-white bg-[#4181ec] rounded font-medium py-2 px-4"
        >
          구글로 로그인
        </button>
        <button
          onClick={() => signIn("apple")}
          className="text-white bg-black rounded font-medium py-2 px-4"
        >
          애플로 로그인
        </button>
      </div>
    </div>
  );
}

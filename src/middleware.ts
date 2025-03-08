import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    const callbackUrl = encodeURIComponent(url.pathname + url.search);

    if (!req.nextauth.token) {
      url.pathname = "/login"; // 로그인 페이지 경로 수정
      url.search = `callbackUrl=${callbackUrl}`;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // 로그인 여부 확인
    },
  }
);

// 적용할 경로 지정
export const config = {
  matcher: ["/order/:path*"], // 보호할 페이지 목록
};
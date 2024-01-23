"use client";

import { cookieUtils } from "@/utils/cookieUtils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const { getCookie } = cookieUtils();

export default function PrivateRouteConfig({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const token = getCookie();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    if (isAuthPage && token) return router.push("/todo");
    if (!isAuthPage && !token) return router.push("/login");
  }, [pathname]);

  return <>{children}</>;
}

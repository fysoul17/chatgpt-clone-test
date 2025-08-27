"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignOut} disabled={isLoading}>
      {isLoading ? "로그아웃 중..." : "로그아웃"}
    </Button>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">이메일을 확인하세요</CardTitle>
          <CardDescription className="text-center">
            {email}로 확인 이메일을 보냈습니다. 이메일의 링크를 클릭해서 계정을 활성화하세요.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button className="w-full">로그인으로 이동</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
        <CardDescription>새 계정을 만들어서 ChatGPT Clone을 시작하세요</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="최소 6자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "가입 중..." : "회원가입"}
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

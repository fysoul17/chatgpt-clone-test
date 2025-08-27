"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestChatPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "API 요청 실패");
      }

      // 스트리밍 응답 처리
      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("스트림 읽기 실패");
      }

      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6); // 'data: ' 제거

            if (data === "[DONE]") {
              setIsLoading(false);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedResponse += parsed.content;
                setResponse(accumulatedResponse);
              }
            } catch (e) {
              // JSON 파싱 오류 무시 (불완전한 데이터일 수 있음)
            }
          }
        }
      }
    } catch (error) {
      console.error("채팅 에러:", error);
      setResponse(`에러 발생: ${error instanceof Error ? error.message : "알 수 없는 에러"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-6">OpenAI API 테스트</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            메시지
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="질문을 입력하세요..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>

        <Button onClick={sendMessage} disabled={isLoading || !message.trim()} className="w-full">
          {isLoading ? "응답 생성 중..." : "전송"}
        </Button>

        {response && (
          <div>
            <label className="block text-sm font-medium mb-2">AI 응답</label>
            <div className="p-4 bg-gray-50 border rounded-md whitespace-pre-wrap">
              {response}
              {isLoading && <span className="animate-pulse">▊</span>}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h3 className="font-medium text-yellow-800 mb-2">설정 안내</h3>
        <p className="text-sm text-yellow-700">
          API를 테스트하려면 프로젝트 루트에 <code>.env.local</code> 파일을 생성하고 다음과 같이 OpenAI API 키를 설정해주세요:
        </p>
        <pre className="mt-2 p-2 bg-yellow-100 rounded text-xs">OPENAI_API_KEY=your_openai_api_key_here</pre>
      </div>
    </div>
  );
}

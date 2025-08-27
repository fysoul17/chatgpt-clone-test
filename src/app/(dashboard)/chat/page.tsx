"use client";

import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { MessageList } from "@/components/MessageList";
import { MessageData } from "@/components/Message";

// 목 데이터 (나중에 실제 데이터로 교체)
const mockMessages: MessageData[] = [
  {
    id: "1",
    role: "assistant",
    content: "안녕하세요! ChatGPT Clone에 오신 것을 환영합니다. 무엇을 도와드릴까요?",
    createdAt: new Date(Date.now() - 5000).toISOString(),
  },
  {
    id: "2",
    role: "user",
    content: "안녕하세요! 잘 작동하는지 테스트해보고 있어요.",
    createdAt: new Date(Date.now() - 3000).toISOString(),
  },
  {
    id: "3",
    role: "assistant",
    content:
      "네, 잘 작동하고 있습니다! 😊\n\n다양한 질문을 해보시고 여러 기능들을 테스트해보세요. 저는 다음과 같은 것들을 도와드릴 수 있습니다:\n\n- 질문 답변\n- 코딩 도움\n- 창작 활동 지원\n- 일반적인 대화\n\n무엇이든 편하게 물어보세요!",
    createdAt: new Date(Date.now() - 1000).toISOString(),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageData[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // 사용자 메시지 추가
    const userMessage: MessageData = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // 목 AI 응답 (나중에 실제 API 호출로 교체)
    setTimeout(() => {
      const assistantMessage: MessageData = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `"${content}"에 대한 응답입니다. 이것은 목 응답이며, 나중에 실제 OpenAI API로 교체될 예정입니다.`,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 채팅 헤더 */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
        <h1 className="font-semibold">새로운 대화</h1>
        <p className="text-sm text-muted-foreground">AI와 대화해보세요</p>
      </div>

      {/* 메시지 리스트 */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* 채팅 입력 */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}

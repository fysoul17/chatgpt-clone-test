"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, MessageData } from "@/components/Message";

interface MessageListProps {
  messages: MessageData[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading = false }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-lg mb-2">💬</p>
          <p>새로운 대화를 시작해보세요!</p>
          <p className="text-sm mt-1">아래에 메시지를 입력하면 AI가 응답합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1">
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                </div>
                <span className="text-sm text-muted-foreground">AI가 응답 중...</span>
              </div>
            </div>
          </div>
        )}

        {/* 스크롤 앵커 */}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}

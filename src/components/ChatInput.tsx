"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isMessageEmpty = !message.trim();

  return (
    <form onSubmit={handleSubmit} className="border-t bg-background p-4">
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요... (Enter로 전송, Shift+Enter로 줄바꿈)"
          className="min-h-[60px] max-h-[200px] resize-none"
          disabled={disabled}
        />
        <Button type="submit" size="icon" disabled={isMessageEmpty || disabled} className="h-[60px] w-[60px]">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

import { cn } from "@/lib/utils";

export interface MessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface MessageProps {
  message: MessageData;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  // 시간 포맷팅 (HH:mm 형식)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[80%] rounded-lg px-4 py-2 text-sm", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        <div className={cn("text-xs mt-1 opacity-70", isUser ? "text-right" : "text-left")}>{formatTime(message.createdAt)}</div>
      </div>
    </div>
  );
}

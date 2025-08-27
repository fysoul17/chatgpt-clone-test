import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST 요청 핸들러
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { message, conversationId } = body;

    // 입력 검증
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required and must be a string" }, { status: 400 });
    }

    // OpenAI API 키 확인
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 });
    }

    // 대화 히스토리 가져오기 (현재는 단일 메시지만 처리)
    // TODO: 나중에 Supabase에서 대화 히스토리를 가져오는 로직 추가
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "You are a helpful assistant. Please respond in Korean unless the user specifically asks for another language.",
      },
      {
        role: "user",
        content: message,
      },
    ];

    console.log("Sending request to OpenAI with message:", message);

    // OpenAI API 호출 (스트리밍)
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      stream: true,
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log("OpenAI stream created successfully");

    // ReadableStream 생성하여 클라이언트로 스트리밍
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";

            // 스트림 종료 체크
            if (chunk.choices[0]?.finish_reason === "stop") {
              controller.close();
              return;
            }

            // 내용이 있는 경우에만 전송
            if (content) {
              const encoder = new TextEncoder();
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
        } catch (error) {
          console.error("Error during streaming:", error);
          controller.error(error);
        } finally {
          // 스트림 종료 신호
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    // Server-Sent Events 헤더 설정
    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);

    // OpenAI API 에러 처리
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        {
          error: "OpenAI API Error",
          message: error.message,
          status: error.status,
        },
        { status: error.status || 500 }
      );
    }

    // 일반 에러 처리
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

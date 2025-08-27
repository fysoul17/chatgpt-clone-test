import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          {/* 로고/제목 */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6">ChatGPT Clone</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            OpenAI GPT-4o mini를 활용한 AI 채팅 애플리케이션입니다. 실시간 스트리밍으로 자연스러운 대화를 경험해보세요.
          </p>

          {/* 기능 소개 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2">실시간 채팅</h3>
              <p className="text-gray-600">실시간 스트리밍으로 AI와 자연스러운 대화</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold mb-2">GPT-4o mini</h3>
              <p className="text-gray-600">최신 OpenAI 모델을 활용한 정확한 답변</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-semibold mb-2">반응형 디자인</h3>
              <p className="text-gray-600">모든 기기에서 최적화된 사용자 경험</p>
            </div>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex gap-4 items-center justify-center flex-col sm:flex-row mb-16">
            <Link href="/chat">
              <Button size="lg" className="px-8 py-3 text-lg">
                지금 채팅 시작하기
              </Button>
            </Link>
            <Link href="/test-chat">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                API 테스트
              </Button>
            </Link>
          </div>

          {/* 기술 스택 */}
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">기술 스택</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Next.js 15</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React 19</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">shadcn/ui</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">OpenAI API</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Server-Sent Events</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

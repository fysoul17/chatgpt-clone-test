import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* 로고/브랜드 영역 */}
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold">ChatGPT Clone</h1>
        </div>

        {/* 네비게이션 영역 */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {/* 새로운 대화 버튼 */}
            <button className="w-full text-left p-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors">
              + 새로운 대화
            </button>

            {/* 대화 히스토리 - 현재는 플레이스홀더 */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-400 mb-2">최근 대화</h3>
              <div className="space-y-1">
                {/* 임시 대화 항목들 */}
                <div className="p-2 text-sm text-gray-300 hover:bg-gray-800 rounded cursor-pointer truncate">
                  React에 대해 질문했던 대화
                </div>
                <div className="p-2 text-sm text-gray-300 hover:bg-gray-800 rounded cursor-pointer truncate">API 설계 관련 논의</div>
                <div className="p-2 text-sm text-gray-300 hover:bg-gray-800 rounded cursor-pointer truncate">TypeScript 타입 정의 도움</div>
              </div>
            </div>
          </div>
        </nav>

        {/* 하단 사용자 영역 */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">사용자</div>
              <div className="text-xs text-gray-400">user@example.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}

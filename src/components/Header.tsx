import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 h-14 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-[15px] font-medium text-gray-800">
        <div className="w-7 h-7 bg-[#3B6D11] rounded-md flex items-center justify-center">
          <span className="text-[#EAF3DE] text-sm">📄</span>
        </div>
        履歴書ビルダー
      </Link>
      <span className="text-xs text-[#27500A] bg-[#EAF3DE] border border-[#C0DD97] px-3 py-1 rounded-full">
        無料で使える
      </span>
    </header>
  )
}
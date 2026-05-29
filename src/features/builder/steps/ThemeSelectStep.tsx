import { THEMES } from '../../themes'
import type { Theme } from '../../themes'

type Props = {
  onSelect: (theme: Theme) => void
}

const PAGE_ICONS: Record<number, string> = {
  1: '📄',
  2: '📋',
}

export default function ThemeSelectStep({ onSelect }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">テンプレートを選ぶ</h2>
        <p className="text-sm text-gray-500">用途に合ったテンプレートをお選びください</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {THEMES.map(theme => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelect(theme)}
            className="text-left border border-gray-200 rounded-xl p-5 hover:border-[#3B6D11] hover:bg-[#F7FBF3] transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-medium text-gray-800 group-hover:text-[#3B6D11]">
                {theme.label}
              </span>
              {theme.badge && (
                <span className="text-xs bg-[#EAF3DE] text-[#3B6D11] px-2 py-0.5 rounded-full">
                  {theme.badge}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {theme.description}
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{PAGE_ICONS[theme.pages] ?? '📄'} {theme.pages}ページ</span>
              <span>・</span>
              <span>{theme.steps.length}ステップ</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

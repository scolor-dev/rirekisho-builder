import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { useLocation, useNavigate } from 'react-router-dom'
import { THEMES } from '../features/themes'
import type { ResumeData } from '../features/builder/schema'

export default function PreviewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { data: Partial<ResumeData>; themeId?: string } | null
  const data = state?.data ?? {}
  const theme = THEMES.find(t => t.id === state?.themeId) ?? THEMES[0]

  const TemplateComponent = theme.template

  return (
    <div className="max-w-6xl mx-auto py-2 sm:py-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium text-gray-800">プレビュー</h1>
          <span className="text-xs bg-[#EAF3DE] text-[#3B6D11] px-2 py-0.5 rounded-full">
            {theme.label}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 sm:flex-none text-sm text-gray-500 px-4 py-3 sm:py-2 rounded-lg border border-gray-200 text-center"
          >
            ← 戻る
          </button>
          <PDFDownloadLink
            document={<TemplateComponent data={data} />}
            fileName="履歴書.pdf"
            className="flex-1 sm:flex-none bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-5 py-3 sm:py-2 rounded-lg text-center"
          >
            📥 PDFをダウンロード
          </PDFDownloadLink>
        </div>
      </div>

      {/* モバイル向けの注意書き */}
      <p className="sm:hidden text-xs text-gray-400 mb-3 text-center">
        プレビューはPCでの表示を推奨します。PDFダウンロードはモバイルからも利用できます。
      </p>

      {/* PDFビューワー */}
      <PDFViewer
        width="100%"
        height={typeof window !== 'undefined' && window.innerWidth < 640 ? 500 : 900}
        showToolbar={true}
        className="rounded-xl border border-gray-200"
      >
        <TemplateComponent data={data} />
      </PDFViewer>
    </div>
  )
}

import { useState } from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { useLocation, useNavigate } from 'react-router-dom'
import { TEMPLATES } from '../features/preview'
import type { ResumeData } from '../features/builder/schema'

export default function PreviewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = (location.state as { data: Partial<ResumeData> })?.data ?? {}
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0])

  const TemplateComponent = selectedTemplate.component

  return (
    <div className="max-w-6xl mx-auto py-2 sm:py-8">
      {/* ヘッダー: モバイルでは縦積み */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-lg font-medium text-gray-800">プレビュー</h1>
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

      {TEMPLATES.length > 1 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t)}
              className={`text-sm px-4 py-2 rounded-lg border ${
                selectedTemplate.id === t.id
                  ? 'bg-[#3B6D11] text-[#EAF3DE] border-[#3B6D11]'
                  : 'border-gray-200 text-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* モバイル向けの注意書き */}
      <p className="sm:hidden text-xs text-gray-400 mb-3 text-center">
        プレビューはPCでの表示を推奨します。PDFダウンロードはモバイルからも利用できます。
      </p>

      {/* PDFビューワー: モバイルは短め、デスクトップは全高 */}
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

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
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium text-gray-800">プレビュー</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 px-4 py-2 rounded-lg border border-gray-200"
          >
            ← 戻る
          </button>
          <PDFDownloadLink
            document={<TemplateComponent data={data} />}
            fileName="履歴書.pdf"
            className="bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-5 py-2 rounded-lg"
          >
            ダウンロード
          </PDFDownloadLink>
        </div>
      </div>

      {TEMPLATES.length > 1 && (
        <div className="flex gap-2 mb-4">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t)}
              className={`text-sm px-4 py-1.5 rounded-lg border ${
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

      {/* 見開き表示 */}
      <PDFViewer
        width="100%"
        height={900}
        showToolbar={true}
        className="rounded-xl border border-gray-200"
      >
        <TemplateComponent data={data} />
      </PDFViewer>
    </div>
  )
}
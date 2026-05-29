import { useRef, useState, useCallback } from 'react'
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

type Props = {
  defaultValues?: { photo?: string }
  onNext: (data: { photo?: string }) => void
  onBack: () => void
}

function centerAspectCrop(width: number, height: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 80 }, 3 / 4, width, height),
    width,
    height,
  )
}

function extractCrop(img: HTMLImageElement, crop: PixelCrop): string {
  const canvas = document.createElement('canvas')
  // 120×160px (3:4) に正規化して保存
  canvas.width = 120
  canvas.height = 160
  const ctx = canvas.getContext('2d')!
  const scaleX = img.naturalWidth / img.width
  const scaleY = img.naturalHeight / img.height
  ctx.drawImage(
    img,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    120,
    160,
  )
  return canvas.toDataURL('image/jpeg', 0.9)
}

export default function PhotoStep({ defaultValues, onNext, onBack }: Props) {
  const [src, setSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [saved, setSaved] = useState<string | undefined>(defaultValues?.photo)
  const imgRef = useRef<HTMLImageElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setSrc(ev.target?.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height))
  }, [])

  const confirmCrop = () => {
    if (!imgRef.current || !completedCrop) return
    setSaved(extractCrop(imgRef.current, completedCrop))
    setSrc(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">証明写真</h2>
        <p className="text-sm text-gray-500">
          写真は任意です。
          <span className="text-[#3B6D11] font-medium">写真なしでも作成できます。</span>
        </p>
      </div>

      {/* 切り抜きUI */}
      {src && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">枠を動かして範囲を調整し、「確定」を押してください（3:4）</p>
          <div className="overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-2">
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
              aspect={3 / 4}
              minWidth={50}
            >
              <img
                ref={imgRef}
                src={src}
                alt="crop preview"
                onLoad={onImageLoad}
                style={{ maxWidth: '100%', maxHeight: 380 }}
              />
            </ReactCrop>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={confirmCrop}
              disabled={!completedCrop}
              className="flex-1 bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-4 py-2.5 rounded-lg disabled:opacity-40"
            >
              確定
            </button>
            <button
              type="button"
              onClick={() => setSrc(null)}
              className="text-sm text-gray-500 px-4 py-2.5 rounded-lg border border-gray-200"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      {/* 保存済みプレビュー */}
      {!src && saved && (
        <div className="flex items-start gap-4">
          <img
            src={saved}
            alt="証明写真"
            className="w-24 h-32 object-cover rounded-lg border border-gray-200"
          />
          <div className="space-y-2 pt-1">
            <p className="text-sm text-gray-600">写真が設定されています</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="block text-sm text-[#3B6D11] border border-[#C0DD97] bg-[#EAF3DE] px-3 py-1.5 rounded-lg"
            >
              変更する
            </button>
            <button
              type="button"
              onClick={() => setSaved(undefined)}
              className="block text-sm text-red-400 hover:text-red-600"
            >
              削除する
            </button>
          </div>
        </div>
      )}

      {/* アップロードボタン（未設定時） */}
      {!src && !saved && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 text-sm text-gray-400 hover:border-[#C0DD97] hover:text-[#3B6D11] hover:bg-[#F7FBF3] transition-colors"
        >
          <span className="text-3xl block mb-2">📷</span>
          写真をアップロード
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-500 px-6 py-3 sm:py-2.5 rounded-lg border border-gray-200"
        >
          ← 戻る
        </button>
        <button
          type="button"
          onClick={() => onNext({ photo: saved })}
          className="bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-6 py-3 sm:py-2.5 rounded-lg"
        >
          次へ →
        </button>
      </div>
    </div>
  )
}

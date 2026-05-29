import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const simplePRSchema = z.object({
  motivation: z.string().optional(),
  preference: z.string().optional(),
})

type SimplePR = z.infer<typeof simplePRSchema>

type Props = {
  defaultValues?: Partial<SimplePR>
  onNext: (data: SimplePR) => void
  onBack: () => void
}

export default function SimplePRStep({ defaultValues, onNext, onBack }: Props) {
  const { register, handleSubmit } = useForm<SimplePR>({
    resolver: zodResolver(simplePRSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">志望動機・本人希望</h2>
        <p className="text-sm text-gray-500">任意入力です</p>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">志望動機</label>
        <textarea
          {...register('motivation')}
          rows={4}
          placeholder="志望動機を入力してください"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B6D11] resize-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">本人希望記入欄</label>
        <textarea
          {...register('preference')}
          rows={3}
          placeholder="特になし　/　希望勤務地：東京都内　/　給与：応相談"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B6D11] resize-none"
        />
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="text-sm text-gray-500 px-6 py-3 sm:py-2.5 rounded-lg border border-gray-200">
          ← 戻る
        </button>
        <button type="submit" className="bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-6 py-3 sm:py-2.5 rounded-lg">
          完了 ✓
        </button>
      </div>
    </form>
  )
}

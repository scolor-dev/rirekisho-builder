import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { historySchema } from '../schema'

type History = z.infer<typeof historySchema>

type Props = {
  defaultValues?: Partial<History>
  onNext: (data: History) => void
  onBack: () => void
}

const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
const YEARS = Array.from({ length: 50 }, (_, i) => String(new Date().getFullYear() - i))

export default function HistoryStep({ defaultValues, onNext, onBack }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<History>({
    resolver: zodResolver(historySchema),
    defaultValues: defaultValues ?? {
      histories: [{ year: '', month: '', type: 'education', content: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'histories' })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">学歴・職歴</h2>
        <p className="text-sm text-gray-500">時系列順に入力してください</p>
      </div>

      <div className="space-y-3">
        {fields.map((field, i) => (
          <div key={field.id} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <select
                {...register(`histories.${i}.type`)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#3B6D11]"
              >
                <option value="education">学歴</option>
                <option value="work">職歴</option>
              </select>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-xs text-red-400 hover:text-red-600 p-1"
                >
                  削除
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <select
                  {...register(`histories.${i}.year`)}
                  className="w-full border border-gray-200 rounded-lg px-2 sm:px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B6D11]"
                >
                  <option value="">年</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
                </select>
              </div>
              <div className="w-20 sm:w-24">
                <select
                  {...register(`histories.${i}.month`)}
                  className="w-full border border-gray-200 rounded-lg px-2 sm:px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B6D11]"
                >
                  <option value="">月</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
                </select>
              </div>
            </div>

            <div>
              <input
                {...register(`histories.${i}.content`)}
                placeholder={field.type === 'education' ? '〇〇大学 〇〇学部 入学' : '株式会社〇〇 入社'}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B6D11]"
              />
              {errors.histories?.[i]?.content && (
                <p className="text-xs text-red-500 mt-1">{errors.histories[i]?.content?.message}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ year: '', month: '', type: 'education', content: '' })}
        className="w-full text-sm text-[#3B6D11] border border-dashed border-[#C0DD97] rounded-xl py-3 hover:bg-[#EAF3DE]"
      >
        ＋ 追加する
      </button>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="text-sm text-gray-500 px-6 py-3 sm:py-2.5 rounded-lg border border-gray-200">
          ← 戻る
        </button>
        <button type="submit" className="bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-6 py-3 sm:py-2.5 rounded-lg">
          次へ →
        </button>
      </div>
    </form>
  )
}

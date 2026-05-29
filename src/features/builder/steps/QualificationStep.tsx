import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { qualificationSchema } from '../schema'

type Qualification = z.infer<typeof qualificationSchema>

type Props = {
  defaultValues?: Partial<Qualification>
  onNext: (data: Qualification) => void
  onBack: () => void
}

const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
const YEARS = Array.from({ length: 50 }, (_, i) => String(new Date().getFullYear() - i))

export default function QualificationStep({ defaultValues, onNext, onBack }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Qualification>({
    resolver: zodResolver(qualificationSchema),
    defaultValues: defaultValues ?? { qualifications: [] },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'qualifications' })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">資格・免許</h2>
        <p className="text-sm text-gray-500">取得した資格・免許を入力してください</p>
      </div>

      <div className="space-y-3">
        {fields.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">資格・免許がない場合はそのまま次へ</p>
        )}
        {fields.map((_, i) => (
          <div key={fields[i].id} className="border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-xs text-red-400 hover:text-red-600 p-1"
              >
                削除
              </button>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <select
                  {...register(`qualifications.${i}.year`)}
                  className="w-full border border-gray-200 rounded-lg px-2 sm:px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B6D11]"
                >
                  <option value="">年</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
                </select>
              </div>
              <div className="w-20 sm:w-24">
                <select
                  {...register(`qualifications.${i}.month`)}
                  className="w-full border border-gray-200 rounded-lg px-2 sm:px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B6D11]"
                >
                  <option value="">月</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
                </select>
              </div>
            </div>

            <input
              {...register(`qualifications.${i}.name`)}
              placeholder="普通自動車第一種運転免許"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3B6D11]"
            />
            {errors.qualifications?.[i]?.name && (
              <p className="text-xs text-red-500 mt-1">{errors.qualifications[i]?.name?.message}</p>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ year: '', month: '', name: '' })}
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

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { contactSchema } from '../schema'

type Contact = z.infer<typeof contactSchema>

type Props = {
  defaultValues?: Partial<Contact>
  onNext: (data: Contact) => void
  onBack: () => void
}

export default function ContactStep({ defaultValues, onNext, onBack }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">連絡先</h2>
        <p className="text-sm text-gray-500">電話番号・メールアドレスを入力してください</p>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">電話番号</label>
        <input {...register('phone')} placeholder="09012345678" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]" />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">メールアドレス</label>
        <input {...register('email')} placeholder="taro@example.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]" />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="text-sm text-gray-500 px-6 py-2.5 rounded-lg border border-gray-200">
          ← 戻る
        </button>
        <button type="submit" className="bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-6 py-2.5 rounded-lg">
          完了 ✓
        </button>
      </div>
    </form>
  )
}
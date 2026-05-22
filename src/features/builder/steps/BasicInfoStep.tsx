import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { z } from 'zod'
import { basicInfoSchema } from '../schema'

type BasicInfo = z.infer<typeof basicInfoSchema>

type Props = {
  defaultValues?: Partial<BasicInfo>
  onNext: (data: BasicInfo) => void
}

export default function BasicInfoStep({ defaultValues, onNext }: Props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BasicInfo>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues,
  })

  const [zipLoading, setZipLoading] = useState(false)
  const [zipError, setZipError] = useState('')

  const searchByZip = async (zip: string) => {
    const clean = zip.replace(/-/g, '')
    if (clean.length !== 7) return
    setZipLoading(true)
    setZipError('')
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${clean}`)
      const json = await res.json()
      if (json.results) {
        const { address1, address2, address3 } = json.results[0]
        setValue('address', `${address1}${address2}${address3}`, { shouldValidate: true })
      } else {
        setZipError('住所が見つかりませんでした')
      }
    } catch {
      setZipError('検索に失敗しました')
    } finally {
      setZipLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-1">基本情報</h2>
        <p className="text-sm text-gray-500">氏名・生年月日・住所を入力してください</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">姓</label>
          <input {...register('lastName')} placeholder="山田" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]" />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">名</label>
          <input {...register('firstName')} placeholder="太郎" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]" />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">セイ</label>
          <input {...register('lastNameKana')} placeholder="ヤマダ" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]" />
          {errors.lastNameKana && <p className="text-xs text-red-500 mt-1">{errors.lastNameKana.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">メイ</label>
          <input {...register('firstNameKana')} placeholder="タロウ" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]" />
          {errors.firstNameKana && <p className="text-xs text-red-500 mt-1">{errors.firstNameKana.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">生年月日</label>
        <input type="date" {...register('birthDate')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]" />
        {errors.birthDate && <p className="text-xs text-red-500 mt-1">{errors.birthDate.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">性別</label>
        <select {...register('gender')} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]">
          <option value="">選択しない</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div className="space-y-2">
        <div>
          <label className="block text-sm text-gray-600 mb-1">郵便番号</label>
          <div className="flex gap-2">
            <input
              {...register('zipCode')}
              placeholder="1000001"
              maxLength={8}
              className="w-36 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]"
              onChange={e => {
                register('zipCode').onChange(e)
              }}
            />
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector<HTMLInputElement>('input[name="zipCode"]')
                if (el) searchByZip(el.value)
              }}
              disabled={zipLoading}
              className="text-sm text-[#3B6D11] border border-[#C0DD97] bg-[#EAF3DE] px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {zipLoading ? '検索中...' : '住所を検索'}
            </button>
          </div>
          {zipError && <p className="text-xs text-red-500 mt-1">{zipError}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">住所</label>
          <input {...register('address')} placeholder="東京都渋谷区..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#3B6D11]" />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="bg-[#3B6D11] text-[#EAF3DE] text-sm font-medium px-6 py-2.5 rounded-lg">
          次へ →
        </button>
      </div>
    </form>
  )
}
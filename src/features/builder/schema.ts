import { z } from 'zod'

export const basicInfoSchema = z.object({
  lastName: z.string().min(1, '姓は必須です'),
  firstName: z.string().min(1, '名は必須です'),
  lastNameKana: z.string().min(1, 'セイは必須です'),
  firstNameKana: z.string().min(1, 'メイは必須です'),
  birthDate: z.string().min(1, '生年月日は必須です'),
  gender: z.enum(['male', 'female', 'other', '']).optional(),
  zipCode: z.string().regex(/^\d{3}-?\d{4}$/, '郵便番号の形式が正しくありません').optional(),
  address: z.string().min(1, '住所は必須です'),
})

export const contactSchema = z.object({
  phone: z.string().regex(/^0\d{9,10}$/, '電話番号の形式が正しくありません'),
  email: z.string().email('メールアドレスの形式が正しくありません'),
})

export const resumeSchema = basicInfoSchema.merge(contactSchema)
export type ResumeData = z.infer<typeof resumeSchema>
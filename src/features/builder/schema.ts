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

export const historyItemSchema = z.object({
  year: z.string().min(1, '年は必須です'),
  month: z.string().min(1, '月は必須です'),
  type: z.enum(['education', 'work']),
  content: z.string().min(1, '内容は必須です'),
})

export const historySchema = z.object({
  histories: z.array(historyItemSchema).min(1, '1件以上入力してください'),
})

export const qualificationItemSchema = z.object({
  year: z.string().min(1, '年は必須です'),
  month: z.string().min(1, '月は必須です'),
  name: z.string().min(1, '資格名は必須です'),
})

export const qualificationSchema = z.object({
  qualifications: z.array(qualificationItemSchema),
})

export const prSchema = z.object({
  motivation: z.string().optional(),
  selfPR: z.string().optional(),
})

export const preferenceSchema = z.object({
  preference: z.string().optional(),
})

export const resumeSchema = basicInfoSchema
  .merge(contactSchema)
  .merge(historySchema)
  .merge(qualificationSchema)
  .merge(prSchema)
  .merge(preferenceSchema)

export type ResumeData = z.infer<typeof resumeSchema>
export type HistoryItem = z.infer<typeof historyItemSchema>
export type QualificationItem = z.infer<typeof qualificationItemSchema>
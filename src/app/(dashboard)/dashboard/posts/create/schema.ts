import {z} from 'zod'

export const createPostSchema = z.object({
    title: z.string()
    .min(3, 'Заголовок должен быть минимум 3 символа')
    .max(100, 'Заголовок должен быть не длиннее 100 символов'),
    body: z
    .string()
    .min(10, 'Текст должен быть минимум 10 символов')
    .max(5000, 'Текст должен быть не длиннее 5000 символов'),
}) 

export type CreatePostFormData = z.infer<typeof createPostSchema>
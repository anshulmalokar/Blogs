import {z} from "zod";

export const loginValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(100),
})

export type LoginData = z.infer<typeof loginValidationSchema>

export type BlogData = {
   title: string,
   content: string,
   published?: boolean,
   authodId: string
}
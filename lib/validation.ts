import { z } from "zod"


export const registerSchema = z.object({
  fullname: z.string().min(3, { message: "Full name must be at least 3 characts" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  phone: z.string().min(13, { message: "Password must be at least 6 characters" })
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const orderSchema = z.object({
  size: z.string(),

})
export const idSchema = z.object({ id: z.string() })
export const searchParamsSchema = z.object({
  searchQuery: z.string().optional(),
  filter: z.string().optional(),
  category: z.string().optional(),
  page: z.string().default('1'),

})

export const commentSchema = z.object({
  
  message: z.string(),
  comment: z.string(),
  touser: z.string()
})

export const statusSchema = z.object({
  
  messageId: z.string(),
  newstatus: z.string()

})
export const bookSchema = z.object({
  name: z.string(),
  overview: z.string(),
  author: z.string(),
  // published: z.string().date(),
  pages: z.string(),
  language: z.string(),
  categories: z.string(),
  publisher: z.string(),
  ISBN: z.string(),
  price: z.string(),
  isfree: z.string(),
  cover: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Fayl tanlanmagan",
    })
    .refine((file) => {
      return file ? file.size < 5 * 1024 * 1024 : false;
    }, {
      message: "Fayl hajmi 5MB dan katta bo'lmasligi kerak",
    })
    .refine((file) => {
      return file ? ["image/jpeg", "image/png"].includes(file.type) : false;
    }, {
      message: "Faqat JPEG yoki PNG formatidagi fayllar",
    }),

  file: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Fayl tanlanmagan",
    })
    .refine((file) => file && file.size < 50 * 1024 * 1024, {
      message: "Fayl hajmi 50MB dan katta bo'lmasligi kerak",
    })
    .refine((file) => {
      const allowedTypes = [
        "application/pdf", // .pdf
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
      ]
      return file && allowedTypes.includes(file.type)
    }, {
      message: "Faqat PDF yoki Word (DOC, DOCX) fayllarga ruxsat beriladi",
    })

})

export const productSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  picture: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Fayl tanlanmagan",
    })
    .refine((file) => {
      return file ? file.size < 5 * 1024 * 1024 : false;
    }, {
      message: "Fayl hajmi 5MB dan katta bo'lmasligi kerak",
    })
    .refine((file) => {
      return file ? ["image/jpeg", "image/png"].includes(file.type) : false;
    }, {
      message: "Faqat JPEG yoki PNG formatidagi fayllar",
    }),
  description: z.string(),
  color: z.string().min(2, { message: "Rang nomi 2 ta belgidan kam bolmasili kerak" }),
  material: z.string().min(2, { message: "Material nomi 2 ta belgidan kam bolmasili kerak" }),
  kind: z.string().min(2, { message: "Tur nomi 2 ta belgidan kam bolmasili kerak" }),
  price: z.string()
});



export const itemSchema = z.object({
  dress: z.string().min(1, "Dress ID majburiy"),
  size: z.string().min(1, { message: "Size" })
});

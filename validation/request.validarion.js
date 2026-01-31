import {z} from "zod"

export const requestsignupvalidation = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const requestloginvalidation = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

export const requesturlvalidation = z.object({
    url : z.string().url(),
    code : z.string().optional()
})
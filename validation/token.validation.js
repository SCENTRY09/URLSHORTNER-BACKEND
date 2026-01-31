import {z} from "zod"

export const tokenvalidate = z.object({
    token: z.string()
})
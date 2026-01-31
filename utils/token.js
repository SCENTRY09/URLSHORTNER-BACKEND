import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {tokenvalidate } from "../validation/token.validation.js"

export const createtoken = (payload) => {
const validatetoken = tokenvalidate.safeParseAsync(payload)

if(validatetoken.error)
{
    return res.status(400).json(validatetoken.error.format())
}
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}



export const verifytoken = (token) => {
    try {
         const verify = jwt.verify(token, process.env.JWT_SECRET)
         return verify
    } catch (error) {
         return null
    }
}
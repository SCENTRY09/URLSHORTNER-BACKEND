import express from "express";
import { nanoid } from "nanoid";
import { db } from "../db/index.js";
import { urlTable } from "../models/schema.js";
import { requesturlvalidation } from "../validation/request.validarion.js";
import { ensureAuthentication} from "../middleware/auth.middleware.js"
import {inserturl} from "../services/url.services.js"
import { and,eq } from "drizzle-orm";
import { error } from "console";

const route = express.Router();

route.post("/shorten", ensureAuthentication,async (req, res) => {

   const validateurl = await requesturlvalidation.safeParseAsync(req.body);

  if (!validateurl.success) {
    return res.status(400).json({
      error: validateurl.error.format(),
    });
  }

  const { url, code } = validateurl.data;
  const shortcode = code ?? nanoid(6);

  // ✅ FIX IS HERE (await)
  const result= await inserturl({url,shortcode,userId: req.user.id})

  return res.status(200).json({
    id: result.id,
    code: result.code,
    targetUrl: result.targetUrl,
    userid:result.userId
  });
});

route.get("/allurl" ,ensureAuthentication,async(req,res) =>{

      const result = await db.select().from(urlTable).where(eq(urlTable.userId,req.user.id))

      return res.json({result})
})

route.delete("/:id" , ensureAuthentication,async(req,res) =>{
    const id = req.params.id

    await db
    .delete(urlTable)
    .where(
      and(
        eq(urlTable.id, id),
        eq(urlTable.userId, req.user.id)
      )
    )
    return res.status(200).json({delete:true})
})

route.get("/:code" , async (req,res) =>{
    const shortcode = req.params.code
    
     const [result] = await db.select({url:urlTable.targetUrl}).from(urlTable).where(eq(shortcode,urlTable.code))

     if(!result)
     {
        return res.status(404).json({error:"url not found"})
     }

     return res.redirect(result.url)
})
export default route;

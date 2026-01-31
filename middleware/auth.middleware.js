import {verifytoken } from  "../utils/token.js"

export function authenticateuser  (req, res, next) {
    
     const authheader = req.headers.authorization

     if(!authheader) {
        return next();
     }

     if(!authheader.startsWith("Bearer ")) {
        return res.status(400).json({message : "token not start with bearer"})
     }

     const [_,token] = authheader.split(" ")

     const payload = verifytoken(token)
     
     if(!payload) {
        return res.status(401).json({message : "invalid or expired token"})
     }
     
     req.user = payload
     next();
}

export function ensureAuthentication (req,res,next) {
      if(!req.user || !req.user?.id)
      {
         return res.status(401).json({
         message: "you are not logged in to access this resource",
        });
      }

      next();
}
import {db} from "../db/index.js"
import {usersTable} from "../models/schema.js"
import express from "express"
import {requestsignupvalidation,requestloginvalidation}  from "../validation/request.validarion.js"
import { createHashPassword } from "../utils/hashpassword.js"
import { getUserByEmail } from "../services/userservice.js"
import  jwt  from "jsonwebtoken"
import {createtoken} from "../utils/token.js"
const router = express.Router()

router.post("/signup", async (req, res) => {
  try {
    const validateUser = await requestsignupvalidation.safeParseAsync(req.body);

    if (!validateUser.success) {
      return res.status(400).json({
        error: validateUser.error.format(),
      });
    }

    const { firstname, lastname, email, password } = validateUser.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const { salt, hashPassword } = createHashPassword(password);

    const [user] = await db
      .insert(usersTable)
      .values({
        firstname,
        lastname,
        email,
        password: hashPassword,
        salt,
      })
      .returning({ id: usersTable.id });

    return res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


router.post("/login", async (req, res) => {

  const validateUser = await requestloginvalidation.safeParseAsync(req.body);

  // ✅ FIX 1: correct Zod check
  if (!validateUser.success) {
    return res.status(400).json({
      error: validateUser.error.format(),
    });
  }

  const { email, password } = validateUser.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const hashed = createHashPassword(password, existingUser.salt);

  // ✅ FIX 2: correct comparison
  if (hashed.hashPassword !== existingUser.password) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // ✅ FIX 3: token payload is correct
  const token = createtoken({
    id: existingUser.id,
  });

  return res.status(200).json({
    message: "User logged in successfully",
    token,
  });
});

export default router
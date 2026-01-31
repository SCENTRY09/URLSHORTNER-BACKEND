import {db} from "../db/index.js"
import {usersTable} from "../models/schema.js"
import { eq } from "drizzle-orm"

export const getUserByEmail = async (email) => {

    
    const [user] = await db.select( {id: usersTable.id,
    firstname: usersTable.firstname,
    lastname: usersTable.lastname,
    email: usersTable.email,
    salt: usersTable.salt,
    password: usersTable.password
    }).from(usersTable).where(eq(usersTable.email, email))
    return user
}
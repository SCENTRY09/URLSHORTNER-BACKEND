import { randomBytes ,createHmac} from "crypto"


export const createHashPassword = (password,usersalt) => {
const salt = usersalt ?? randomBytes(32).toString("hex")
const hashPassword = createHmac("sha256", salt).update(password).digest("hex")
return {salt, hashPassword}
}
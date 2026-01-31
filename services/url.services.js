import {db} from "../db/index.js"
import {urlTable ,usersTable} from "../models/schema.js"



export async function inserturl({ url, shortcode, userId }) {
  const [result] = await db
    .insert(urlTable)
    .values({
      code: shortcode,
      targetUrl: url,
      userId: userId,
    })
    .returning({
      id: urlTable.id,
      code: urlTable.code,
      targetUrl: urlTable.targetUrl,
      userId: urlTable.userId,
    });

  return result;
}
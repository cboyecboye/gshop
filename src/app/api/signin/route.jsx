import { executeDB } from "@/utils/mysqldb";
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    let token;
    const userExist = await executeDB(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (userExist.error == "") {
      if (userExist.rows.length > 0) {
        const isMatch = Bcrypt.compareSync(
          password,
          userExist.rows[0].password
        );

        if (isMatch) {
          token = JWT.sign({ username: username }, "privatekey", {
            expiresIn: 60 * 60,
          });

          cookies().set("token", token);
          console.log("set cookies")
          return Response.json({ error: "", message: token });
        } else {
          throw "รหัสผ่านไม่ถูกต้อง";
        }
      } else {
        return Response.json({error : 'ชื่อผู้ใช้ไม่ถูกต้อง',message : ''});
      }
    } else {
      throw userExist.error;
    }
  } catch (error) {
    return Response.json({ error, message: "" });
  }
}

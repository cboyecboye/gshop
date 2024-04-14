import { executeDB } from "@/utils/mysqldb";
import Bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { username, password, email } = await request.json();

    const salt = Bcrypt.genSaltSync(10);
    const hashpass = Bcrypt.hashSync(password, salt);

    const data = [username, hashpass, email];
    const sql = "INSERT INTO users (username, password, email) VALUES (?,?,?)";

    const insertData = await executeDB(sql, data);
    if (insertData.error) {
      throw insertData;
    } else {
      console.log("rows", insertData.rows);
      return Response.json(
        { message: "Insert New User Successfully" },
        { status: 201 }
      );
    }
  } catch (err) {
    console.log("error", err);
    return Response.json({ error: err });
  }
}

"use server";

import { executeDB } from "@/utils/mysqldb";

export async function signupAction(prevState, formData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const userExist = await executeDB(
      "SELECT * FROM users WHERE username = ?",
      [data.username]
    );

    if (!userExist.error && userExist.rows.length > 0) {
      return "ชื่อผู้ใช้ มีอยู่แล้ว";
    }

    const emailExist = await executeDB("SELECT * FROM users WHERE email = ?", [
      data.email,
    ]);
    if (!emailExist.error && emailExist.rows.length > 0) {
      return "อีเมล  มีอยู่แล้ว";
    }

    const emailCheck = await executeDB(
      "SELECT * FROM employees WHERE email = ?",
      [data.email]
    );

    if (!emailCheck.error && emailCheck.rows.length === 0) {
      return "อีเมล ไม่มีในระบบโปรดติดต่อผู้ดูแลระบบ";
    }

    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("result is ", result);
    return;
  } catch (error) {}
}

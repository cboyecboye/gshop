import SignUpForm from "@/components/form/signupform";
import React from "react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center p-3">
      <h1 className="text-2xl">เพิ่มข้อมูลผู้ใช้ใหม่</h1>
      <hr />
      <SignUpForm />
      <div className="mt-10 text-sm italic">
        Already have an Account ... Please{" "}
        <span className="text-base underline underline-offset-2 text-emerald-600 not-italic">
          <Link href='/signin'>Signin</Link>
        </span>
      </div>
    </main>
  );
}

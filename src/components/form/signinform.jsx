"use client";
import { signinAction } from "@/actions/signinaction";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

function SigninSubmit() {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-5">
      <button className="confirm-button" type="submit" disabled={pending}>
        {pending ? "กำลังดำเนินการ..." : "เข้าสู่ระบบ"}
      </button>

      <button
        className="reset-button"
        disabled={pending}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        ยกเลิก
      </button>
    </div>
  );
}

export default function SignInForm() {
  const [state, signinCreate] = useFormState(signinAction, null);

  return (
    <form className="flex flex-col items-center gap-3" action={signinCreate}>
      {state && <span className="text-error">{state}</span>}
      <fieldset className="flex flex-col">
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          placeholder="ชื่อผู้ใช้"
          required
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          placeholder="รหัสผ่าน"
          required
        />
      </fieldset>
      <SigninSubmit />
    </form>
  );
}

"use client";
import { signupAction } from "@/actions/signupaction";
import React, { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SignUpSubmit({ value }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="confirm-button"
      disabled={pending || value}
    >
      {pending ? "กำลังดำเนินการ..." : "เพิ่มข้อมูลผู้ใช้"}
    </button>
  );
}

export default function SignUpForm() {
  const [state, signupCreate] = useFormState(signupAction, null);
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [checkError, setCheckError] = useState("");

  useEffect(() => {
    if (pass != confirm) {
      setCheckError("รหัสผ่านไม่ตรงกัน");
    } else {
      setCheckError("");
    }
  }, [pass, confirm]);
  return (
    <form action={signupCreate} className="flex flex-col gap-3">
      {state && <span className="text-error">{state}</span>}
      <fieldset className="flex flex-col">
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="ชื่อผู้ใช้"
          autoComplete="off"
          required
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="อีเมล"
          autoComplete="off"
          required
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="รหัสผ่าน"
          autoComplete="off"
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm Password :</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="ยืนยันรหัสผ่าน"
          autoComplete="off"
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </fieldset>
      {checkError && <span className="text-error">{checkError}</span>}
      <SignUpSubmit value={checkError} />
    </form>
  );
}

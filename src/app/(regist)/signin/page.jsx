import SignInForm from '@/components/form/signinform';
import React from 'react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <main>
      <h1 className='text-2xl '>เข้าใช้งานระบบ</h1>
      <hr />
      <SignInForm />
      <div className="text-sm italic mt-10">
        Don't have an Account ... Please {" "}
        <span className=" text-base not-italic underline underline-offset-2 text-blue-600">
          <Link href="/signup"> SignUp </Link>
        </span>
      </div>
    </main>
  )
}

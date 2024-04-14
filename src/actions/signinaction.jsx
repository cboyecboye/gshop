'use server'
import { cookies } from "next/headers";

export async function signinAction(prevState, formData){
  const data = {
    username : formData.get('username'),
    password : formData.get('password')
  }

  const res = await fetch('http://localhost:3000/api/signin',{
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
  });

  const { error , message } = await res.json();
  if (error){
    return error;
  } else {
    const cookiesStroe = cookies().get('token');
    console.log("message = ", cookiesStroe);
  }
}
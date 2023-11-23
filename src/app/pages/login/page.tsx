"use client";

import { UID, auth } from "@/firebase";
import { setUsers } from "@/store/Reducers/userLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.login.user?.uid == UID);

  const setUser = (payload: any) => {
    dispatch(setUsers(payload));
  };

  const signIn = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        window.location.href = '/pages/apanel';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  useEffect(() => {
  }, []);

  return user ? <h1>Вы уже вошли</h1> : (
    <div>
      <br />
      <form action={signIn} className="flex flex-col space-y-3">
        <label className="">
          <p>
            Email:
          </p>
          <input type="email" name="email" className="p-1 rounded" />
        </label>
        <label>
          <p>
            Password:
          </p>
          <input type="password" name="password" className="p-1 rounded" />
        </label>
        <button type="submit" className="text-left">Войти</button>
      </form>
    </div>
  );
};
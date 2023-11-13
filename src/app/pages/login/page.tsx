"use client";

import { UID, auth } from "@/firebase";
import { setUsers } from "@/store/Reducers/userLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.login.user?.uid == UID);

  const setUser = (payload: any) => {
    dispatch(setUsers(payload));
  };

  const clearInputs = (e?: any) => {
    setEmail('');
    setPassword('');
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        clearInputs();
        window.location.href = '/pages/apanel';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  useEffect(() => {
    clearInputs();
  }, []);

  return user ? <h1>Вы уже вошли</h1> : (
    <div>
      <br />
      <form onSubmit={signIn} className="flex flex-col w-1/4 space-y-3">
        <label className="">
          Email:
          <input type="email" name="email" ref={emailRef} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" ref={passwordRef} name="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
"use client";
import { UID, auth } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Apanel() {
  const user = useSelector((state: any) => state.login.user?.uid == UID);
  const [error, setError] = useState('');

  const signUp = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const nickname = data.get("nickname") as string;


    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: nickname || null
        }).catch((error) => { console.error(error); });
      })
      .catch((error) => { setError(error); });
  };

  return !user ? <h1>Доступ запрещён</h1> : (
    <form action={signUp} className="flex flex-col space-y-3">
      <label>
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
      <label>
        <p>
          Nickname:
        </p>
        <input type="text" name="nickname" className="p-1 rounded" />
      </label>
      <button className="text-left">Добавить пользователя</button>
    </form>
  );
}
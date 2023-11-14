"use client";
import { UID, auth } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Apanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const user = useSelector((state: any) => state.login.user?.uid == UID);

  const signUp = async (e: any) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => { console.error(error); });

    await updateProfile(auth.currentUser!, {
      displayName: nickname || null
    }).catch((error) => { console.error(error); });
  };

  return !user ? <h1>Доступ запрещён</h1> : (
    <form onSubmit={signUp} className="flex flex-col space-y-3">
      <label>
        <p>
          Email:
        </p>
        <input type="email" name="email"
          onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <p>
          Password:
        </p>
        <input type="password" name="password"
          onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        <p>
          Nickname:
        </p>
        <input type="text" name="Nickname"
          onChange={(e) => setNickname(e.target.value)} />
      </label>
      <button type="submit" className="text-left">Добавить пользователя</button>
    </form>
  );
}
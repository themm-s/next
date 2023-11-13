import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export async function useUser() {
  const user = await new Promise((resolve) => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
      }
      return () => {
        listen();
      };
    });
  });
  return user;
}
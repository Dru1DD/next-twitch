"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log("Sesssion", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          signIn()
        }}
        className="bg-blue-800 rounded-xl p-5"
      >
        TWITCH
      </button>
      <button
        onClick={() => {
          signOut()
        }}
        className="bg-blue-800 rounded-xl p-5"
      >
        Sing out 
      </button>
    </main>
  );
}

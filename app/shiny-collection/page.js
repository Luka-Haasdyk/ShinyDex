"use client";

import { AuthProvider, useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import PokemonList from "./pokemon-list";

function ShinyCollectionContent() {
  const { signOutUser } = useUserAuth();
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOutUser();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="bg-white dark:bg-white h-full">
      <header className="fixed top-0 left-0 right-0 flex items-center border-b border-b-slate-950 bg-forestGreenMedium dark:bg-forestGreenMedium h-20 z-10">
        <img
          className="w-auto h-auto ml-5"
          src="https://fontmeme.com/permalink/241120/430f391912b78a5a029fb3bbe6080dd6.png"
          alt="ShinyDex"
        />
        <p className="text-xs mt-6 ml-2 text-orange-300 dark:text-orange-300">by: Luka Haasdyk</p>
        <button
          className="ml-auto mr-5 px-4 py-2 border flex gap-2 bg-gray-800 dark:bg-gray-800 border-slate-200 dark:border-slate-700 rounded-lg text-slate-200 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-300 dark:hover:text-slate-300 hover:shadow transition duration-150"
          onClick={handleSignOut}
        >
          <span> Sign Out </span>
        </button>
      </header>
      <PokemonList />
    </main>
  );
}

export default function ShinyCollectionPage() {
  return (
    <AuthProvider>
      <ShinyCollectionContent />
    </AuthProvider>
  );
}

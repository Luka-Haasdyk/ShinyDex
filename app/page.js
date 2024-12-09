"use client";

import { AuthProvider, useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";

function SignInPageContent() {
  const { user, signInWithGoogle } = useUserAuth();
  const router = useRouter();

  async function handleSignIn() {
    try {
      await signInWithGoogle();
      setTimeout(() => {
        router.push("/shiny-collection");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="overflow-auto min-h-screen flex flex-col bg-cover animate-background-move">
      <header className="fixed top-0 left-0 right-0 flex items-center border-b border-b-slate-950 bg-forestGreenMedium h-20 z-10">
        <img
          className="w-auto h-auto ml-5"
          src="https://fontmeme.com/permalink/241120/430f391912b78a5a029fb3bbe6080dd6.png"
          alt="ShinyDex"
        />
        <p className="text-xs mt-6 ml-2 text-orange-300">by: Luka Haasdyk</p>
      </header>
      <div className="flex-grow flex items-center justify-center">
        {user ? (
          <div className="flex flex-col items-center text-center bg-forestGreenMedium p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-2 text-orange-300">
              Hey there {user.displayName}!
            </h1>
            <p className="font-bold mb-2 text-orange-300">
              Loading your ShinyDex...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center bg-forestGreenMedium p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-2 text-orange-300">
              Welcome to
            </h1>
            <img
              className="w-auto h-auto my-4"
              src="https://fontmeme.com/permalink/241120/430f391912b78a5a029fb3bbe6080dd6.png"
              alt="ShinyDex"
            />
            <h1 className="font-bold mt-2 text-orange-300">
              Your Personal Pokemon GO Shiny Collection
            </h1>
            <button
              className="mt-10 px-4 py-2 border flex items-center gap-2 bg-gray-800 dark:bg-gray-800 border-slate-700 dark:border-slate-700 rounded-lg text-slate-200 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-300 dark:hover:text-slate-300 hover:shadow transition duration-150"
              onClick={handleSignIn}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <SignInPageContent />
    </AuthProvider>
  );
}

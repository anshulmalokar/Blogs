"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

type Props = {};

export default function AppBar({}: Props) {
  const { data: session } = useSession();

  return (
    <div className="bg-gray-800 py-4 px-6 flex justify-between items-center border-b-2 border-gray-700">
      <div className="text-white text-lg font-semibold">
        {(!session)?<>Medium</>:<>Blogs for {session?.user?.name}</>}
      </div>
      <div>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

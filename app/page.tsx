"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from " next/navigation";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        <div
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: 'url("/newspaper-image.jpg")' }}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-lg mb-4">Welcome to Our Blog Platform</p>
              <p className="text-lg mb-6">
                Please click the button below to access our extensive collection
                of blogs and expand your knowledge!
              </p>
              <button
                onClick={() => router.push("/blogs")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Click Here
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: 'url("/newspaper-image.jpg")' }}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold mb-4">
                Welcome to Our Blog Platform
              </h2>
              <p className="text-lg mb-6">
                Expand your knowledge with our vast collection of insightful
                blogs covering a wide range of topics.
              </p>
              <p className="text-lg mb-6">
                Sign in now to unlock access to our premium content and start
                your journey towards learning and discovery!
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

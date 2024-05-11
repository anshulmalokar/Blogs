"use client";
import React, { useEffect, useState } from "react";
import { addBlog } from "@/app/lib/actions";
import { useSession,signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BlogForm({ setShowForm }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  
  const setTitleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setContentData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  async function addBlogsToTable() {
    alert("Title :" + title + " is being published to the world");
    if (session) {
      const obj: any = session;
      const id:string = obj?.id;
      console.log(id);
      try {
        const ans:boolean = await addBlog({
          authodId: id,
          content: content || "",
          title: title || ""
        });
        // Check if the blog was successfully added
        if (ans) {
          router.push('/blogs');
          setShowForm(false);
        } else {
          alert("Failed to add blog. Please try again.");
        }
      } catch (error) {
        console.error("Error adding blog:", error);
        alert("An error occurred while adding the blog. Please try again later.");
      }
    } else {
      alert("No valid session");
      signIn();
    }
  }
  

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-screen-lg">
          {" "}
          {/* Adjust the width here */}
          <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
          <form>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                onChange={(e) => setTitleData(e)}
                type="text"
                id="title"
                name="title"
                className="mt-1 p-3 border rounded-md w-full"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Content
              </label>
              <textarea
                onChange={(e) => {setContentData(e)}}
                id="content"
                name="content"
                rows={8}
                className="mt-1 p-3 border rounded-md w-full"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                onClick={addBlogsToTable}
                type="button"
                className="ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              >
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

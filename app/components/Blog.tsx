"use client";
import React from "react";
import { useRouter } from "next/navigation";

type BlogData = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  date: Date;
  authorId: string;
};

type Props = {
  data: BlogData;
};

export default function Blog({ data }: Props) {
  const router = useRouter();

  const trimContent = (content: string, maxLength: number) => {
    const words = content.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    } else {
      return content;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2 text-blue-700">{data.title}</h2>
      <p className="text-gray-700 mb-4">{trimContent(data.content, 30)}</p>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">
          Published:{" "}
          <span className={data.published ? "text-green-600" : "text-red-600"}>
            {data.published ? "Yes" : "No"}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Date:{" "}
          <span className="text-purple-600">
            {data.date.toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-gray-600">
          Author ID: <span className="text-orange-600">{data.authorId}</span>
        </p>
        <button
          onClick={() => {
            router.push(`/blog/${data.id}`);
          }}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

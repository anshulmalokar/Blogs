"use client"
import React, { useEffect, useState } from "react";
import { getBlogs } from "../actions/getBlogs";
import Blog from "@/app/components/Blog";
import AddBlogs from "../components/AddBlogs";

type Props = {};

type BlogData = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  date: Date;
  authorId: string;
};

export default function page({}: Props) {

  const [blogs,setBlogs] = useState<BlogData[]>([]);

  useEffect(()=>{
    const fetchBlogs = async() => {
      const dataFetched = await getBlogs(0,0);
      setBlogs(dataFetched);
    }
    fetchBlogs();
  },[,blogs])

  
  return (
    <div className="relative">
      <div>
        {blogs.map((item) => {
          return <Blog key={item.id} data={item} />;
        })}
      </div>
      <div className="fixed bottom-4 right-4">
        <AddBlogs />
      </div>
    </div>
  );
}

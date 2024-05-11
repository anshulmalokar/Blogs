"use client";
import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import BlogForm from "./BlogForm";
type Props = {};

export default function AddBlogs({}: Props) {
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <IoIosAddCircle onClick={handleAddClick} size={60} />
      {showForm && <BlogForm setShowForm={setShowForm} />}
    </>
  );
}

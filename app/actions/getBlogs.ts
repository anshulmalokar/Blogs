"use server"
import prisma from "@/app/db/index"
export async function getBlogs(startIndex: Number, offset: Number){
    const data = await prisma.post.findMany({});
    console.log(data);
    // apply pagination 
    // need limit of 10 items
    // skip the offset data
    return data;    
}
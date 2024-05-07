import { skip } from "node:test";
import prisma from "@/app/db/index";
import { BlogData } from "@/app/lib/validations";

// Function to add a blog
export async function addBlog(data:BlogData) {
    const res = await prisma.post.create({ 
        data: {
            title: data.title,
            content: data.content,
            authorId: data.authodId,
            date: new Date(),
            published: true
         } 
        }
    )
    return (!res)?false:true;
}

// function to get a blog
export async function getBlog(id: string) {
    return await prisma.post.findUnique({ where: { id } });
}

// Function to apply search on the blogs by filter
export async function findByFullTest(filter: string){
    const data = await prisma.post.findMany({
        where:{
            content: {
                contains: filter
            }
        }
    })
}

// Function to get all the blogs
export async function getBlogs(startIndex: Number, offset: Number){
    const data = await prisma.post.findMany({});
    console.log(data);
    // apply pagination 
    // need limit of 10 items
    // skip the offset data
    return data;    
}

// Function to delete the blog
export async function deleteBlog(id:string){
    const data = await prisma.post.delete({
        where:{
            id:id
        }
    })
    if(data){
        return true;
    }
    return false;
}

// Function to sort the blogs and get the sorted list
export async function sortBlogs(sortyBy: string){
    const data  = sortyBy === 'asc'? await prisma.post.findMany({
        orderBy: {
            date: "desc"
        }
    }) :
    await prisma.post.findMany({
        orderBy: {
            date: "desc"
        }
    })  
    return data; 
}

// Function to update the blogs
export async function updateBlog(id: string,params:{
    content?: string,
    title?: string,
    published?: boolean
}) {
    const data = await prisma.post.update({
        where:{
            id: id
        },
        data:{
            content: params.content,
            title: params.title,
            published: params.published
        }
    })
    if(data){
        return true;
    }
    return false;
}
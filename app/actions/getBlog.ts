import prisma from "@/app/db/index";
export async function getBlog(id: string) {
    return await prisma.post.findUnique({ where: { id } });
}
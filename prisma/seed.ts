import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

async function main() {
 
  const content = "It was 2007 when Paul Graham, a world-renowned technology expert, decided to dedicate himself to cybersecurity by creating a special blog. Initially, the website appeared to be a platform for regular news related to online security. It also aimed to make users more aware of online security.Today, the platform gathers millions of views each month and has more than three million subscribers on social networks. Currently, this blog deserves the title of one of the most professional resources, which covers security on the Internet, keeping users informed about the latest developments and technologies in the industry. Among the readers of the blog are both top-class experts and amateurs who are simply interested in the issue."

  const alice = await prisma.user.create({
    data:{
        email: "alice@gmail.com",
        name: "alice",
        password: (await bcrypt.hash("secret12",10)).toString()
    }
  }) 

  const bob = await prisma.user.create({
    data:{
        email: "bob@gmail.com",
        name: "bob",
        password: (await bcrypt.hash("secret12",10)).toString()
    }
  })

  const aliceBlog = await prisma.post.create({
    data:{
        content: content,
        title: "Alice Blog",
        authorId: alice.id,
        date: new Date(),
        published: true
    }
  })  

  const bobBlog = await prisma.post.create({
    data:{
      content: content,
      title: "Blog Post Title",
      authorId: bob.id,
      date: new Date(),
      published: true
    }
  })

  console.log({ aliceBlog, bobBlog })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
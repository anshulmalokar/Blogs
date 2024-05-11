import prisma from "../db/index";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { loginValidationSchema,LoginData } from "./validations";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: { label: "Name", type: "text", placeholder: "Jon Doe" },
            email: {label: 'Email', type: 'text', placeholder: 'jonDoe@gmail.com'},
            password: { label: "Password", type: "password" }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const {name,email,password} = credentials;

            // zod validation
            const validationResult = loginValidationSchema.safeParse({
                name,
                email,
                password
            })

            if(validationResult.success){
                // All the validations are correct
                const hashedPassword = await bcrypt.hash(password,10);
                // Check if the user is already present
                    const existingUser = await prisma.user.findFirst({
                        where:{
                            email: credentials.email
                        }
                    })
                    // Check if the password provided is the same or not
                    if(existingUser){
                       const checkPassword = await bcrypt.compare(hashedPassword,existingUser.password);
                       if(checkPassword){
                            return existingUser;
                       }else{
                            return null;
                       }
                    }
                // Create the user and add him in the database
                    const user = await prisma.user.create({
                        data:{
                            name: name,
                            email: email,
                            password: hashedPassword
                        }
                    })
                    return user;
            }

            // If the credentials are invalid then return null
            return null;
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async jwt({token, user}:any) {
            if (user?.id) {
                token.sub = user.id
            }
            return token
         },
        async session({ token, session }: any) {
            if(session?.user){
                session.id = token.sub;
            }
            return session;
        }
    }
  }
 
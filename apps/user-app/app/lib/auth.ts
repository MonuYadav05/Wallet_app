import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1234567890", required: true },
            password: { label: "Password", type: "password",placeholder:"*********", required: true }
          },
          async authorize(credentials: any) {
          
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });
            // console.log(existingUser)
            if (existingUser) {
                // console.log("Checking password for:", credentials.password);
        // console.log("Stored hashed password:", existingUser.password);

        const passwordValidation = await bcrypt.compare(credentials.password.trim(), existingUser.password);
        // console.log("Password validation result:", passwordValidation);
        
        if (passwordValidation) {
            return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.email
            };
        }
        // console.log("Password validation failed.");
        return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    },
    pages: {
        signIn: '/signin',
      },
  }
  
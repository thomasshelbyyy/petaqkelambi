import { login } from "@/lib/firebase/service"
// import { compare } from "bcrypt"
import bcryptjs from "bcryptjs"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: 'password' }
            },
            async authorize(credentials) {
                const { email, password } = credentials
                const user = await login({ email })

                if (user) {
                    const passwordConfirm = await bcryptjs.compare(password, user.password)
                    if (passwordConfirm) {
                        return user
                    }
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            if (account?.provider === "credentials") {
                token.id = user.id
                token.email = user.email
                token.username = user.username
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if ("email" in token) {
                session.user.email = token.email
            }
            if ("username" in token) {
                session.user.username = token.username
            }
            if ("role" in token) {
                session.user.role = token.role
            }
            if ("id" in token) {
                session.user.id = token.id
            }
            return session
        }
    },
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
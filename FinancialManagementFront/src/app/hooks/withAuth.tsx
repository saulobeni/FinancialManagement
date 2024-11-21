import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Substitua pela lógica de autenticação real
                if (credentials?.username === "admin" && credentials?.password === "1234") {
                    return { id: "1", name: "Admin User" }; // ID como string
                }
                return null;
            },
        }),
    ],
    jwt: {
        secret: process.env.JWT_SECRET || "your_secret_key",
    },
});

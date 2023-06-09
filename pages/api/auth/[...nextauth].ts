import NextAuth, { AuthOptions } from "next-auth";//https://ithelp.ithome.com.tw/articles/10274426
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "../../../lib/prismadb";
import {compare} from 'bcrypt';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import {PrismaAdapter} from '@next-auth/prisma-adapter';

export const authOptions : AuthOptions={
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID || '',
            clientSecret:process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID || '',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id:'credentials',//決定signin()的值
            name:'Credentials',
            credentials:{
                email:{
                    label: 'Email',
                    type:'text',
                },
                password:{
                    label:'Password',
                    type:'password',
                }
            },
            async authorize(credentials){
                console.log(credentials?.email)
                if(!credentials?.email || !credentials?.password){
                    console.log("Email and password required")
                    throw new Error('Email and password required');
                }

                const user= await prismadb.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                });
                
                if(!user || !user?.hashedPassword){
                    console.log("Email does not exist")
                    throw new Error('Email does not exist')
                };

                const isCorrectPassword= await compare(credentials.password,user.hashedPassword);
                if(!isCorrectPassword){
                    console.log("Incorrect password")
                    const error=new Error('Incorrect password')
                    throw error
                };
                return user;
            }
        })
    ],
    pages:{
        signIn:'/auth',
    },
    debug:process.env.NODE_ENV=='development',
    adapter:PrismaAdapter(prismadb),
    session:{
        strategy:'jwt',
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET,
    },
    secret:process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

//https://askie.today/react-main-concepts-part-1/
//https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Language_overview
//https://ithelp.ithome.com.tw/articles/10191549
//https://ithelp.ithome.com.tw/articles/10192739?sc=rss.qu
//https://ithelp.ithome.com.tw/articles/10191666
import Input from "../component/input";
import { useState,useCallback} from "react";
import axios from 'axios';
import {signIn} from 'next-auth/react';
import { useRouter } from "next/router";

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';

const Auth=()=>{
    const router=useRouter();
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [variant,setVariant]=useState("login");
    
    const toggleVariant=useCallback(()=>{//立即呼叫函式=>http://jason-wang.logdown.com/posts/1413047-to-immediately-call-reactrender-using-the-function-iife
        setVariant((variant)=>variant=='login'?'register':'login')
    },[])

    //login function
    const login = useCallback(async () => {
        try {
            /*await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
              });*/
        
              router.push('/profiles');
        } catch (error) {
          console.log(error);
        }
      }, [email, password,router]);

    //register function
    const register=useCallback(async ()=>{
        try{
            var a=await axios.post('/api/register',{
                email,
                name,
                password
            });
            console.log(a)
            login();
        }catch(error){
            console.log(error);
        }
    },[email,name,password,login]);

    
    return(
        <div className="relative h-full w-full bg-[url('/image/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black h-full w-full lg:bg-opacity-40">
                <nav className="px-12 py-5 bg-neutral-600 bg-opacity-70">
                    <img src="/image/logo.png" alt="logo" className="h-12"/>
                    
                </nav>
                <div className="flex justify-center"> 
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant=='login'?'Sign in':'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant=='register' && (
                            <Input
                                label="Username"
                                onChange={(event:any)=>setName(event.target.value)}
                                id="name"
                                type="name"
                                value={name}
                            />
                            )}
                            <Input
                                label="Email"
                                onChange={(event:any)=>setEmail(event.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onChange={(event:any)=>{setPassword(event.target.value)}}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant=='login'?login:register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant=='login'?'Login':'Sign up'}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div 
                            onClick={()=>{signIn('google',{callbackUrl:'/profiles'})}}
                            className="
                                w-10 h-10 bg-white rounded-full flex items-center justify-center
                                cursor-pointer hover:opacity-80 transition
                            ">
                                <FcGoogle size={30}/>
                            </div>
                            <div 
                            onClick={()=>{signIn('github',{callbackUrl:'/profiles'})}}
                            className="
                                w-10 h-10 bg-white rounded-full flex items-center justify-center
                                cursor-pointer hover:opacity-80 transition
                            "
                            >
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-gray-500 mt-12">
                            {variant=='login'?'First time using Netflix?':'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant=='login'?'Create an account':'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>     
        </div>
    );
}
export default Auth;
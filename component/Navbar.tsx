import { useState,useCallback,useEffect } from "react";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./mobilemenu";
import AccountMenu from "./accountMenu";

import {BsChevronDown,BsSearch,BsBellFill} from 'react-icons/bs';

const TOP_OFFSET=66;

const Navbar=()=>{
    const [showmenu,setShowmenu] =useState(false);
    const [showAccountmenu,setShowAccountMenu]=useState(false);
    const [showBackground,setShowBackground]=useState(false);
    
    useEffect(()=>{
        const handleScroll=()=>{
            if(window.scrollY>=TOP_OFFSET){
                setShowBackground(true);
            }else{
                setShowBackground(false);
            }
        window.addEventListener('scroll',handleScroll);
        return()=>{
            window.removeEventListener('scroll',handleScroll);
        }
        }
    },[]);

    const toggleMenu =useCallback(()=>{
        setShowmenu((current)=>!current)
    },[showmenu]);
    const toggleAccountMenu = useCallback(()=>{
        setShowAccountMenu(!showAccountmenu)
    },[showAccountmenu]);

    return(
        <nav className="w-full fixed z-40 bg-black bg-opacity-40">
            <div
            className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                ${showBackground?'bg-zinc-900 bg-opacity-90':''}
            `}>
                <img src="/image/logo.png" alt="logo" className="h-10 lg:h7"/>
                <div
                    className="
                        flex-row
                        ml-8
                        gap-7
                        hidden
                        lg:flex
                    "
                >
                    <NavbarItem label='home'/>
                    <NavbarItem label='series'/>
                    <NavbarItem label='films'/>
                    <NavbarItem label='new & popular'/>
                    <NavbarItem label='my list'/>
                    <NavbarItem label='browse by languages'/>
                    
                </div>
                <div onClick={toggleMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">browse</p>
                    <BsChevronDown className={`text-white transition transition ${showmenu? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showmenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gary-300 cursor-pointer transition">
                        <BsSearch/>
                    </div>
                    <div className="text-gray-200 hover:text-gary-300 cursor-pointer transition">
                        <BsBellFill/>
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/image/default-slate.png" alt='logo'/>
                        </div>
                        <BsChevronDown className={`w-4 text-white fill-white transition ${showAccountmenu? 'rotate-180' : 'rotate-0'}`}/>
                        <AccountMenu visible={showAccountmenu}/>
                    </div>
                </div>
            </div>
            
        </nav>
    )
}

export default Navbar;
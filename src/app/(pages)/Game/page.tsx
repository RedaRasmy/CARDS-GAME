'use client'
import SettingsButton from "@/components/settings/SettingsButton";
import { Provider } from "react-redux";
import { store } from "@/library/redux/store";
// import GameField from "@/components/GameField";
import ExitButton from "@/components/ExitButton";
import { ReactNode } from "react";
import Link from "next/link";
import Field from "./components/Field";

export default function page() {

    return (
        <div className="">
            <div 
            id="grid"
            className=" bg-[url('/images/game-field.jpg')]  mx-auto bg-center bg-cover max-w-[1600px]  bg-no-repeat h-[100dvh] w-full">
                <div className="flex flex-col justify-center items-center h-full z-10 overflow-hidden">    
                    <Provider store={store}>
                        <ReturnToHome/>
                        <IconsContainer>
                            <SettingsButton/>
                            <ExitButton/>
                        </IconsContainer>
                        <Field/>
                    </Provider>
                </div>
            </div>
        </div>

    )
}


function ReturnToHome() {
    return (
        <Link href='/' className='absolute left-2 top-2' title="Return To Home">
            <i className='bx bx-arrow-back text-white text-3xl'></i>
        </Link>
    )
}

function IconsContainer({children}:{
    children:ReactNode
}){
    return (
        <div className="absolute top-2 right-2 z-[1000]">
            <div 
            className="flex justify-end w-full flex-col items-center">
                {children}
            </div>
        </div>
    )
}
'use client'
import SettingsButton from "@/components/settings/SettingsButton";
import { Provider } from "react-redux";
import { store } from "@/library/redux/store";
import GameField from "@/components/GameField";
import GameBackground from "@/components/backgrounds/gameBackground";
import ExitButton from "@/components/ExitButton";
import { ReactNode } from "react";
import Link from "next/link";

export default function page() {

    return (
        <GameBackground>
            <div className="flex flex-col justify-around items-center h-full z-10 overflow-hidden">    
                <Provider store={store}>
                    <ReturnToHome/>
                    <IconsContainer>
                        <SettingsButton/>
                        <ExitButton/>
                    </IconsContainer>
                        <GameField/>
                </Provider>
            </div>
        </GameBackground>
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
        <div className="absolute top-2 right-2">
            <div 
            className="flex justify-end w-full flex-col items-center">
                {children}
            </div>
        </div>
    )
}
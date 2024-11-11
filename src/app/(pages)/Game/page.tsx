'use client'
import SettingsButton from "@/components/settings/SettingsButton";
import { Provider } from "react-redux";
import { store } from "@/library/redux/store";
import GameField from "@/components/GameField";
import GameBackground from "@/components/backgrounds/gameBackground";
import ExitButton from "@/components/ExitButton";
import { ReactNode } from "react";

export default function page() {

    return (
        <GameBackground>
            <div className="flex flex-col justify-around items-center h-full z-10 overflow-hidden">    
                <Provider store={store}>
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
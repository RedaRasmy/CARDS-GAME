'use client'

import GameBackground from "@/components/backgrounds/gameBackground";
import MainMenu from "@/components/Home/MainMenu";

export default function Home() {
    return (
        <GameBackground>
            <div className="flex flex-col justify-around items-center h-full z-50">
                <MainMenu/>
            </div>
        </GameBackground>
    );
}


'use client'

// import GameBackground from "@/components/backgrounds/gameBackground";
import MainMenu from "@/components/Home/MainMenu";
import useAuthListener from "@/library/Hooks/useAuthListener";

export default function Home() {
    useAuthListener()

    return (
        // <GameBackground>
        <div className="bg-[url('/images/history-background3.jpeg')] h-[100dvh]   bg-center" >
            <div className="flex flex-col justify-around items-center h-full z-50">
                <MainMenu/>
            </div>
        </div>
        // </GameBackground>
    );
}


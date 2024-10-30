'use client'

import MainMenu from "@/components/Home/MainMenu";
// import Draggable from "@/library/dnd-kit/draggable";
import { DndContext } from "@dnd-kit/core";

export default function Home() {

    return (
        <DndContext>
            <div className="flex flex-col justify-around items-center h-full overflow-hidden">
                    <MainMenu/>
                    {/* <Draggable id={0}>
                        <div className="w-52 bg-white h-52">
                            hello
                        </div>
                    </Draggable> */}
                </div>
        </DndContext>
    );
}


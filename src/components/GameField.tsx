
import { useAppSelector } from "@/library/store";
import Board from "./Board";
import CardsGroup from "./CardsGroup";

export default function GameField() {
    const playerCards:number[] = useAppSelector((state) => state.playerCards )

    return (
        <div className="w-full h-full flex flex-col justify-around items-center">
            <div></div>
            <Board/>
            <CardsGroup cardsIds={playerCards} />
        </div>
    )
}

import useGame from "@/library/Hooks/useGame"
import PreGame from "./PreGame"
import GameContainer from "./GameContainer"
import Hand from "./Hands & Card/Hand"
import CardDesign from "./Hands & Card/CardDesign"
import useCard from "@/library/Hooks/useCard"
import { Center, FirstCorner, FourthCorner, LeftName, Midle, MidleName, Player, RightName, SecondCorner, StackContainer, Table, ThirdCorner } from "./Containers"
import Stack from "./Stack"

export default function Field() {
    const {isPreGame} = useGame()
    return (
        <div className="w-full h-full flex justify-center items-center ">
            {isPreGame ? <PreGame/> : <Game/>
            }
        </div>
    )
}
function Game() {
    const {
        midlePlayerCondition,
        cornersPlayersCondition
    } = useGame()
    const {currentCardId,playerCards} = useCard()

    return (
        <GameContainer>
            <FirstCorner>
                {cornersPlayersCondition && <Hand num={4} />}
            </FirstCorner>
            <Midle>
                { midlePlayerCondition &&
                    <>
                        <MidleName></MidleName>
                        <Hand num={4} />
                    </>
                }
            </Midle>
            <SecondCorner>
            {cornersPlayersCondition &&<Hand num={4} />}
            </SecondCorner>
            <LeftName></LeftName>
            <Table>
                <StackContainer>
                    <Stack/>
                </StackContainer>
                <Center>
                    <CardDesign className="scale-150" id={currentCardId} />
                </Center>
            </Table>
            <RightName></RightName>
            <ThirdCorner></ThirdCorner>
            <Player>
                <Hand cardsIds={playerCards} />
            </Player>
            <FourthCorner></FourthCorner>
        </GameContainer>
    )
}




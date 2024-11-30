import useGame from "@/library/Hooks/useGame"
import PreGame from "./PreGame"
import Hand, { OpponentHand } from "./Hands & Card/Hand"
import CardDesign from "./Hands & Card/CardDesign"
import useCard from "@/library/Hooks/useCard"
import GameContainer ,{ Center, FirstCorner, FourthCorner, LeftName, Midle, MidleName, Player, RightName, SecondCorner, StackContainer, Table, ThirdCorner } from "./Containers"
import Stack from "./Stack"
import Droppable from "@/library/dnd-kit/droppable"
import { closestCenter, DndContext } from "@dnd-kit/core"
// import useDevice from "@/library/Hooks/useDevice"
import ChooseAColor from "@/components/ChooseAColor"
import ResultMsg from "./ResultMsg"
import useWinOrLose from "@/library/Hooks/useWinOrLose"
import StartButton from "@/components/StartButton"
import Label from "./Label"
import useBot from "@/library/Hooks/useBot"

export default function Field() {
    // const {landscape} = useDevice()
    // if (!landscape) {
    //     return (
    //         <h1>RETURN YOUR DEVICE</h1>
    //     )
    // }
    const {isPreGame} = useGame()
    return (
        <div className="w-full h-full flex justify-center items-center ">
            {isPreGame ? <PreGame/> : <Game/>}
        </div>
    )
}

function Game() {
    
    const {
        midlePlayerCondition,
        cornersPlayersCondition,
        modalOpen,
        toggleModalShortcut,
        restart,
        gameIsOn,
        playersNumber,
        difficulty
    } = useGame()
    const  BotPlay = useBot(difficulty)
    const {
        currentCardId,
        hands,
        handleDragEnd,
        currentPlayer
    } = useCard()
    const {win,lose,isVisible} = useWinOrLose()
    return (
        <DndContext
        collisionDetection={closestCenter}
        // onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        >
            <GameContainer>
                {modalOpen && <ChooseAColor onClose={toggleModalShortcut} />}
                {win && <ResultMsg result="win" isVisible={isVisible}/> }
                {lose && <ResultMsg result="lose" isVisible={isVisible}/>}
                {(!gameIsOn) && <StartButton handleClick={restart} text="REPLAY"/>}
                <FirstCorner>
                    {cornersPlayersCondition && 
                    <OpponentHand num={playersNumber===3 ?
                    hands[2].length : hands[3].length } 
                    />}
                </FirstCorner>
                <Midle>
                    { midlePlayerCondition &&
                        <>
                            <MidleName>
                                <Label 
                                timer={
                                    ((currentPlayer===1)&&(playersNumber===2))||
                                    ((currentPlayer===2)&&(playersNumber===4))
                                }
                                name="3ambula" 
                                image="/images/dog1.jpg"
                                cardsNumber={
                                    playersNumber===2 
                                    ? hands[1].length 
                                    : hands[2].length} 
                                direction="top"/>
                            </MidleName>
                            <OpponentHand num={
                                playersNumber===2 
                                ? hands[1].length 
                                : hands[2].length}  
                            />
                        </>
                    }
                </Midle>
                <SecondCorner>
                {cornersPlayersCondition &&<OpponentHand num={hands[1].length} />}
                </SecondCorner>
                <LeftName>
                    {cornersPlayersCondition && 
                    <Label 
                    timer={
                        ((currentPlayer===3)&&(playersNumber===4))
                    }
                    name="sta9zo" 
                    image="/images/dog2.jpg"
                    cardsNumber={playersNumber===3 ?
                        hands[2].length :
                        hands[3].length
                    } 
                    direction="left"/>}
                </LeftName>
                <Table>
                    <StackContainer>
                        <Stack/>
                    </StackContainer>
                    <Center>
                        <Droppable>
                            <CardDesign className="lg:scale-150 scale-110" id={currentCardId} />        
                        </Droppable>
                    </Center>
                </Table>
                <RightName>
                    {cornersPlayersCondition && 
                    <Label 
                    timer={
                        ((currentPlayer===1)&&(playersNumber===4))
                    }
                    name="ta99adom" 
                    image="/images/dog3.jpg"
                    cardsNumber={hands[1].length} 
                    direction="right"/>}
                </RightName>
                <ThirdCorner></ThirdCorner>
                <Player>
                    <Hand  cardsIds={hands[0]} />
                </Player>
                <FourthCorner>
                    <Label  
                    name="reda"
                    timer={
                        ((currentPlayer===0))
                    }
                    cardsNumber={hands[0].length} 
                    direction="bottom"/>
                </FourthCorner>
            </GameContainer>
        </DndContext>
    )
}




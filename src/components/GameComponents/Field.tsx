import useGame from "@/library/Hooks/useGame";
import PreGame from "./PreGame";
import Hand, { OpponentHand } from "./Hand";
import CardDesign from "./CardDesign";
import useCard from "@/library/Hooks/useCard";
import GameContainer, {
  Center,
  FirstCorner,
  FourthCorner,
  LeftName,
  Midle,
  MidleName,
  Player,
  RightName,
  SecondCorner,
  StackContainer,
  Table,
  ThirdCorner,
} from "./Containers";
import Stack from "./Stack";
import Droppable from "@/library/dnd-kit/droppable";
import { closestCenter, DndContext } from "@dnd-kit/core";
// import useDevice from "@/library/Hooks/useDevice"
import ChooseAColor from "@/components/GameComponents/ChooseAColor";
import ResultMsg from "./ResultMsg";
import useWinOrLose from "@/library/Hooks/useWinOrLose";
import StartButton from "@/components/StartButton";
import Label from "./Label";
import useBot from "@/library/Hooks/useBot";
import useUserData from "@/library/Hooks/useUserData";

export default function Field() {
  const { isPreGame } = useGame();
  return (
    <div className="w-full h-full flex justify-center items-center ">
      {isPreGame ? <PreGame /> : <Game />}
    </div>
  );
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
    difficulty,
  } = useGame();
  useBot(difficulty);
  const { currentCardId, hands, currentPlayer, } =
    useCard();
  const { win, lose, isVisible } = useWinOrLose();
  const {data} = useUserData()
  return (
    <DndContext
      collisionDetection={closestCenter}
      // onDragStart={handleDragStart}
      // onDragEnd={handleDragEnd}
    >
      <GameContainer>
        {modalOpen && <ChooseAColor onClose={toggleModalShortcut} />}
        {win && <ResultMsg result="win" isVisible={isVisible} />}
        {lose && <ResultMsg result="lose" isVisible={isVisible} />}
        {!gameIsOn && <StartButton handleClick={restart} text="REPLAY" />}
        <FirstCorner>
          {cornersPlayersCondition && (
            <OpponentHand
              num={playersNumber === 3 ? hands[2].length : hands[3].length}
            />
          )}
        </FirstCorner>
        <Midle>
          {midlePlayerCondition && (
            <>
              <MidleName>
                <Label
                  timer={
                    (gameIsOn && currentPlayer === 1 && playersNumber === 2) ||
                    (currentPlayer === 2 && playersNumber === 4)
                  }
                  name="bommimo"
                  image="/images/dog1.jpg"
                  cardsNumber={
                    playersNumber === 2 ? hands[1].length : hands[2].length
                  }
                  direction="top"
                />
              </MidleName>
              <OpponentHand
                num={playersNumber === 2 ? hands[1].length : hands[2].length}
              />
            </>
          )}
        </Midle>
        <SecondCorner>
          {cornersPlayersCondition && <OpponentHand num={hands[1].length} />}
        </SecondCorner>
        <LeftName>
          {cornersPlayersCondition && (
            <Label
              timer={
                (gameIsOn && currentPlayer === 3 && playersNumber === 4) ||
                (currentPlayer === 2 && playersNumber === 3)
              }
              name="sta9zo"
              image="/images/dog2.jpg"
              cardsNumber={
                playersNumber === 3 ? hands[2].length : hands[3].length
              }
              direction="left"
            />
          )}
        </LeftName>
        <Table>
          <StackContainer>
            <Stack />
          </StackContainer>
          <Center>
            <Droppable>
              <CardDesign
                className="lg:scale-150 scale-110"
                id={currentCardId}
              />
            </Droppable>
          </Center>
          {/* <div className="flex justify-center items-center">
            {requirementsValue}
            <br />
            {cardsLeft.length}
          </div> */}
        </Table>
        <RightName>
          {cornersPlayersCondition && (
            <Label
              timer={gameIsOn && currentPlayer === 1 && cornersPlayersCondition}
              name="ta99adom"
              image="/images/dog3.jpg"
              cardsNumber={hands[1].length}
              direction="right"
            />
          )}
        </RightName>
        <ThirdCorner></ThirdCorner>
        <Player>
          <Hand cardsIds={hands[0]} />
        </Player>
        <FourthCorner>
          <Label
            name={data.username}
            timer={gameIsOn && currentPlayer === 0}
            cardsNumber={hands[0].length}
            direction="bottom"
          />
        </FourthCorner>
      </GameContainer>
    </DndContext>
  );
}

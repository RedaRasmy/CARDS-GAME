import useGame from "@/library/Hooks/useGame";
import React, { useRef } from "react";

export default function ExitButton() {
  const { quitGame, gameIsOn } = useGame();
  const dialogRef = useRef<HTMLDialogElement>(null);
  function handleClick() {
    dialogRef.current?.showModal();
  }
  function handleQuit() {
    dialogRef.current?.close();
    quitGame();
  }
  if (gameIsOn)
    return (
      <>
        <button onClick={handleClick}>
          <i className="bx bxs-exit text-white text-4xl " />
        </button>

        <dialog
          ref={dialogRef}
          className="w-[clamp(200px,50%,500px)] backdrop-blur-[5px] min-h-40 h-1/5 
          rounded-md p-2 bg-transparent border-white border border-opacity-20"
        >
          <div className="flex flex-col items-center justify-around h-full">
            <p className="font-extrabold  text-xl opacity-80 text-black">
              DO YOU WANT TO QUIT THE GAME ?
            </p>
            <div className="space-x-2 w-full flex justify-center">
              <button
                onClick={handleQuit}
                className="px-10 py-2 btn btn-warning btn-outline "
              >
                Quit !
              </button>
              <button
                onClick={() => dialogRef.current?.close()}
                className="px-10 py-2 btn btn-accent btn-outline"
              >
                Back
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
}

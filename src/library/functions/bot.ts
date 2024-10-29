// import { cards } from "../../../public/cards";
// import isIdentical from "./isIdentical";
// import requirements, { Requirements } from "./requirements"

// export type Mode = 'easy' | 'medium' | 'hard' | 'hacker'

// export default function bot(cards:number[],requ:Requirements,mode:Mode){
//     switch (mode) {
//         case 'easy':
//             const takeRate = Math.random() < 0.3 // 30% he will take card
//             if (takeRate) {
//                 return;
//             }
//             for (const card of cards){
//                 if (isIdentical(card,requ)){
//                     return card
//                 }
//             }
//             break;
//         case 'medium' :

//     }
// }

// function botJudge(botCards:number[],mode:Mode){ // return color
//     let output;
//     switch (mode) {
//         case "easy": // random : 25% for each
//             output = ['Yellow',"Blue",'Red',"Green"][Math.floor(Math.random()*4)]
//             break
//         case "medium":
//             const colors:string[] = []
//             for (const card of botCards) {
//                 colors.push(requirements(card)[0] as string)
//             }
//             return maxColor(colors)
//         case "hard":
//         case "hacker":
//     }
//     return output
// }

// function maxColor(colors:string[]){ // created by chatGpt
//     const countMap: Record<string, number> = colors.reduce((acc:Record<string, number>, str) => {
//         acc[str] = (acc[str] || 0) + 1;
//         return acc;
//     }, {});
//     const maxCount = Math.max(...Object.values(countMap));
//     return Object.keys(countMap).filter(str => countMap[str] === maxCount);
// }
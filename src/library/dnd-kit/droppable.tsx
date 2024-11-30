import  {ReactNode } from 'react';
import {useDroppable} from '@dnd-kit/core';
import isIdentical from '../functions/isIdentical';
import useCard from '../Hooks/useCard';


export default function Droppable({children}:{children:ReactNode}) {

    const {requirementsValue} = useCard()
    const {isOver,active, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = isOver   ?  {
        border: isIdentical(active?.id as number,requirementsValue) ? '2px solid green' : '2px solid red' ,
        borderRadius: '5px',
        transform:  ""  ,
    }: undefined
    
    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}
import  {ReactNode } from 'react';
import {useDroppable} from '@dnd-kit/core';
import isIdentical from '../functions/isIdentical';
import requirements from '../functions/requirements';
import useCard from '../Hooks/useCard';
import { useAppSelector } from '../redux/store';


export default function Droppable({children}:{children:ReactNode}) {
    const {dragging} = useAppSelector(state=>state.settings)

    const {requirementsValue} = useCard()
    const {isOver,active, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = isOver && dragging  ?  {
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
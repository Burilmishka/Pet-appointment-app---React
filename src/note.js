import React from 'react';

export default function Note(props){
    return(
        <div className='noteCnt'>
            <div className='xBut'
                onClick = { () => props.deleteNote(props.index)}>
                <i className='fas fa-times'></i>
            </div>
            <div>
                <div>{props.petName}</div>
                <div>{props.petOwner}</div>
                <div>{props.petNote}</div>
            </div>
        </div>
    )
}


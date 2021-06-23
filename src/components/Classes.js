import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// components
import CreateClass from './CreateClass';
import ClassCard from './ClassCard'


const Classes = (props) => {
    const { isInstructor, classList, setClassList } = props;
    console.log(classList)

    const { push } = useHistory();

    const handleClick = () => {
        push("/create-class");
    }

    return (
        <div>
            <h2>Classes</h2>
            <button onClick={handleClick}>Create Class</button>
            {
                classList.map(item => <ClassCard isInstructor={isInstructor} item={item}/>)
            }
        </div>
    )
}

export default Classes;
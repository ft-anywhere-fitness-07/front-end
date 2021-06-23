import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// components
import CreateClass from './CreateClass';
import ClassCard from './ClassCard'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Classes = (props) => {
    const { isInstructor, classList, setClassList } = props;
    const classes = useStyles();

    const { push } = useHistory();

    const handleClick = () => {
        push("/create-class");
    }

    return (
        <div>
            <div className="classesContainer">
                <h2>Classes</h2>
                <div className={classes.root}>
                {isInstructor ? <Button variant="contained" color="primary" onClick={handleClick}>Create Class</Button> : <div></div>}
                </div>
                <div className="classList">
                    {
                        classList.map(item => <ClassCard key={item.classId} isInstructor={isInstructor} item={item} classList={classList} setClassList={setClassList}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Classes;
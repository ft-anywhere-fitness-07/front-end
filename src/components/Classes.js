import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// components
import CreateClass from './CreateClass';
import ClassCard from './ClassCard'


// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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
        // <Container fixed>
        <div style={{ padding: 20, marginBottom: 2  }} >
            <div style={{ paddingLeft: 20 }} >
            <h1>Classes</h1>
            {isInstructor ? <Button variant='contained' color='primary' onClick={handleClick}>Create Class</Button> : <div></div>}
            </div>
           <Grid container spacing={2}>
            {
                classList.map(item => <ClassCard key={item.classId} isInstructor={isInstructor} item={item} classList={classList} setClassList={setClassList}/>)
            }
            </Grid>
        </div >
        // </Container>
    )
}

export default Classes;
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchClasses } from './../actions/classActions';

// components
import ClassCard from './ClassCard';
import Search from './Search';


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
    const [isVisible, setIsVisible] = useState(true);

    const { push } = useHistory();

    // useEffect(() => {
      // if(classList.length >= 2 ){
      //   setIsVisible(false)
      // }
    //   props.fetchClasses()
    // }, [])

    const handleClick = () => {
        push("/create-class");
    }

    // const handleFetch = () => {
    //   props.fetchClasses()
    // }

    return (
        <Container>
        <div style={{ paddingLeft:80, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }} >
            <div>
              <h1 style={{ marginRight:80 }}>Classes</h1>
              {isInstructor ? <Button variant='contained' color='primary' onClick={handleClick}>Create Class</Button> : <div></div>}
              {/* {isVisible ? <Button variant='contained' color='primary' onClick={handleFetch}>Fetch All Classes</Button> : <div></div>} */}
            </div>
            {/* <Search /> */}
           <Grid container spacing={2}>
            {
                classList.map(item => <ClassCard key={item.classId} isInstructor={isInstructor} item={item} classList={classList} setClassList={setClassList}/>)
            }
            </Grid>
        </div >
        </Container>
    )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.login.isAuth,
    isInstructor: state.login.isInstructor,
    classList: state.classes.classList
  }
}

export default connect(mapStateToProps, { fetchClasses })(Classes);
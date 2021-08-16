import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from './../utils/axiosWithAuth';
import { connect } from 'react-redux';
import { deleteClass, fetchClasses } from './../actions/classActions';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    border: '1px solid gray',
    margin: '2em'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ClassCard = (props) => {
  const { isInstructor, item } = props;
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { push } = useHistory();
  const classes = useStyles();

  const handleEdit = () => {
    push(`/edit-class/${item.classId}`);
  }

  useEffect(() => {
    if(item.attendees >= item.maxSize) {
      setIsFull(true)
    }
  },[isRegistered])

  const handleDelete = () => {
    props.dispatch(deleteClass(item.classId))
  }

  const handleRegister = () => {
    axiosWithAuth()
    .post(`/api/users/enrollment`, {classId: item.classId})
    .then(res => {
      console.log(res)
      item.attendees += 1
      if(res.statusText === "OK"){
        setIsRegistered(true)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDeregister = () => {
    axiosWithAuth()
    .delete(`/api/users/enrollment/${item.classId}`)
    .then(res => {
      item.attendees -= 1
      console.log(res)
      setIsRegistered(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>      
        </Typography>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Time: {item.time}
          <br />
          Location: {item.location}
        </Typography>
        <Typography variant="body2" component="p">
          Type: {item.type}
          <br />
          Duration: {item.duration}
          <br />
          Intensity Level: {item.intensityLvl}
          <br />
          Number of Attendees: {item.attendees}
          <br />
          Max Size: {item.maxSize}
        </Typography>
      </CardContent>
      <CardActions>
        {isInstructor ? 
        <div>
          <Button size="small" onClick={handleEdit}>Edit</Button>
          <Button size="small" onClick={handleDelete}>Delete</Button>
        </div>
        : isRegistered ? 
        <Button size="small" onClick={handleDeregister}>Deregister</Button>
        : isFull ? 
        <Button size="small">Class Is Full</Button>
        : <Button size="small" onClick={handleRegister}>Register</Button>
        }
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.login.isAuth,
    isInstructor: state.login.isInstructor,
    classList: state.classes.classList
  }
}

export default connect(mapStateToProps, { fetchClasses })(ClassCard);

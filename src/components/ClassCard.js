import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axiosWithAuth from './../utils/axiosWithAuth';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
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

export default function ClassCard(props) {
  const { isInstructor, item, classList, setClassList } = props;
  const { push } = useHistory();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleEdit = () => {
    push(`/edit-class/${item.classId}`);
  }

  const handleDelete = () => {
    axiosWithAuth()
    .delete(`/api/classes/${item.classId}`)
    .then(res => {
      console.log(res.data.removed)
      const deletedClass = res.data.removed
      const newClassList = classList.filter(item => item.classId !== deletedClass.classId)
      setClassList(newClassList)
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
        : <Button size="small">Register</Button>
        }
      </CardActions>
    </Card>
  );
}
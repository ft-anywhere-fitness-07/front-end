import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import { IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createClass } from './../actions/classActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const initialValues = {
  name: "",
  type: "",
  time: "",
  duration: "",
  intensityLvl: "",
  attendees:"",
  maxSize: "",
  location: "",
};


const CreateClass = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const [location, setLocation] = useState("");
  const { push } = useHistory();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.createClass(values)
    push("/classes")
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLocation(position.coords.latitude + "," + position.coords.longitude);
  }
  getLocation();

  function locationSet() {
    setValues({ ...values, location: location });
  }

  return (
    <Container component="main" maxWidth="m">
      <div className='formContainer' >
        <Typography component="h1" variant="h5">
          Create Class
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                onChange={onChange}
                id="name"
                label="Name"
                value={values.name}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="type"
                variant="outlined"
                required
                fullWidth
                id="type"
                type="type"
                label="Type"
                onChange={onChange}
                value={values.type}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                name="time"
                variant="outlined"
                required
                fullWidth
                id="time"
                type="time"
                label='Start Time'
                onChange={onChange}
                value={values.time}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="duration"
                variant="outlined"
                required
                fullWidth
                id="duration"
                type="duration"
                label="Duration"
                onChange={onChange}
                value={values.duration}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="intensityLvl"
                variant="outlined"
                required
                fullWidth
                id="intensity"
                type="intensity"
                label="Intensity Level"
                onChange={onChange}
                value={values.intensityLvl}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="attendees"
                variant="outlined"
                required
                fullWidth
                id="attendees"
                type="attendees"
                label="Number of Attendees"
                onChange={onChange}
                value={values.attendees}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="maxSize"
                variant="outlined"
                required
                fullWidth
                id="size"
                type="size"
                label="Maximum Class Size"
                onChange={onChange}
                value={values.maxSize}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="location"
                variant="outlined"
                required
                fullWidth
                label="Location"
                type="address"
                id="location"
                onChange={onChange}
                value={values.location}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={locationSet}>
                      <LocationSearchingIcon />
                    </IconButton>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Class!
          </Button>
          <Grid container justify="flex-end">
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return({
    isLoading: state.classes.isLoading,
    error: state.classes.error
  })
}

export default connect(mapStateToProps, { createClass })(CreateClass);
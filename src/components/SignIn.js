import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, Button, TextField, CssBaseline, Grid, Container } from '@material-ui/core';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import * as yup from 'yup';
import schema from './../validation/signInFormSchema';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles({
    errorText: {
        color:"red"
    }
});

const initialFormValues = {
    username:"",
    password:""
}

const initialFormErrors = {
    username: "",
    password:""
}

const SignIn = (props) => {
    const { isAuth, setIsAuth, isInstructor, setIsInstructor } = props;
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);
    const [signInError, setSignInError] = useState("");
    const { push } = useHistory();

    const classes = useStyles();

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        validate(name, value)
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .post("/api/auth/login", formValues)
        .then(res => {
            localStorage.setItem("token", res.data.token)
            setIsAuth(true)
            const role = res.data.user.role
            if(role === "instructor"){
                setIsInstructor(true)
                localStorage.setItem("role", role)
            }
            push("/classes")
        })
        .catch(err => {
            console.log(err)
            setSignInError(err)
            setFormValues(initialFormValues)
        })
    }

    const validate = (name, value) => {
        yup.reach(schema, name)
        .validate(value)
        .then(res => setFormErrors({...formErrors, [name]:""}))
        .catch(err => setFormErrors({...formErrors, [name]:err.errors[0]}))
    }

    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])
 
    return(
        <Container component="main" maxWidth="m">
            <div className="formContainer" style={{ borderRadius: 5 }} >
                <h2>Sign In</h2>
                <form className="form">
                    <FormControl className="formInputs">
                        {/* <InputLabel htmlFor="my-input"></InputLabel> */}
                        <Grid item xs={12}>
                        <TextField 
                            id="filled-basic"
                            label="Username" 
                            variant="outlined"
                            fullWidth
                            required
                            aria-describedby="username input field"
                            defaultValue="Username"
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={onChange} />
                        <FormHelperText className={classes.errorText} id="my-helper-text">{formErrors.username ? `${formErrors.username}` : ""}</FormHelperText>
                        </Grid>
                    </FormControl>

                    <FormControl>
                    <Grid item xs={12}>
                    <TextField 
                            id="filled-basic"
                            label="Password" 
                            variant="outlined"
                            fullWidth
                            required
                            aria-describedby="Password input field"
                            defaultValue="Password"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={onChange} />
                        <FormHelperText className={classes.errorText}  id="my-helper-text">{formErrors.password ? `${formErrors.password}` : ""}</FormHelperText>
                        </Grid>
                    </FormControl>
                    <p className={classes.errorText}>{signInError ? "Unable to sign in" : ""}</p>
                    <Grid>
                    <Button fullWidth variant="contained" disabled={disabled} color="primary" onClick={onSubmit}>Sign In</Button>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default SignIn;
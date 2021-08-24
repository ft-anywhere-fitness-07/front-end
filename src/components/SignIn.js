import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './../actions/loginActions';

// form validation
import * as yup from 'yup';
import schema from './../validation/signInFormSchema';

// Material UI
import { FormControl, FormHelperText, Button, TextField, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    const { isLoading, error, isAuth } = props;
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);
    const [signInError, setSignInError] = useState("");
    const { push } = useHistory();

    const classes = useStyles();

    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues, signInError])

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if(isAuth === true ) {
        push('/classes')
    }

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
        props.login(formValues)

        if(error) {
            setSignInError("Unable to sign in")
        }
    }

    const validate = (name, value) => {
        yup.reach(schema, name)
        .validate(value)
        .then(res => setFormErrors({...formErrors, [name]:""}))
        .catch(err => setFormErrors({...formErrors, [name]:err.errors[0]}))
    }
 
    return(
        <Container component="main" maxWidth="lg">
            <div className="formContainer" style={{ borderRadius: 5 }} >
                <h2>Sign In</h2>
                <form className="form">
                    <FormControl className="formInputs">
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

const mapStateToProps = (state) => {
    return {
        isLoading: state.login.isLoading,
        error: state.login.error,
        isAuth: state.login.isAuth
    }
}

export default connect(mapStateToProps, { login })(SignIn);

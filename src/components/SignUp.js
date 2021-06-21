import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';

const SignUp = () => {
    return(
        <div>
            <div className="formContainer">
                <h2>Sign Up</h2>
                <form className="form">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText id="my-helper-text">We'll never share your email</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="my-input">Create password</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText id="my-helper-text">Must be at least 8 characters</FormHelperText>
                    </FormControl>
                    <Button variant="contained" color="primary">Sign Up</Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
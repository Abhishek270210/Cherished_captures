import React, { useState } from 'react'
import dotenv from 'dotenv';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { LockRounded } from '@material-ui/icons'
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import {useHistory} from 'react-router-dom'
import { signInaction, SigninWithGoogle,signUpaction } from '../../actions/authactions';
import {useDispatch}  from 'react-redux';


// all the components in the route of browserRouter already get the access to the history as a prop if we do not pass then also...
const Authpage = () => {

    dotenv.config();

    const initialstate = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
    }
    const classes = useStyles();
    const [signUp, setMode] = useState(false);
    const [formData, setFormdata] = useState(initialstate);
    const dispatch = useDispatch();
    const history=useHistory();
    const CLIENT_ID=process.env.GOOGLE_CLIENT_ID;


    const toggleMode = () => {
        setMode((prevsignUp) => !prevsignUp);
    }

    const handleAuth = (e) => {
        e.preventDefault();
        if (signUp) {
            dispatch(signUpaction(formData,history));
        }
        else {
            dispatch(signInaction(formData,history));
        }
        handleclear();
    }

    const handlechange = (e) => {
        setFormdata(() => ({ ...formData, [e.target.name]: e.target.value }));
    }

    const handleclear = () => {
        setFormdata(initialstate);
    }

    const googleSuccess=async(response)=>{
        dispatch( SigninWithGoogle(response));
        history.push('/');
    }

    const googleError=(error)=>{
       console.log(error);
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={10} >
                <Avatar className={classes.avatar}>
                    <LockRounded />
                </Avatar>
                <Typography component="h1" variant="h5">{signUp ? `Sign up`:`Sign in`}</Typography>
                <form className={classes.form} onSubmit={handleAuth} >
                    <Grid container spacing={2}>
                        {
                            signUp ?
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField variant={'outlined'} required label="First Name" name="firstname" type="text" autoFocus={true} value={formData.firstname} onChange={(e) => handlechange(e)}  ></TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField variant={'outlined'} required label="Last Name" name="lastname" type="text" value={formData.lastname} onChange={(e) => handlechange(e)} ></TextField>
                                    </Grid>
                                </> : null
                        }
                        <Grid item xs={12} sm={12}>
                            <TextField variant={'outlined'} required fullWidth label="Email" name="email" type="email" value={formData.email} onChange={(e) => handlechange(e)}></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField variant={'outlined'} required fullWidth label="Password" name="password" type="password" value={formData.password} onChange={(e) => handlechange(e)}></TextField>
                        </Grid>
                        {
                            signUp ?
                                <Grid item xs={12} sm={12}>
                                    <TextField variant={'outlined'} required fullWidth label="Confirm password" name="confirmpassword" type="password" value={formData.confirmpassword} onChange={(e) => handlechange(e)}></TextField>
                                </Grid>
                                : null
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{!signUp ? "Log in" : "Sign Up"}</Button>
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="secondary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="center">
                        <Grid item>
                            <Button onClick={toggleMode} variant="contained" color="inherit" >
                                {signUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Authpage

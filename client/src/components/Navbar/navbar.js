import React, { useState, useEffect, useCallback } from 'react'
import { Avatar, AppBar, Button, Typography, Toolbar } from '@material-ui/core';
import useStyles from './styles';
import logo from '../../images/camera1.jpeg'
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../actions/authactions';
import decode from 'jwt-decode'

const Navbar = () => {
    // const isUser = false;
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const [isUser, setUser] = useState(JSON.parse(window.localStorage.getItem('user')));

    // usecallback hook will make sure that the handlelogout will not have different refrence whenever the component is rendered until history and dispatch is changed...
    const handleLogout = useCallback(() => {
        dispatch(LogOut());
         setUser(null);
        history.push('/Auth');
    }, [history, dispatch]);

    useEffect(() => {

        const token = isUser?.token;
        if (token) {
            const decodedToken = decode(token);
            //  console.log(decodedToken);

            if (decodedToken.exp * 1000 < new Date().getTime())
                handleLogout();
        }
        setUser(JSON.parse(window.localStorage.getItem('user')));
    }, [location, handleLogout, isUser?.token]);


     const handleSignin = () => {
        history.push('/Auth');
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
               <Link to='/' className={classes.headingLink}><Typography className={classes.heading} variant="h2" align="center">Cherished Captures</Typography></Link> 
                <Link to='/'><img className={classes.image} src={logo} alt="icon" height="60" /></Link>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    isUser ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={isUser?.profile?.name} src={isUser?.profile?.imageUrl}>{isUser?.profile?.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{isUser?.profile?.name}</Typography>
                            <Button variant="contained" color="primary" onClick={handleLogout}>Log out</Button>
                        </div>
                    ) : <Button variant="contained" color="primary" onClick={handleSignin} >Sign In</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;

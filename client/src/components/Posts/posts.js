import React from 'react'
import Post from './Post/post';
import { Grid, CircularProgress,Card,Typography,CardContent } from '@material-ui/core';
import {useSelector} from 'react-redux'
import useStyles from './styles';

const Posts=({curr,setCurrent})=> {
    
    const allposts=useSelector(state =>state.postReducer.posts);
    const loading=useSelector(state=>state.postReducer.loading);
    const classes = useStyles();
    // console.log(allposts);

    if(loading)
    {
        return (<CircularProgress />);
    }

    if(!allposts?.length)
    {
      return (
        <Card>
        <CardContent>
          <Typography component="h1" align="center" >NO POSTS AVAILABLE !!!</Typography>
          <br/>
          <Typography component="h2" align="center" >BE THE FIRST ONE TO CREATE ...</Typography>
        </CardContent>
      </Card>
      )
    }
    
    return (
         

        <Grid className={classes.container} container alignItems="stretch" spacing={4}>
        {allposts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={4}>
            <Post post={post} curr={curr} setCurrent={setCurrent} />
          </Grid>
        ))}
      </Grid>

    )
}

export default Posts

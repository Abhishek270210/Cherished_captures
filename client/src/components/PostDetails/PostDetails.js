import React,{useEffect} from 'react'
import {Paper,Typography,Divider, CircularProgress,Grid} from '@material-ui/core'
import {useSelector} from 'react-redux';
import useStyles from './styles';
import  moment  from 'moment';
import {useHistory,useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getParticularData, getsearchData } from '../../actions/postactions';
import Commentsection from './Commentsection';


const PostDetails = () => {
    const classes=useStyles();

    const {particularpost,posts,loading}=useSelector((state)=>state.postReducer);
    const {id}=useParams();
    const dispatch = useDispatch();
    const history=useHistory();

    useEffect(() => {
     if(id)
     dispatch(getParticularData(id));
    }, [id,dispatch]);

    useEffect(() => {
      if(particularpost)
      {
         dispatch(getsearchData({title:'none',tags:particularpost.tags}));
      }
    }, [particularpost,dispatch])


    if(!particularpost)
    return null;

    if(loading)
    {
      return ( <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>)
    }

    if(particularpost===undefined)
    {
      history.push('/');
    }

    const recommendedPosts=posts.filter(post=>post._id!==particularpost._id);

    const openPost=(id)=>{
      history.push(`/posts/${id}`);
    }


    return (
      <div>
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">Title: {particularpost.title}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">Tags: {particularpost.tags.map(tag=>`#${tag} `)}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="body1" component="p">Description: {particularpost.message}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6">Created by: {particularpost.name}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">{moment(particularpost.time).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="h5">Comments:</Typography>
           <Commentsection post={particularpost} />
          <Divider style={{margin:'20px 0'}} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={particularpost.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={particularpost.title} />
        </div>
      </div>

      </Paper>
      
      <Paper style={{ padding: '20px', borderRadius: '15px',marginTop:'20px' }} elevation={2}>

       {/* recommended posts section  */}
       { recommendedPosts.length ? 
       (
            <div className={classes.recommendedsection}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            <Grid  container alignItems="stretch" spacing={4}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <Grid key={_id} item xs={12} sm={6} md={4} lg={3}>
              <div style={{ margin: '20px', cursor: 'pointer' }}  onClick={()=>openPost(_id)}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt="hgqbwnmlkbjweqko2ljcne" width="200px" height="250px" />
              </div>
              </Grid>
            ))}
             </Grid>
          </div>
        </div>
      )
      :null
    }


      </Paper>
      </div>
    )
}

export default PostDetails;

import React from 'react'
import {Paper,Typography,Divider} from '@material-ui/core'
import {useSelector} from 'react-redux';
import useStyles from './styles';
import  moment  from 'moment';


const PostDetails = () => {
    const classes=useStyles();
    const {particularpost}=useSelector((state)=>state.postReducer);
    console.log(particularpost);

   if(!particularpost)
   return null;

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{particularpost.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{particularpost.tags}</Typography>
          <Typography gutterBottom variant="body1" component="p">{particularpost.message}</Typography>
          <Typography variant="h6">Created by: {particularpost.name}</Typography>
          <Typography variant="body1">{moment(particularpost.time).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={particularpost.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={particularpost.title} />
        </div>
      </div>
      </Paper>
    )
}

export default PostDetails;

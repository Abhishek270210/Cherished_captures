import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deleteData, getParticularData, likePost } from '../../../actions/postactions'
import {useHistory} from 'react-router-dom';


const Post = ({ post,curr,setCurrent,myposts }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history=useHistory();
    const currentuser=JSON.parse(window.localStorage.getItem('user'));
    // console.log(post);

    const openPost=(post)=>{
        dispatch(getParticularData(post._id));
        history.push(`/posts/${post._id}`);
    }

    return (
        <Card className={classes.card} elevation={8} >

        <ButtonBase component="span" className={classes.cardAction} onClick={()=>openPost(post)}>

            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.time).fromNow()}</Typography>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map(tag=>`#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

            </ButtonBase>
            {
                 ((post.creator===currentuser?.profile?.googleId || post.creator===currentuser?.profile?._id) && !myposts) ? 
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size="small" onClick={()=>setCurrent(post)} ><MoreHorizIcon fontSize="default" /></Button>
            </div>
            :null
            }

            <CardActions className={classes.cardActions}>
              {
                (post.likes.find(id=>id===currentuser?.profile?.googleId || id===currentuser?.profile?._id)) ?
                <Button size="small" color="primary" disabled={!currentuser?.profile} onClick={()=>dispatch(likePost(post))} ><ThumbUpAltIcon />&nbsp;{post.likes.length}</Button>
                :
                <Button size="small" color="primary" disabled={!currentuser?.profile} onClick={()=>dispatch(likePost(post))} ><ThumbUpAltOutlined />&nbsp;{post.likes.length}</Button>
              }
               {
                   ((post.creator===currentuser?.profile?.googleId || post.creator===currentuser?.profile?._id) && !myposts) ? 
                   <Button size="small" style={{color:'red'}} onClick={()=>dispatch(deleteData(post))}  ><DeleteIcon /></Button>
                   :null
               }
            </CardActions>
        </Card>
    )
}

export default Post

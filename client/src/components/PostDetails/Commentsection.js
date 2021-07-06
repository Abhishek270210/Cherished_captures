import React, { useState } from 'react'
import { Typography, TextField, Button,Card,CardContent } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyle from './styles';
import {postComment} from '../../actions/postactions'

const Commentsection = ({post}) => {

    // console.log(post);

    const classes = useStyle();
    const [comment, setComment] = useState("");
    const [all_comments, setComments] = useState(post.comments);
    const dispatch=useDispatch();
    const user=JSON.parse(window.localStorage.getItem('user'));


const handleCommentSubmit=async()=>{
     dispatch(postComment(`${user?.profile?.name}:${comment}`,post?._id));

    setComments([...all_comments,`${user?.profile?.name}:${comment}`]);
    setComment('');
}

    return (
        <div className={classes.outercontainer}>
            <div className={classes.innercontainer}>
                {
                    all_comments.length === 0 ?
                            <Card elevation={10}>
                                <CardContent>
                                    <Typography component="h1" align="center" >No comments availabe !!!</Typography>
                                    <br />
                                    <Typography component="h2" align="center" >Be the first one to comment...</Typography>
                                </CardContent>
                            </Card>
                        :
                        all_comments.map((comm, i) => <Typography  className={classes.commentword} gutterBottom key={i} variant="subtitle1"><strong>{comm.split(':')[0]}</strong>:{comm.split(':')[1]}</Typography>)
                }
            </div>
            {
               user ? 
            <div style={{width:'80%'}}>
                <Typography gutterBottom variant="h6">Write a comment</Typography>
                <TextField multiline fullWidth variant="outlined" label="Comment" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} ></TextField>
                <br />
                <Button style={{ marginTop: '10px' }} row={4} variant="contained" color="primary" disabled={!comment.length} onClick={handleCommentSubmit} >Comment</Button>
            </div>
            :
            <Card elevation={10}>
            <CardContent>
              <Typography component="h1" align="center" >PLEASE LOGIN TO COMMENT ON THIS POST</Typography>
            </CardContent>
            </Card>
            }
        </div>
    )
}

export default Commentsection

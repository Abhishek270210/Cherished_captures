import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux'
import { postData, updatePost } from '../../actions/postactions'
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64'


const Form = ({ curr, setCurrent }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentuser = JSON.parse(window.localStorage.getItem('user'));

    const [Data, updateData] = useState({
        name: '',
        title: '',
        message: '',
        tags: [],
        selectedFile: ''
    });

    useEffect(() => {
        if (curr !== undefined) {
            updateData(curr);
        }
    }, [curr])

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (curr === undefined) {
            dispatch(postData({ ...Data, name: currentuser.profile.name }));
        }
        else {
            dispatch(updatePost(Data));
        }
        await handleclear();

    }

    const handleclear = async () => {
        setCurrent(undefined);
        updateData({
            name: '',
            title: '',
            message: '',
            tags: [],
            selectedFile: ''
        });
    }

    const handleAddChip=(chip)=>{
           updateData({...Data,tags:[...Data.tags,chip]});
    }

    const handleDeleteChip=(chip)=>{
        updateData({
            ...Data,
            tags:Data.tags.filter(tag=>tag!==chip)
        })
    }

    return (
        !currentuser ?
            <Paper className={classes.paper} elevation={4}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>

            :
            <Paper className={classes.paper} elevation={6}>
                <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handlesubmit} >
                    <Typography variant="h6">{curr === undefined ? 'Creating a post' : 'Editing a post'}</Typography>
                    <TextField type="text" name="title" required variant="outlined" fullWidth label="Title" value={Data.title} onChange={(e) => updateData({ ...Data, title: e.target.value })} />
                    <TextField type="text" name="message" required variant="outlined" fullWidth multiline label="Message" value={Data.message} onChange={(e) => updateData({ ...Data, message: e.target.value })} />
                    <div style={{ padding: '5px 0', width: '94%' }}>
                        <ChipInput
                            name="tags"
                            variant="outlined"
                            label="Tags"
                            fullWidth
                            value={Data.tags}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip) => handleDeleteChip(chip)}
                        />
                    </div>
                    {/* <TextField type="text" name="tags" required variant="outlined" fullWidth label="Tags" value={Data.tags} onChange={(e) => updateData({ ...Data, tags: e.target.value })} /> */}
                    <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => updateData({ ...Data, selectedFile: base64 })} /></div>
                    <Button type="submit" size="large" color="primary" variant="contained" fullWidth className={classes.buttonSubmit} >Submit</Button>
                    <Button size="small" color="secondary" variant="contained" fullWidth onClick={handleclear}>Clear</Button>
                </form>
            </Paper>
    )
}

export default Form

import React, { useState } from 'react'
import Form from '../../components/Form/form';
import Posts from '../../components/Posts/posts';
import { Grid, Grow, Container, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input';
import { getCurrentUserPosts, getsearchData } from '../../actions/postactions';
import Paginate from '../../components/Pagination/Pagination';
import useStyles from './styles'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Homepage = () => {

    const classes = useStyles();

    const [curr, setCurrent] = useState(undefined);
    const [titlesearch, setTitleSearch] = useState('');
    const [tagsearch, setTagSearch] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const currentUser = JSON.parse(window.localStorage.getItem('user'));
    // console.log(page);


    const handlechange = (e) => setTitleSearch(e.target.value)

    const handleSearch = () => {
        if (titlesearch.trim() || tagsearch) {
            dispatch(getsearchData({ title: titlesearch, tags: tagsearch }));
            history.push(`/posts/search`);
        }
        else {
            history.push('/');
        }
    }

    const handlemypost = async () => {
        // i have to dispatch an action
        if (currentUser) {
            dispatch(getCurrentUserPosts());

            history.push(`/posts/myposts/${currentUser.profile.googleId || currentUser.profile._id}`);
        }
        else {
            history.push('/Auth');
        }
    }

    const handleAddChip=(chip)=>{
        setTagSearch([...tagsearch,chip]);
    }

    const handleDeleteChip=(chip)=>{
        setTagSearch(tagsearch.filter(tag=>tag!==chip));
    }


    return (

        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={8} md={9}>
                        <Posts curr={curr} setCurrent={setCurrent} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Button className={classes.myposts} variant="contained" color="secondary" fullWidth onClick={() => handlemypost()}>My posts</Button>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit"  elevation={4}>
                            <TextField name="titlesearch" variant="outlined" label="Search Title" fullWidth
                                value={titlesearch}
                                onChange={handlechange}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tagsearch}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            {/* <TextField style={{margin:'10px 0'}} name="tagsearch" variant="outlined" label="Search Tag" fullWidth
                              value={tagsearch}
                              onChange={handlechange}
                             /> */}
                            <Button className={classes.searchButton} variant="contained" color="primary" onClick={handleSearch}>Search</Button>
                        </AppBar>
                        <Form curr={curr} setCurrent={setCurrent} />
                        {
                            !titlesearch && !tagsearch.length &&
                            <Paper className={classes.pagination} elevation={6}>
                                <Paginate page={page} />
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Homepage

import express from 'express';
import {deleteData, getData,postData,likeData, updateData, getSearchData, getParticularData,getCurrentUserPosts,PostComment} from '../controllers/postcontroller.js';
import Auth from '../middleware/auth.js';

const router=express.Router();


router.get('/search',getSearchData); 

router.get('/myposts',Auth,getCurrentUserPosts);

router.get('/',getData);

router.get('/:id',getParticularData);

router.post('/',Auth,postData);

router.post('/comment/:id',PostComment);

router.delete('/',Auth,deleteData);

router.patch('/',Auth,likeData);

router.put('/',Auth,updateData)

export default router;
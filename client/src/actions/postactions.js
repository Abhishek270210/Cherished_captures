import * as api from '../api/api';

export const getData=(page)=>async(dispatch)=>{
    try {
        dispatch({type:'LOADING_TRUE'});
        const {data}=await api.fetchData(page);
        // console.log(data);
        const getDataobj={
            type:'FETCH_ALL_POSTS',
            payload:data,
        }
         dispatch(getDataobj);
         dispatch({type:'LOADING_FALSE'});
    } catch (error) {
        console.log(error);
    }
}

export const getParticularData=(id)=>async(dispatch)=>{
     try {
        dispatch({type:'LOADING_TRUE'});
         const {data}=await api.fetchParticularPost(id);
        //  console.log(data);
         const particularPostObj={
             type:'FETCH_PARTICULAR_POST',
             payload:data
         }
         dispatch(particularPostObj);
         dispatch({type:'LOADING_FALSE'});
     } catch (error) {
         console.log(error);
     }
}

export const getsearchData=(searchFields)=>async(dispatch)=>{
    try {
        // console.log(searchFields);
        dispatch({type:'LOADING_TRUE'});
       const {data}=await api.fetchSearchData(searchFields);
    //    console.log(data);
       const getSearchDataObj={
           type:'FETCH_SEARCH_POST',
           payload:data
       }
       dispatch(getSearchDataObj);
       dispatch({type:'LOADING_FALSE'});
    } catch (error) {
        console.log(error);
    }
}

export const getCurrentUserPosts=()=>async(dispatch)=>{

    try {   
        dispatch({type:'LOADING_TRUE'});
        const {data}=await api.fetchCurrentUserPosts();
        // console.log(data);
        const currentUserObj={
            type:'CURRENT_USER_POSTS',
            payload:data
        }
        dispatch(currentUserObj);
        dispatch({type:'LOADING_FALSE'});
    } catch (error) {
        console.log(error);
    }
}

export const postData=(Data)=>async(dispatch)=>{
    //  console.log("my new posted data ")
    //  console.log(Data);
    try {
        dispatch({type:'LOADING_TRUE'});
         const {data}=await api.postData(Data);
         console.log(data);
        const postDataobj={
            type:'POST_NEW_DATA',
            payload:data,
        }
        dispatch(postDataobj);
        dispatch({type:'LOADING_FALSE'});
    } catch (error) {
        console.log(error);
    }
}


export const deleteData=(Data)=>async(dispatch)=>{
    //   console.log(Data);
      try {
         await api.deleteData(Data._id);
          const deleteDataobj={
              type:'DELETE_POST',
              payload:Data,
          }
          dispatch(deleteDataobj);
      } catch (error) {
          console.log(error);
      }
}

export const likePost=(Data)=>async(dispatch)=>{

    try {
      const {data}= await api.likePost(Data._id);
        const likePostobj={
            type:'LIKE_POST',
            payload:data,
        }
        dispatch(likePostobj);
    } catch (error) {
        console.log(error);
    }

}

export const updatePost=(Data)=>async(dispatch)=>{
    //   console.log(Data);
    try {
        const {data}=await api.updatePost(Data);
        const updatePostobj={
            type:'UPDATE_POST',
            payload:data
        }
        dispatch(updatePostobj);
    } catch (error) {
        console.log(error);
    }
}
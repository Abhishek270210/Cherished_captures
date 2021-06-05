import axios from 'axios';


const API=axios.create({baseURL:"http://localhost:5000"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('user'))
    {
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
    return req;
})



export const fetchData=(page)=>API.get(`/posts?page=${page}`);


export const fetchCurrentUserPosts=()=>API.get(`/posts/myposts`);

export const fetchParticularPost=(id)=>API.get(`/posts/${id}`);

export const fetchSearchData=(searchFileds)=>API.get(`/posts/search?title=${searchFileds.title || 'none'}&tags=${searchFileds.tags}`);

export const postData=(newPost)=>API.post(`/posts`,newPost);

export const deleteData=(id)=>API.delete(`/posts`,{data:{delete_id:id}});

export const likePost=(id)=>API.patch(`/posts`,{user_id:id});

export const updatePost=(Data)=>API.put(`/posts`,{updatedPost:Data});


export const signIn=(UserDetails)=>API.post(`/users/signin`,UserDetails);

export const signUp=(UserDetails)=>API.post(`/users/signup`,UserDetails);

const postReducer=(state={posts:[],loading:true},action)=>{
    switch (action.type) {
        case 'CURRENT_USER_POSTS':
            return {...state,currentuserPosts:action.payload};
        case 'LOADING_TRUE':
            return {...state,loading:true};
            case 'LOADING_FALSE':
                return {...state,loading:false};
        case 'FETCH_PARTICULAR_POST':
            return {...state,particularpost:action.payload};
        case 'FETCH_ALL_POSTS':
          return {...state,posts:action.payload.allposts,currentpage:action.payload.currentpage,totalpages:action.payload.totalpages};
          case 'FETCH_SEARCH_POST':
              return {...state,posts:action.payload};
          case 'POST_NEW_DATA':
            return {...state,posts:[...state.posts,action.payload]};
            case 'DELETE_POST':
                return {...state,posts:state.posts.filter(post=>post._id!==action.payload._id)};
                case 'LIKE_POST':
                    return {...state,posts:state.posts.map(post=>post._id===action.payload._id ? action.payload:post)};
                    case 'UPDATE_POST':
                        return {...state,posts:state.posts.map(post=>post._id===action.payload._id ? action.payload:post)};
                        case 'POST_COMMENT':
                            return {...state,posts:state.posts.map(post=>post._id===action.payload._id ? action.payload:post)};
        default:
            return state;
    }
}

export default postReducer;
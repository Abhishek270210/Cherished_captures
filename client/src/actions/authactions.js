import * as api from '../api/api';

export const SigninWithGoogle=(response)=>async(dispatch)=>{
      const profile=response.profileObj;
      const token=response.tokenId;
        try {
            
            const SigninWithGoogleObj={
                type:'SIGN_IN_WITH_GOOGLE',
                payload:{profile,token}
            }
            dispatch(SigninWithGoogleObj);
        } catch (error) {
            console.log(error);
        }
}

export const signInaction=(formData,history)=>async(dispatch)=>{
    try {
        const {data}=await api.signIn(formData);
        // console.log(data);
        const signInObj={
            type:'SIGN_IN',
            payload:data
        }
        dispatch(signInObj);
        history.push('/')
    } catch (error) {
        alert("Enter valid credentials !!!");
        console.log(error);
    }
}

export const signUpaction=(formData,history)=>async(dispatch)=>{
    try {
        const {data}=await api.signUp(formData);
        // console.log(data);
        const signUpObj={
            type:'SIGN_UP',
            payload:data
        }
        dispatch(signUpObj);
        history.push('/');
    } catch (error) {
        alert("Enter valid credentials !!!");
        console.log(error);
    }
}

export const LogOut=()=>async(dispatch)=>{
      
    try {
        const LogOutObj={
            type:'LOG_OUT',
        }
        dispatch(LogOutObj);
    } catch (error) {
        console.log(error);
    }
}
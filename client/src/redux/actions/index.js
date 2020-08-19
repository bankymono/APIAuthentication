import axios from 'axios'
import {AUTH_SIGN_UP, AUTH_ERROR} from './actionTypes'

const authSignUp = (payload) =>({
    type:AUTH_SIGN_UP,
    payload
})

const authError = (payload) =>({
    type:AUTH_ERROR,
    payload
})



export const oauthGoogle = data =>{
    return async dispatch =>{
        try {
            console.log('We received ', data) 

            const response = await axios.post('https://bankymono-auth-server.netlify.app/users/oauth/google',{
                access_token:data
            })           
            console.log('thaaa res',response)
        } catch (error) {
            
        }
    }
}

export const signUp = data =>{
    return async (dispatch) =>{
        try {
            const res = await axios.post('https://bankymono-auth-server.netlify.app/users/signup', data)
            console.log('res', res)

            dispatch(authSignUp(res.data.token))
            localStorage.setItem('JWT_TOKEN', res.data.token)
        } catch (err) {
            console.log('err', err)
            dispatch(authError('Email is already in use!'))
        }
    }
}
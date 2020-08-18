import { AUTH_SIGN_UP, AUTH_ERROR} from '../actions/actionTypes'
const DEFAULT_STATE = {
    isAuthenticated:false,
    jwtToken:'',
    errorMessage:''
}

const authReducer = (state=DEFAULT_STATE, action) =>{
    switch(action.type){
        case AUTH_SIGN_UP:
            return {
                ...state,
                isAuthenticated:true,
                jwtToken:action.payload,
                errorMessage:''
            }
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated:false,
                jwtToken:'',
                errorMessage:action.payload
            }
        default:
            return state

    }
}

export default authReducer
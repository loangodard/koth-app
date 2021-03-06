import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore} from 'redux'

import {DID_TRY_AL, LOGIN, LOGOUT, REGISTER} from "../actions/actionTypes"

const initialState = {isAuth:false,didTryAL:false}

const authReducer = (state,action) => {
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                ...action.payload,
                ...{
                    isAuth : true,}
            }
        case LOGOUT:
            AsyncStorage.removeItem('@userData')
            return{
                isAuth: false
            }
        case DID_TRY_AL:
            return{...state,
                didTryAL:true
            }
        default:
            return state
    }
}

const authStore = createStore(authReducer,initialState)

export {authStore}
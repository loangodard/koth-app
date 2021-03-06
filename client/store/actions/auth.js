import {LOGIN, LOGOUT,DID_TRY_AL} from "./actionTypes"

export const login = (userId,token) => ({
    type:LOGIN,
    payload:{
        userId:userId,
        token:token
    }
}) 

export const logout = () => ({
    type:LOGOUT
})

export const didTryAL = () => ({
    type:DID_TRY_AL
})
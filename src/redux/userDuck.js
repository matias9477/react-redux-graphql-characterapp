import { loginWithGoogle, signOutGoogle } from '../firebase';
import {retrieveFavs} from './charsDuck';

//constant
let initialData = {
    loggedIn:false,
    fetching:false
}
let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"
let LOGOUT = "LOGOUT"

//reducer

export default function reducer(state = initialData,action){
    switch(action.type){
        case LOGIN:
            return {...state, fetching:true}
        case LOGIN_ERROR:
            return {...state, fetching: false, error:action.payload}
        case LOGIN_SUCCESS:
            return {...state, fetching:false, ...action.payload, loggedIn:true}
        case LOGOUT:
            return {...initialData}
        default:   
            return state

    }
}

//aux para guardar cosas en localstorage
//sirve para respaldar el storage de redux, podemos guardar en localstorage todo lo que queremos guardar aunque se f5 la pagina
function saveStorage(storage){
    localStorage.storage = JSON.stringify(storage); //esto se hace porque no puedo pasar objetos jeje

}


//action

export let logoutAction = () => (dispatch, getState) =>{
    signOutGoogle()
    dispatch({
        type: LOGOUT
    })
    localStorage.removeItem('storage')
}

export let restoreSessionAction = () => dispatch =>{
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if(storage && storage.user){
        dispatch({
            type:LOGIN_SUCCESS,
            payload: storage.user
        })
    }
}

export let doGoogleLoginAction = () => (dispatch, getState) =>{
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()
    .then(user => { 

        dispatch({
            type:LOGIN_SUCCESS,
            payload: {
                uid: user.uid,
                displayName: user.displayName,
                email:user.email,
                photoURL: user.photoURL
                
            }
        })
        saveStorage(getState())
        retrieveFavs()(dispatch, getState)
    })
    .catch(e=>{
        console.log(e)
        dispatch({
            type:LOGIN_ERROR,
            payload: e.message
        })
    })
}
import React from 'react'
import styles from './login.module.css'
import {connect} from 'react-redux'
import {doGoogleLoginAction, logoutAction} from '../../redux/userDuck'


export  function LoginPage({fetching, loggedIn, doGoogleLoginAction, logoutAction}) {

    function doLogin(){
        doGoogleLoginAction()
    }

    function logout(){
        logoutAction()
    }

    if(fetching) return <h2>Loading...</h2>
    return (
        <div className={styles.container}>
            {loggedIn ?
                <h1>
                    Cierra tu sesión
                </h1>
                :
                <h1>
                    Inicia Sesión con Google
                </h1>

            }


            {loggedIn ? 
                    <button onClick={logout}>
                    Cerrar Sesión
                    </button>
                    :
                    <button onClick={doLogin}>
                    Iniciar
                    </button>
            }


        </div>
    )
}

function mapState({user:{fetching, loggedIn}}){
    return {
        fetching,
        loggedIn
    } //aunque no vaya a tomar nada del store, necesito esto o se hace pija todo
}

export default connect(mapState, {doGoogleLoginAction, logoutAction})(LoginPage)
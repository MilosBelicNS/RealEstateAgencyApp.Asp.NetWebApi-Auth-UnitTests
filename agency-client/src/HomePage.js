import React from 'react'
import RegisterForm from "./RegisterForm"
import TableOut from "./TableOut"
import TableIn from "./TableIn"




class HomePage extends React.Component {

    handleClick = () => {
       
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        window.location.reload()

    }

    render(){
        return (

            <div>
                {sessionStorage.getItem("token") ? <h3>Registered user: {sessionStorage.getItem("user")}</h3> : <h2 style={{textAlign: 'center'}}><strong>User is not logged in!</strong></h2>}
                {sessionStorage.getItem("token") ? null : <RegisterForm />}
                {sessionStorage.getItem("token") ? <button className="btn btn-danger" style={{float:"right"}} onClick={this.handleClick} >Log out</button> : null}
                {sessionStorage.getItem("token") ? <TableIn /> : <TableOut />}
            </div>
        )
    }
}

export default HomePage
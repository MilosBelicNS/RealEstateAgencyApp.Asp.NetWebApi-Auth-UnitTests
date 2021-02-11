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
                {sessionStorage.getItem("token") ? <h3 style={{backgroundColor:'lightBlue'}}>Registered user: {sessionStorage.getItem("user")}</h3> : <h2 style={{textAlign: 'center', backgroundColor:'lightBlue'}}>User is not logged in!</h2>}
                {<h3 style={{textAlign: 'center', backgroundColor:'darkslategray', color:'white'}}>Real estate agency App</h3>}
                {sessionStorage.getItem("token") ? null : <RegisterForm />}
                {sessionStorage.getItem("token") ? <button className="btn btn-danger" style={{float:"right", marginRight:'2%'}} onClick={this.handleClick} >Log out</button> : null}
                {sessionStorage.getItem("token") ? <TableIn /> : <TableOut />}
            </div>
        )
    }
}

export default HomePage
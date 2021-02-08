import React,{Component} from 'react'
import CreateProperty from "./EditProperty"
import {Table} from 'react-bootstrap'
import axios from "axios"


class TableIn extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isLoading: true,
            property: ""

        }
    }

    componentDidMount() {
        fetch("https://localhost:44378//api/Properties", { method: "GET" })
            .then(response => response.json())
            .then(data => {

                this.setState({
                    data: data
                })
                this.setState({ isLoading: false })
            })
    }

    handleClick = (event) => { 

        axios("https://localhost:44378//api/Properties" + event.target.name, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + this.state.token }
        })
            .then(() => { window.location.reload() }) 
             
       
    }



    render() {

        if (!this.isLoading) {
            const rows = this.state.data.map(x => <tr key={x.Id}><td>{x.Place}</td><td>{x.AgencyCode}</td><td>{x.ConstructionYear}</td><td>{x.Quadrature}</td><td>{x.Price}</td><td>{x.Agent.Name}</td>
                <td><button onClick={this.handleClick} className="btn btn-danger" name={x.Id}>Delete</button></td></tr>)

            return (
                <div>
                    <div style={{ marginTop: 50 }}>
                        <div className="col-sm-8 col-sm-push-2">

                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                    <th> Place</th>
                                    <th> AgencyCode</th>
                                    <th> ConstructionYear</th>
                                    <th> Quadrature</th>
                                    <th> Price</th>
                                    <th> Agent</th>
                                    <th> Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </Table>

                        </div>
                    </div>
                    {sessionStorage.getItem("token") ? <CreateProperty /> : null} 
                </div>
            )
        }


        else {
            return (
                <h1> Loading </h1>
            )
        }

    }
}



export default TableIn
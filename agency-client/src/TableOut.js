import React, {Component} from 'react'
import { Table } from 'react-bootstrap'

//import axios from "axios"



class TableOut extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isLoading: true
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



    render() {

        if (!this.isLoading) {
            const rows = this.state.data.map(x => <tr key={x.Id}><td>{x.Place}</td><td>{x.AgencyCode}</td><td>{x.ConstructionYear}</td><td>{x.Quadrature}</td><td>{x.Price}</td><td>{x.Agent.Name}</td></tr>)

            return (
                <div>
                    <br/>
                    <br/>
                    <div className= "col-sm-6 col-sm-push-1">
                    <Table striped bordered hover variant="dark">
                        <thead >
                            <tr>
                                <th> Place</th>
                                <th> AgencyCode</th>
                                <th> ConstructionYear</th>
                                <th> Quadrature</th>
                                <th> Price</th>
                                <th> Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                    </div>                    
                </div>
            )
        }


        else {
            return (
                <h1> Loading</h1> 
            )
        }

    }
}



export default TableOut
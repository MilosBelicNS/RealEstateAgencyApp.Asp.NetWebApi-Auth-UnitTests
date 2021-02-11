import React,{Component} from 'react'
import EditProperty from "./EditProperty"
import {Table} from 'react-bootstrap'
import axios from "axios"


class TableIn extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isLoading: true,
            property: "",
            showEditForm: false

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

        axios("https://localhost:44378/api/Properties" + event.target.name, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + this.state.token }
        })
            .then(() => { window.location.reload() }) 
             
       
    }
    handleClick2 = (event) => { 
        event.preventDefault()

        this.setState(prevState => {
            return ({ showForm: !prevState.showForm})
        })
        

        axios("https://localhost:44378//api/Properties" + event.target.name, {
            method: "GET",
            headers: { Authorization: "Bearer " + this.state.token }
        })
            .then(() => { window.location.reload() }) 
             
       
    }



    render() {

        if (!this.isLoading) {
            const rows = this.state.data.map(x => <tr key={x.Id}>
                                                  <td>{x.Place}</td>
                                                  <td>{x.AgencyCode}</td>
                                                  <td>{x.ConstructionYear}</td>
                                                  <td>{x.Quadrature}</td>
                                                  <td>{x.Price}</td>
                                                  <td>{x.Agent.Name}</td>
                                                  <td><button onClick={this.handleClick} className="btn btn-danger" name={x.Id}>Delete</button></td>
                                                  <td><button onClick={this.handleClick2} className="btn btn-warning" name={x.Id}>Edit</button></td></tr>)

            return (
                <div className='container'>

                     <div className= "row" >

                       
                    
                        <div style={{textAlign:'center', marginTop:'5%'}}> 

                            <h3 style={{backgroundColor:'darkslategray', color:"white"}}>Properties</h3>
                            <br/>
                            <Table  striped bordered hover variant="dark" size="sm">
                                <thead >
                                    <tr>
                                    <th> Place</th>
                                    <th> AgencyCode</th>
                                    <th> ConstructionYear</th>
                                    <th> Quadrature</th>
                                    <th> Price</th>
                                    <th> Agent</th>
                                    <th> Option</th>
                                    <th> Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </Table>

                        </div>
                        <div className='form-horizontal' style={{marginTop:'110px', marginLeft:'100px'}}>
                       
                          
                            <h5 >Search by quadrature</h5>
                              <br />
                               <div className="form-inline">
                                 <label  style={{marginRight:'10px'}}>From:</label>
                                 <div className='col-sm-4'>  
                                   <input style={{width:'180%'}}
                                          type="number" 
                                          className="form-control" 
                                          placeholder="Quadrature" 
                                          
                                    />
                                 </div>
                             </div>
                                <br />
                       <div className="form-inline">
                           <label style={{marginRight:'10px'}}>To:</label>
                           <div className='col-sm-4'>
                             <input style={{width:'180%', marginLeft:'20px'}}
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Quadrature" 
                                   
                                />
                            </div>
                        </div>
                               <br />
                            <button className="btn btn-info" style={{marginLeft:'80px', backgroundColor:'darkslategray'}}>Search</button>
                           
                     </div>

                       {/* <div className='form-ho' style={{marginTop:'5%', marginLeft:'11%'}}>
                           <h5 style={{marginLeft:'33%'}}>Search property by Quadrature</h5>
                            <form className="form-inline" style={{marginLeft:'16%',marginTop:'4%'}}>
                            <br />
                              <label style={{marginRight:'10px'}} > <strong> From: </strong> </label>
                          
                                  <input style={{marginRight:'10px'}}
                                   type="number"
                                   placeholder="From quadrature"
                                   className="form-inline"
                                   name="fromQuad"
                                   value={this.state.quadrature}
                                   onChange={this.handleChange}
                                />
                           
                          
                               <br/>
                         
                             <label style={{marginRight:'1px'}} > <strong> To: </strong> </label>
                         
                                 <input style={{marginLeft:'10px', marginRight:'20px'}}
                                  type="number"
                                  placeholder="To quadrature"
                                  className="form-inline"
                                  name="toQuad"
                                  value={this.state.quadrature}
                                  onChange={this.handleChange}
                               />
                          
                          
                               <br />
                               <button type="submit" className="btn btn-info" >Search</button>
                           
                                </form>
                         </div>*/}

                    </div>

                    {sessionStorage.getItem("token") ? <EditProperty /> : null} {/*ako ima token daj formu nek bude otvorena, za dodavanje, ako nema token nista */}
                    
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
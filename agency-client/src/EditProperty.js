import React,{Component} from 'react'
import axios from "axios"

class EditProperty extends Component {

    constructor() {
        super()
        this.state = {
            id: "",
            place: "",
            agencyCode: "",
            constructionYear: "",
            quadrature: "",
            price: "",
            agent: "",
            agents: [],//deklaracija selekta, dropdown
           // errors: []
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
       // this.handleOnBlur = this.handleOnBlur.bind(this);
    }


    handleSubmit = (event) => {
        console.log("in event")
        event.preventDefault()
        axios("https://localhost:44378/api/Properties/", {
            method: "PUT",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
            data: {

                Place: this.state.place,
                AgencyCode: this.state.agencyCode,
                ConstructionYear: this.state.constructionYear,
                Quadrature: this.state.quadrature,
                Price: this.state.price,
                AgentId: this.state.agent
            }
        }).then(() => alert("Edit successful!"))
            .then(() => { window.location.reload() })

            .catch(() => {
                alert("Edit failed! ")
            })

    }

    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }//setuj vrednost za input u formi

    handleSelectChange(event) {
        this.setState({ agent: event.target.value });
    }//setuj vrednost za dropdown

   

    componentDidMount() {
        fetch("https://localhost:44378/api/Properties/", { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log(this.state.agent)


                this.setState({ agents: data })
            })
    } //dobavljanje timova za selekt

    render() {
        const option1 = <option></option>
        const options = this.state.agents.map(x => <option value={x.Id} key={x.Id} className="form-control"> {x.Name} </option>)//konstanta za opcije u selektu

        console.log(this.state.errors);
        return (

            <div className='row'>


               <div class="col-sm-offset-4 col-sm-4" style={{marginLeft:'30%'}}>
            
                   <form className="form-horizontal" style={{ marginTop: "50px" }}>
                       <h4 style={{marginLeft:'110px'}}>Edit property</h4>
                          <br/>
                           <div className="form-inline">
                               <label className="control-label col-sm-pull-4"> 
                                 <strong> Agent: </strong> 
                               </label>
                                  <div className='col-sm-8'>
                                     <select style={{width:'120%',marginLeft:'70px'}}
                                             name="agent"
                                             className="form-control" 
                                             onChange={this.handleSelectChange} 
                                             value={this.state.agent}>
                                            [{option1},{options}]
                                     </select>
                                 </div>
                         </div>
                         <br />
                          <div className='form-inline'>
                             <label className="control-label col-sm-pull-4"> 
                               <strong> Place: </strong> 
                             </label>
                                  <div className='col-sm-8'>
                                    <input 
                                            style={{width:'110%', marginLeft:'97px'}}
                                            type="text"
                                            className="form-control"
                                            name="place"
                                            value={this.state.place}
                                            onChange={this.handleChange}
                                            required
                                            minLength="3"
                                            maxLength="40"

                                        />
                                 </div>
                         </div>
                   
                           <br />
                         <div className='form-inline'>
                             <label className="control-label col-sm-pull-4"> 
                                 <strong> Agency code: </strong> 
                            </label>
                               <div className='col-sm-8'>
                                  <input style={{width:'80%',  marginLeft:'101px'}}
                                         type="text"
                                         className="form-control"
                                         name="agencyCode"
                                         value={this.state.agencyCode}
                                         onChange={this.handleChange}
                                         required
                                         minLength="3"
                                         maxLength="6"
                                     />
                               </div>
                         </div>
                   
                          <br />
                         <div className='form-inline'>
                           <label className="control-label col-sm-pull-4"> 
                             <strong> ConstructionYear: </strong> 
                           </label>
                               <div className='col-sm-7'>
                                   <input style={{width:'55%', marginLeft:'134px'}} 
                                          type="number"
                                          className="form-control"
                                          name="constructionYear"
                                          value={this.state.constructionYear}
                                          onChange={this.handleChange}
                                          required
                                          min="1900"
                                          max="2018"
                                       />
                               </div>
                         </div>
                  
                    <br />
                         <div className='form-inline'>
                           <label className="control-label col-sm-pull-4"> 
                              <strong> Quadrature: </strong> 
                           </label>
                              <div className='col-sm-7'>
                                     <input style={{width:'55%', marginLeft:'177px'}}
                                            type="number"
                                            className="form-control"
                                            name="quadrature"
                                            value={this.state.quadrature}
                                            onChange={this.handleChange}
                                            required
                                            min="3"
                                            max="1500"
                                        />
                             </div>
                       </div>
                   
                          <br />
                       <div className='form-inline'>
                            <label className="control-label col-sm-pull-4"> 
                              <strong> Price: </strong> 
                            </label>
                              <div className='col-sm-7'>
                                    <input style={{width:'65%', marginLeft:'207px'}}
                                           type="number"
                                           className="form-control"
                                           name="price"
                                           value={this.state.price}
                                           onChange={this.handleChange}
                                           
                                      />
                               </div>
                     </div>
                  
                    <br />
                    <div className="form-group">
                    <button onClick={this.handleSubmit} className="btn btn-info" style={{ marginRight: "195px", backgroundColor:'darkslategray' }}> Update </button>
                    <button onClick={this.handleCancel} className="btn btn-warning"> Cancel  </button>
                    </div>
                </form>
            </div>
            </div>
            
        )
    }
}




export default EditProperty
import React,{Component} from 'react'
import axios from "axios"

class CreateProperty extends Component {

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

   /* handleOnBlur(event) {
        const value = event.target.value;
        const errors = [...this.state.errors];

        if (value === "") {
            errors[event.target.name] = true;
            this.setState({ errors });
        } else {
            errors[event.target.name] = false;
            this.setState({ errors });
        }//metoda za ispis gresaka
    }*/

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
            <div className="col-sm-6 col-sm-push-4">
                <form className="form-group" style={{ marginTop: "50px" }}>
                    <h4>Edit property:</h4>
                    <label> <strong> Agent: </strong> </label>
                    <select name="agent"
                            className="form-control" 
                            onChange={this.handleSelectChange} 
                            value={this.state.agent}>
                        [{option1},{options}]
                    </select>
                    <br />
                    <label> <strong> Place: </strong> </label>
                    <input type="text"
                        className="form-control"
                        name="place"
                        value={this.state.place}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                        required
                        minLength="3"
                        maxLength="40"

                    />
                   {/* {
                        this.state.errors['name'] && (
                            <small className="text-danger">This field is required!</small>
                        )
                    }*/}
                    <br />
                    <label> <strong> Agency code: </strong> </label>
                    <input type="text"
                        className="form-control"
                        name="agencyCode"
                        value={this.state.agencyCode}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                        required
                        minLength="3"
                        maxLength="6"
                    />
                   {/* {
                        this.state.errors['agencyCode'] && (
                            <small className="text-danger">This field is required! Molim Vas uneseti interval izmedju 1960-1994. godine</small>
                        )
                    }*/}
                    <br />
                    <label> <strong> Construction year: </strong> </label>
                    <input type="number"
                        className="form-control"
                        name="constructionYear"
                        value={this.state.constructionYear}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                        required
                        min="1900"
                        max="2018"
                    />
                   {/* {
                        this.state.errors['godinaZaposlenja'] && (
                            <small className="text-danger">Ovo polje je obavezno! Molim Vas uneseti interval izmedju 2001-2019. godine</small>
                        )
                    }*/}
                    <br />
                    <label> <strong> Quadrature: </strong> </label>
                    <input type="number"
                        className="form-control"
                        name="quadrature"
                        value={this.state.quadrature}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                        required
                        min="3"
                        max="1500"
                    />
                    {/*{
                        this.state.errors['rola'] && (
                            <small className="text-danger">Ovo polje je obavezno!</small>
                        )
                    }*/}
                    <br />
                    <label> <strong> Price: </strong> </label>
                    <input type="number"
                        className="form-control"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                    />
                    {/*{
                        this.state.errors['plata'] && (
                            <small className="text-danger">Ovo polje je obavezno!</small>
                        )
                    }*/}
                    <br />
                    <button onClick={this.handleSubmit} className="btn btn-primary" style={{ marginRight: "5px" }}> Update  </button>
                    <button onClick={this.handleCancel} className="btn btn-warning"> Cancel  </button>
                </form>
            </div>
        )
    }
}




export default CreateProperty
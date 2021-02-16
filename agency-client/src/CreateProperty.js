import React, { Component } from "react";
import axios from "axios";

class CreateProperty extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      place: "",
      agencyCode: "",
      constructionYear: "",
      quadrature: "",
      price: "",
      agent: "",
      agents: [],
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCancel = () => {
    this.setState({
      place: "",
      agencyCode: "",
      constructionYear: "",
      quadrature: "",
      price: "",
      agent: "",
    });
  };

  handleSubmit = (event) => {
    console.log("in event");
    event.preventDefault();
    axios("https://localhost:44378/api/Properties/", {
      method: "POST",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      data: {
        Place: this.state.place,
        AgencyCode: this.state.agencyCode,
        ConstructionYear: this.state.constructionYear,
        Quadrature: this.state.quadrature,
        Price: this.state.price,
        AgentId: this.state.agent,
      },
    })
      .then(() => alert("Created successful!"))
      .then(() => {
        window.location.reload();
      })

      .catch(() => {
        alert("Created failed! ");
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSelectChange = (event) => {
    this.setState({ agent: event.target.value });
  };

  componentDidMount() {
    fetch("https://localhost:44378/api/Properties/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ agents: data });
      });
  }

  render() {
    const options = this.state.agents.map((x) => (
      <option value={x.Id} key={x.Id} className="form-control">
        {" "}
        {x.Agent.Name}{" "}
      </option>
    ));

    return (
      <div className="row">
        <div className="col-sm-offset-4 col-sm-4" style={{ marginLeft: "30%" }}>
          <form className="form-horizontal" style={{ marginTop: "50px" }}>
            <h4 style={{ marginLeft: "110px" }}>Create property</h4>
            <br />
            <div className="form-inline">
              <label className="control-label col-sm-pull-4">
                <strong> Agent: </strong>
              </label>
              <div className="col-sm-8">
                <select
                  style={{ width: "120%", marginLeft: "70px" }}
                  name="agent"
                  className="form-control"
                  onChange={this.handleSelectChange}
                  defaultValue={this.state.agent.name}
                >
                  [{options}]
                </select>
              </div>
            </div>
            <br />
            <div className="form-inline">
              <label className="control-label col-sm-pull-4">
                <strong> Place: </strong>
              </label>
              <div className="col-sm-8">
                <input
                  style={{ width: "110%", marginLeft: "97px" }}
                  type="text"
                  className="form-control"
                  name="place"
                  defaultValue={this.state.place || ""}
                  onChange={this.handleChange}
                  required
                  minLength="3"
                  maxLength="40"
                />
              </div>
            </div>

            <br />
            <div className="form-inline">
              <label className="control-label col-sm-pull-4">
                <strong> Agency code: </strong>
              </label>
              <div className="col-sm-8">
                <input
                  style={{ width: "80%", marginLeft: "101px" }}
                  type="text"
                  className="form-control"
                  name="agencyCode"
                  defaultValue={this.state.agencyCode}
                  onChange={this.handleChange}
                  required
                  minLength="3"
                  maxLength="6"
                />
              </div>
            </div>

            <br />
            <div className="form-inline">
              <label className="control-label col-sm-pull-4">
                <strong> ConstructionYear: </strong>
              </label>
              <div className="col-sm-7">
                <input
                  style={{ width: "55%", marginLeft: "134px" }}
                  type="number"
                  className="form-control"
                  name="constructionYear"
                  defaultValue={this.state.constructionYear}
                  onChange={this.handleChange}
                  required
                  min="1900"
                  max="2018"
                />
              </div>
            </div>

            <br />
            <div className="form-inline">
              <label className="control-label col-sm-pull-4">
                <strong> Quadrature: </strong>
              </label>
              <div className="col-sm-7">
                <input
                  style={{ width: "55%", marginLeft: "177px" }}
                  type="number"
                  className="form-control"
                  name="quadrature"
                  defaultValue={this.state.quadrature}
                  onChange={this.handleChange}
                  required
                  min="3"
                  max="1500"
                />
              </div>
            </div>

            <br />
            <div className="form-inline">
              <label className="control-label col-sm-pull-4">
                <strong> Price: </strong>
              </label>
              <div className="col-sm-7">
                <input
                  style={{ width: "65%", marginLeft: "207px" }}
                  type="number"
                  className="form-control"
                  name="price"
                  defaultValue={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <br />
            <div className="form-group">
              <button
                onClick={this.handleSubmit}
                className="btn btn-info"
                style={{
                  marginRight: "195px",
                  backgroundColor: "darkslategray",
                }}
              >
                {" "}
                Add{" "}
              </button>
              <button onClick={this.handleCancel} className="btn btn-warning">
                {" "}
                Reset{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateProperty;

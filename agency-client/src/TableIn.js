import React, { Component } from "react";
import CreateProperty from "./CreateProperty";
import { Table } from "react-bootstrap";
import axios from "axios";

class TableIn extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
      min: "",
      max: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios("https://localhost:44378/api/search/", {
      method: "POST",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      data: {
        Min: this.state.min,
        Max: this.state.max,
      },
    }).then((object) => {
      this.setState({
        data: object.data,
      });
      this.setState({ isLoading: false });
    });
  };

  componentDidMount() {
    fetch("https://localhost:44378//api/Properties", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        });
        this.setState({ isLoading: false });
      });
  }

  handleClick = (event) => {
    axios("https://localhost:44378/api/Properties/" + event.target.name, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    }).then(() => {
      window.location.reload();
    });
  };

  render() {
    if (!this.isLoading) {
      const rows = this.state.data.map((x) => (
        <tr key={x.Id}>
          <td>{x.Place}</td>
          <td>{x.AgencyCode}</td>
          <td>{x.ConstructionYear}</td>
          <td>{x.Quadrature}</td>
          <td>{x.Price}</td>
          <td>{x.Agent.Name}</td>
          <td>
            <button
              onClick={this.handleClick}
              className="btn btn-danger"
              name={x.Id}
            >
              Delete
            </button>
          </td>
        </tr>
      ));

      return (
        <div className="container">
          <div className="row">
            <div style={{ textAlign: "center", marginTop: "5%" }}>
              <h3 style={{ backgroundColor: "darkslategray", color: "white" }}>
                Properties
              </h3>
              <br />
              <Table striped bordered hover variant="dark" size="sm">
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
                <tbody>{rows}</tbody>
              </Table>
            </div>
            <div
              className="form-horizontal"
              style={{ marginTop: "110px", marginLeft: "70px" }}
            >
              <h5>Search by quadrature</h5>
              <br />
              <div className="form-inline">
                <label style={{ marginRight: "10px" }}>From:</label>
                <div className="col-sm-4">
                  <input
                    style={{ width: "180%" }}
                    type="number"
                    name="min"
                    className="form-control"
                    placeholder="Quadrature"
                    value={this.state.min}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <br />
              <div className="form-inline">
                <label style={{ marginRight: "10px" }}>To:</label>
                <div className="col-sm-4">
                  <input
                    style={{ width: "180%", marginLeft: "20px" }}
                    type="number"
                    name="max"
                    className="form-control"
                    placeholder="Quadrature"
                    value={this.state.max}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <br />
              <button
                className="btn btn-info"
                style={{ marginLeft: "80px", backgroundColor: "darkslategray" }}
                onClick={this.handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
          {sessionStorage.getItem("token") ? <CreateProperty /> : null}
        </div>
      );
    } else {
      return <h1> Loading </h1>;
    }
  }
}

export default TableIn;

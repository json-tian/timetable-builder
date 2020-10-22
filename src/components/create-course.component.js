import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeDates = this.onChangeDates.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      code: "",
      dates: {}
    };
  }

  componentDidMount() {}

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value
    });
  }

  onChangeDates(dates) {
    this.setState({
      dates: dates
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const course = {
      name: this.state.name,
      description: this.state.description,
      code: this.state.code,
      dates: this.state.dates
    };

    console.log(course);

    axios
      .post("http://localhost:5000/courses/add", course)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Add a New Course</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Code: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.code}
              onChange={this.onChangeCode}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <input
                type="text"
                className="form-control"
                value={this.state.dates}
                onChange={this.onChangeDates}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Course"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import CoursePopup from "./course-popup.component";

const Course = props => (
  <tr>
    <th scope="row">{props.course.name}</th>
    <td>{props.course.code}</td>
    <td>{props.course.description}</td>
    <td>
      <CoursePopup course={props.course}></CoursePopup>
    </td>
  </tr>
);

export default class CoursesList extends Component {
  constructor(props) {
    super(props);

    this.deleteCourse = this.deleteCourse.bind(this);

    this.state = {
      courses: [],
      disciplines: [],
      selectedDisciplines: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/courses/")
      .then(response => {
        this.setState({ courses: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/disciplines/")
      .then(response => {
        this.setState({ disciplines: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteCourse(id) {
    axios.delete("http://localhost:5000/courses/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      courses: this.state.courses.filter(el => el._id !== id)
    });
  }

  courseList() {
    return this.state.courses.map(currentcourse => {
      if (this.state.selectedDisciplines.length === 0) {
        return (
          <Course
            course={currentcourse}
            deleteCourse={this.deleteCourse}
            key={currentcourse._id}
          />
        );
      } else if (
        this.state.selectedDisciplines.includes(currentcourse.discipline)
      ) {
        return (
          <Course
            course={currentcourse}
            deleteCourse={this.deleteCourse}
            key={currentcourse._id}
          />
        );
      }
    });
  }

  // Gets disciplines and converts to {value, label}
  disciplineList(disciplines) {
    if (disciplines !== undefined) {
      let disciplineList = [];
      disciplines.map(discipline => {
        disciplineList.push({
          value: discipline.name,
          label: discipline.name
        });
      });
      return disciplineList;
    }
  }

  // Update selected options state
  updateSelectedDisciplines = selectedOptions => {
    this.setState({ selectedOptions: selectedOptions }, () => {
      if (selectedOptions) {
        console.log(selectedOptions);
        let newSelectedDisciplines = [];
        selectedOptions.forEach(currentcourse => {
          newSelectedDisciplines.push(currentcourse.value);
        });
        this.setState({
          selectedDisciplines: newSelectedDisciplines
        });
      } else {
        this.setState({
          selectedDisciplines: []
        });
      }
    });
  };

  render() {
    const { selectedDisciplines } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-lg-3">
            <Select
              options={this.disciplineList(this.state.disciplines)}
              isSearchable="true"
              isMulti="true"
              value={this.disciplineList(this.getSelectedDisciplines)}
              placeholder="Filter by Discipline"
              onChange={this.updateSelectedDisciplines}
            />
          </div>

          <div className="col-lg-9">
            <h3>Courses Offered</h3>
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Code</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>{this.courseList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

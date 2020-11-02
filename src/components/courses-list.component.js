import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import CoursePopup from "./course-popup.component";
import { GET_DISCIPLINE, GET_COURSE } from "../query";
import { Query } from "react-apollo";

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
    this.createDisciplineList = this.createDisciplineList.bind(this);
    this.state = {
      courses: [],
      disciplines: [],
      selectedDisciplines: []
    };
  }

  componentDidMount() {}

  deleteCourse(id) {}

  courseList(list) {
    console.log(this.state.selectedDisciplines);
    let disciplines = [];
    for (let i = 0; i < this.state.disciplines.length; i++) {
      disciplines.push(this.state.disciplines[i].name);
    }

    console.log(this.state.disciplines);
    this.state.courses = list;
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
        this.state.selectedDisciplines.includes(
          disciplines[parseInt(currentcourse.discipline_id) - 1]
        )
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

  createDisciplineList(list) {
    this.state.disciplines = [];

    list.map(link => {
      this.state.disciplines.push(link);
    });
    return (
      <div>
        <Select
          options={this.disciplineList(this.state.disciplines)}
          isSearchable="true"
          isMulti="true"
          value={this.disciplineList(this.getSelectedDisciplines)}
          placeholder="Filter by Discipline"
          onChange={this.updateSelectedDisciplines}
        />
      </div>
    );
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
            <Query query={GET_DISCIPLINE}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>;
                if (error) return <div>Error</div>;

                const dataList = data.queryDiscipline;

                return <div>{this.createDisciplineList(dataList)}</div>;
              }}
            </Query>
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
              <Query query={GET_COURSE}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Fetching</div>;
                  if (error) return <div>Error</div>;

                  const dataList = data.queryCourse;

                  return <tbody>{this.courseList(dataList)}</tbody>;
                }}
              </Query>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

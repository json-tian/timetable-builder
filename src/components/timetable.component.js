import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import TableData from "./table.component";
import "./timetable.css";
import { GET_DISCIPLINE, GET_COURSE } from "../query";
import { Query } from "react-apollo";
import { generateTimetable } from "../generateTimetable";
import { useAlert } from "react-alert";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Course = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>{props.course.code}</td>
    {props.course.dates.map((item, key) => (
      <div class="row">
        <td key={item._id}>
          {daysOfWeek[item.dayOfWeek - 1]} {item.startTime} - {item.endTime}
        </td>
      </div>
    ))}
    <td>
      {props.course.dates.map((item, key) => (
        <div class="row">
          <td key={item._id}>{item.section}</td>
        </div>
      ))}
    </td>
  </tr>
);

export default class Timetable extends Component {
  constructor(props) {
    super(props);

    this.generate = this.generate.bind(this); // Allows access of states in function
    this.nextTime = this.nextTime.bind(this);
    this.prevTime = this.prevTime.bind(this);

    // courses - all course information in db
    // selectedOptions - selected options array (value, label)
    this.state = {
      courses: [],
      selectedOptions: [],
      selectedCourses: [],
      allTimes: [],
      currentPage: 0,
      totalPage: 0
    };
  }

  componentDidMount() {}

  // returns list of course information by what's in selectedOptions
  courseList() {
    return this.state.courses.map(currentcourse => {
      let courseNames = [];
      if (this.state.selectedOptions) {
        this.state.selectedOptions.map(currentcourse => {
          courseNames.push(currentcourse.value);
        });
        if (courseNames.includes(currentcourse.name)) {
          return (
            <Course
              course={currentcourse}
              deleteCourse={this.deleteCourse}
              key={currentcourse._id}
            />
          );
        }
      }
    });
  }

  // Gets courses and converts to {value, label}
  courseNameList() {
    let courseNames = [];
    this.state.courses.map(currentcourse => {
      courseNames.push({
        value: currentcourse.name,
        label: currentcourse.name
      });
    });
    return courseNames;
  }

  getSelectedCourses() {
    let selectedCourses = [];
    this.state.courses.map(currentcourse => {
      let courseNames = [];
      if (this.state.selectedOptions) {
        this.state.selectedOptions.map(coursename => {
          courseNames.push(coursename.value);
        });
        if (courseNames.includes(currentcourse.name)) {
          selectedCourses.push([currentcourse, -1]); // SETTING SECTION TO 1, later on read this value
        }
      }
    });

    return selectedCourses;
  }

  // Update selected options state
  updateSelect = selectedOptions => {
    this.setState({ selectedOptions: selectedOptions }, () => {
      this.setState({ selectedCourses: this.getSelectedCourses() });
    });
  };

  showDayOfWeek() {
    let columns = [];
    columns.push(<div>Time</div>);
    daysOfWeek.map(current => {
      columns.push(<div>{current}</div>);
    });
    return <React.Fragment>{columns}</React.Fragment>;
  }

  showTime() {
    let rows = [];
    // Render 8 AM to 9 PM
    for (var i = 8; i <= 20; i++) {
      let time = i;
      if (time > 12) time -= 12;
      rows.push(<div>{time}:00</div>);
      rows.push(<div>{time}:30</div>);
    }
    rows.push(<div>9:00</div>);

    return <React.Fragment>{rows}</React.Fragment>;
  }

  renderDates(course) {
    let tableData = [];
    console.log(course[0]);
    course[0].dates.map(date => {
      if (date.section === course[1])
        tableData.push(
          <TableData
            key={course[0].code}
            color={[180, 180, 255]}
            startTime={date.startTime}
            endTime={date.endTime}
            dayOfWeek={date.dayOfWeek}
            section={date.section}
            code={course[0].code}
            courseName={course[0].name}
            description={course[0].description}
          />
        );
    });
    return tableData;
  }

  async getCourseNames() {
    var courseNames = [];
    return new Promise((resolve, reject) => {
      this.state.selectedCourses.map(course => {
        courseNames.push(course[0].name);
      });
      Promise.all(courseNames).then(courseList => {
        resolve(courseList);
      });
    });
  }

  updateTimes() {
    var index = 0;
    const promiseArray = this.state.selectedCourses.map(item => {
      return new Promise((resolve, reject) => {
        let arr = [];
        arr.push(item[0]);
        let val3 = this.state.allTimes[this.state.currentPage - 1][index];
        arr.push(val3);
        index++;
        return resolve(arr);
      });
    });

    Promise.all(promiseArray).then(selected => {
      console.log(selected);
      this.setState({
        selectedCourses: selected
      });
    });
  }

  generate() {
    let courseIds = this.state.selectedCourses.slice(
      0,
      this.state.selectedCourses.length
    );
    let courses = [];
    for (let i = 0; i < courseIds.length; i++) {
      courses.push(courseIds[i][0]);
    }

    if (courses.length > 0) {
      //courseIds.pop();
      console.log(courses);
      console.log("generated");
      generateTimetable(courses).then(response => {
        console.log(response);

        this.setState(
          {
            allTimes: response,
            currentPage: 1,
            totalPage: response.length
          },
          () => {
            if (this.state.totalPage === 0) {
              this.setState({
                currentPage: 0
              });
            } else {
              this.updateTimes();
            }
          }
        );
      });
    }
  }

  nextTime() {
    if (this.state.currentPage < this.state.totalPage) {
      this.setState(
        {
          currentPage: this.state.currentPage + 1
        },
        () => {
          this.updateTimes();
        }
      );
    }
  }

  prevTime() {
    if (this.state.currentPage > 1) {
      this.setState(
        {
          currentPage: this.state.currentPage - 1
        },
        () => {
          this.updateTimes();
        }
      );
    }
  }

  createSelectedCourses(list, selectedOptions) {
    this.state.courses = [];
    list.map(item => {
      this.state.courses.push(item);
    });

    return (
      <div>
        <Select
          options={this.courseNameList()}
          isSearchable="true"
          isMulti="true"
          value={selectedOptions}
          placeholder="Choose courses"
          onChange={this.updateSelect}
        />
      </div>
    );
  }

  render() {
    const { selectedOptions } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-lg-5">
            <p>
              Select at least 1 course and press Generate Timetables to see the
              magic!
            </p>
            <h3>Selected Courses</h3>
            <Query query={GET_COURSE}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>;
                if (error) return <div>Error</div>;

                const dataList = data.queryCourse;

                return (
                  <React.Fragment>
                    {this.createSelectedCourses(dataList, selectedOptions)}
                  </React.Fragment>
                );
              }}
            </Query>

            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Choices</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>{this.courseList()}</tbody>
            </table>
          </div>
          <div className="col-lg-7">
            <button
              className="btn btn-primary generate"
              onClick={this.generate}
            >
              Generate Timetables
            </button>
            <button
              className="btn btn-secondary generate"
              onClick={this.prevTime}
            >
              <b>&lt;</b>
            </button>
            <span className="generate">
              <b>
                {this.state.currentPage}/{this.state.totalPage}
              </b>
            </span>
            <button
              className="btn btn-secondary generate"
              onClick={this.nextTime}
            >
              <b>&gt;</b>
            </button>
            <p>Scroll through the different possible timetables!</p>
            <div className="timetable">
              <section className="dayOfWeekWrapper">
                {this.showDayOfWeek()}
              </section>
              <section className="timeWrapper">{this.showTime()}</section>
              {this.state.selectedCourses.map(course => {
                return this.renderDates(course);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

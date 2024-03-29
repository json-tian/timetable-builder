import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/timetable-builder" className="navbar-brand">
          Timetable Builder
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/timetable-builder/courses" className="nav-link">
                Courses
              </Link>
            </li>
            {/* 
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Add Course
              </Link>
            </li> 
            */}
            <li className="navbar-item">
              <Link to="/timetable-builder/timetable" className="nav-link">
                Build Timetable
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

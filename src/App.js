import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import CoursesList from "./components/courses-list.component";
import EditCourse from "./components/edit-course.component";
import CreateCourse from "./components/create-course.component";
import Timetable from "./components/timetable.component";

import { GET_DISCIPLINE } from "./query";
import { useQuery } from "@apollo/react-hooks";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={CoursesList} />
        <Route path="/edit/:id" component={EditCourse} />
        <Route path="/create" component={CreateCourse} />
        <Route path="/timetable" component={Timetable} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;

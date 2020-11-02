import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import CoursesList from "./components/courses-list.component";
import EditCourse from "./components/edit-course.component";
import Timetable from "./components/timetable.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/timetable-builder/" exact component={CoursesList} />
        <Route
          path="/timetable-builder/courses"
          exact
          component={CoursesList}
        />
        <Route path="/timetable-builder/edit/:id" component={EditCourse} />
        {/*<Route path="/create" component={CreateCourse} /> */}
        <Route path="/timetable-builder/timetable" component={Timetable} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;

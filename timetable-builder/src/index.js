import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Course from "./components/Course/Course";
import CourseModify from "./components/CourseModify/CourseModify";

ReactDOM.render(<CourseModify />, document.getElementById('options'));
ReactDOM.render(<Course />, document.getElementById('courses'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

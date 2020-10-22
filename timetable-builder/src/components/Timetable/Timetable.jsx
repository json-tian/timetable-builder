//uses jsx extension rather than js b/c Better code completion
//imrc to generate react
//cc to generate class
import React, { Component } from "react";

class Timetable extends Component {

    render() {
        //Can't return multiple elements, therefore we can wrap everything in a div. Or use React.fragment, removes the div
        //Curly braces {} can type javascript inside (get state values, do math). In this case we run a method
        //className is used in JSX while JS uses class.
        //badge badge-primary is part of bootstrap. m-2 is margin
        return (
            <div>
                <button>Submit</button>
            </div>
        );
    }
}

export default CourseModify;

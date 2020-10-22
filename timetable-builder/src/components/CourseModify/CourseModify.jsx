//uses jsx extension rather than js b/c Better code completion
//imrc to generate react
//cc to generate class
import React, { Component } from "react";
import Course from "../Course/Course"

class CourseModify extends Component {
    //Holds all the data we need for this component
    state = {
        count: 5
    };

    renderButtons() {
        var buttons = [];
        for (var i = 0; i < this.state.count; i++) {
            buttons.push(<Course />);
        }
        return buttons;
    }

    render() {
        //Can't return multiple elements, therefore we can wrap everything in a div. Or use React.fragment, removes the div
        //Curly braces {} can type javascript inside (get state values, do math). In this case we run a method
        //className is used in JSX while JS uses class.
        //badge badge-primary is part of bootstrap. m-2 is margin
        return (
            <div>
                {this.renderButtons()}
            </div>
        );
    }
}

export default CourseModify;

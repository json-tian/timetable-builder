//uses jsx extension rather than js b/c Better code completion
//imrc to generate react
//cc to generate class
import React, { Component } from "react";

class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = { start: '' };
    this.state = { end: '' };
    this.updateStart = this.updateStart.bind(this);
    this.updateEnd = this.updateEnd.bind(this);

  }

  updateStart(event) {
    this.setState({ start: event.target.value });
    console.log("start: " + event.target.value);
  };

  updateEnd(event) {
    this.setState({ end: event.target.value });
    console.log("end: " + event.target.value);
  };

  render() {
    //Can't return multiple elements, therefore we can wrap everything in a div. Or use React.fragment, removes the div
    //Curly braces {} can type javascript inside (get state values, do math). In this case we run a method
    //className is used in JSX while JS uses class.
    //badge badge-primary is part of bootstrap. m-2 is margin
    return (
      <div>
        <h1>Start time</h1>
        <select id="start" onChange={this.updateStart}>
          <option value="8">8:00 AM</option>
          <option value="9">9:00 AM</option>
          <option value="10">10:00 AM</option>
          <option value="11">11:00 AM</option>
          <option value="12">12:00 PM</option>
          <option value="13">1:00 PM</option>
          <option value="14">2:00 PM</option>
          <option value="15">3:00 PM</option>
          <option value="16">4:00 PM</option>
          <option value="17">5:00 PM</option>
          <option value="18">6:00 PM</option>
          <option value="19">7:00 PM</option>
        </select>

        <h1>End time</h1>
        <select id="end" onChange={this.updateEnd}>
          <option value="8">8:00 AM</option>
          <option value="9">9:00 AM</option>
          <option value="10">10:00 AM</option>
          <option value="11">11:00 AM</option>
          <option value="12">12:00 PM</option>
          <option value="13">1:00 PM</option>
          <option value="14">2:00 PM</option>
          <option value="15">3:00 PM</option>
          <option value="16">4:00 PM</option>
          <option value="17">5:00 PM</option>
          <option value="18">6:00 PM</option>
          <option value="19">7:00 PM</option>
        </select>
      </div>
    );
  }

  formatCount() {
    //JSX objects are just like JS, but can compiled with REACT. EXAMPLE:
    //return this.state.count === 0 ? <h1>Zero</h1> : this.state.count;

    return this.state.count === 0 ? "Zero" : this.state.count;
  }
}

export default Counter;

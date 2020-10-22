import React, { Component } from "react";
import "./popup.styles.css";
import { Button, Modal } from "react-bootstrap";
import * as Constants from "../constants/dates";

function displayDates(dates) {
  return dates.map(currentdate => {
    return (
      <React.Fragment>
        {Constants.DAYOFWEEK[currentdate.dayOfWeek - 1]} {currentdate.startTime}
        {":00"}
        {" - "}
        {currentdate.endTime}
        {":00"}
        <br></br>
      </React.Fragment>
    );
  });
}

const Row = props => (
  <tr>
    <th scope="row">Lecture {props.date[0].section}</th>
    <td>{displayDates(props.date)}</td>
    <td>-</td>
    <td>---</td>
  </tr>
);

class Popup extends Component {
  state = {
    setShow: false,
    course: this.props.course
  };

  courseInfo() {
    // Loop through dates

    let items = [];
    let rowData = [];
    for (let i = 1; i <= this.state.course.sections; i++) {
      for (const [index, value] of this.state.course.dates.entries()) {
        if (value.section === i) {
          items.push(value);
        }
      }
      // render times
      rowData.push(<Row date={items}></Row>);
      items = [];
    }
    return rowData;
  }

  render() {
    const handleClose = () => this.setState({ setShow: false });
    const handleShow = () => this.setState({ setShow: true });
    return (
      <React.Fragment>
        <Button variant="primary" onClick={handleShow}>
          Details
        </Button>
        <Modal
          show={this.state.setShow}
          size="lg"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Course Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">Time</th>
                  <th scope="col">Location</th>
                  <th scope="col">Instructor</th>
                </tr>
              </thead>
              <tbody>{this.courseInfo()}</tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Popup;

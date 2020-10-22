import React, { Component } from "react";
import "./popup.styles.css";
import { Button, Modal } from "react-bootstrap";
import * as Constants from "../constants/dates";

const Row = props => (
  <tr>
    <th scope="row">Lecture {props.date.section}</th>
    <td>
      {Constants.DAYOFWEEK[props.date.dayOfWeek - 1]} {props.date.startTime}
      {":00"}
      {" - "}
      {props.date.endTime}
      {":00"}
    </td>
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
    /*
    let items = [];
    for (const [index, value] of this.state.course.dates.entries()) {
      
      items.push(<Element key={index} />);
    }*/
    return this.state.course.dates.map(currentdate => {
      return <Row date={currentdate}></Row>;
    });
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

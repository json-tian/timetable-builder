import React from "react";
import "./timetable.css";
import { Paper } from "@material-ui/core";

const TableData = props => {
  if (props.day !== null) {
    let rowStart = props.startTime - 8 + 2 + (props.startTime - 8);
    let rowEnd = props.endTime - 8 + 2 + (props.endTime - 8);
    let column =
      String(props.dayOfWeek + 1) + " / " + String(props.dayOfWeek + 2);

    const tableDataMainStyle = {
      backgroundColor: `rgb(${props.color})`,
      fontSize: "14px",
      gridRowStart: rowStart,
      gridRowEnd: rowEnd,
      gridColumn: column
    };
    return (
      <Paper elevation={3} style={tableDataMainStyle} className="tableElement">
        {props.courseName}
        <br />
        {props.code}
        <br />
        Section: {props.section}
      </Paper>
    );
  } else {
    return null;
  }
};

export default TableData;

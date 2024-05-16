import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AttendanceProgressBar = ({ attendeesCount, maxCapacity }) => {
  // Calculate the percentage of attendance
  const attendancePercentage = (attendeesCount / maxCapacity) * 100;

  // Determine the color based on attendance percentage
  let color;
  if (attendancePercentage < 50) {
    color = "red"; // Red
  } else if (attendancePercentage < 75) {
    color = "orange"; // Orange
  } else {
    color = "green"; // Green
  }

  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbar
        value={attendancePercentage}
        text={`${attendancePercentage.toFixed(2)}%`}
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: "butt",
          textSize: "18px",
          pathColor: color,
          textColor: color,
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};

export default AttendanceProgressBar;

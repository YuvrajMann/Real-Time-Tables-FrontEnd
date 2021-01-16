import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Spinner.css";
const Spinner = (props) => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className="spinner"
      {...props}
    ></FontAwesomeIcon>
  );
};

export default Spinner;

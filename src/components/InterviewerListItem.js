import React from "react";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewerClass = "interviewers__item";
  if (props.selected) {
    interviewerClass += " interviewers__item--selected";
  }

  return (
    <li
      onClick={props.setInterviewer}
      className={interviewerClass}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
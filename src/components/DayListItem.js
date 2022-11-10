import React from "react";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = "day-list__item";
  if (props.selected) {
    dayClass += " day-list__item--selected";
  }
  if (props.spots === 0) {
    dayClass += " day-list__item--full";
  }

  let spotsText = "";
  if (props.spots === 0) {
    spotsText = "no spots remaining";
  } else if (props.spots === 1) {
    spotsText = "1 spot remaining";
  } else {
    spotsText = props.spots + " spots remaining";
  }

  return (
    <li onClick={() => {props.setDay(props.name)}} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsText}</h3>
    </li>
  );
}

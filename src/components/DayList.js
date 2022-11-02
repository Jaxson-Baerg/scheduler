import React from "react";
import DayListItem from "./DayListItem";

// import "components/DayList.scss";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((day, i) => 
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      )}
    </ul>
  );
}

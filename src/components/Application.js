import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  } = useApplicationData();
  
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const schedule = getAppointmentsForDay(state, state.day).map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        appID={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        updateSpots={updateSpots}
      /> 
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay}/>
      </nav>
      <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}

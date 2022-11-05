export function getAppointmentsForDay(state, dayName) {
  const dayAppointments = [];
  
  for (const day of state.days) {
    if (day.name === dayName) {
      for (const appointmentID of day.appointments) {
        dayAppointments.push(state.appointments[appointmentID]);
      }
    }
  }

  return dayAppointments;
}

export function getInterviewersForDay(state, dayName) {
  const dayInterviewers = [];
  
  for (const day of state.days) {
    if (day.name === dayName) {
      for (const interviewerID of day.interviewers) {
        dayInterviewers.push(state.interviewers[interviewerID]);
      }
    }
  }

  return dayInterviewers;
}

export function getInterview(state, interview) {
  const newInterviewObj = {...interview};

  if (interview) {
    newInterviewObj.interviewer = state.interviewers[newInterviewObj.interviewer]
  } else return interview;

  return newInterviewObj;
}

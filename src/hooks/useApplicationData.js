import { useEffect, useReducer } from "react";
import axios from "axios";

import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, initialState, reducer } from "reducers/application";

export default function useApplicationData () {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({type: SET_DAY, day });

  const updateSpots = (state, appointments) => {
    return state.days.map(day => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.appointments
            .map(id => appointments[id])
            .filter(({interview}) => !interview)
            .length
        };
      }
      return day;
    });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(dispatch({
        type: SET_INTERVIEW,
        interview: {
          days: updateSpots(state, appointments),
          appointments,
          interviewers: state.interviewers
        }
      }));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, { interview: null })
      .then(dispatch({
          type: SET_INTERVIEW,
          interview: {
            days: updateSpots(state, appointments),
            appointments,
            interviewers: state.interviewers
          }
        }));
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        state: {
          day: state.day,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, [state.day]);

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}
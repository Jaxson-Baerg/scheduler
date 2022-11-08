import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return action.state;
    case SET_INTERVIEW: {
      return {
        day: state.day,
        ...action.interview
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

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
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_MAIN_PAGE_REQUEST,
  USER_MAIN_PAGE_SUCCESS,
  USER_MAIN_PAGE_FAIL,
  USER_ADD_WORKOUTS_REQUEST,
  USER_ADD_WORKOUTS_SUCCESS,
  USER_ADD_WORKOUTS_FAIL,
  USER_GET_WORKOUTS_REQUEST,
  USER_GET_WORKOUTS_SUCCESS,
  USER_GET_WORKOUTS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_WORKOUT_OF_DAY_REQUEST,
  USER_WORKOUT_OF_DAY_SUCCESS,
  USER_WORKOUT_OF_DAY_FAIL,
  USER_GET_WORKOUT_REQUEST,
  USER_GET_WORKOUT_SUCCESS,
  USER_GET_WORKOUT_FAIL,
  USER_DELETE_WORKOUT_REQUEST,
  USER_DELETE_WORKOUT_SUCCESS,
  USER_DELETE_WORKOUT_FAIL,
  USER_UPDATE_WORKOUT_REQUEST,
  USER_UPDATE_WORKOUT_SUCCESS,
  USER_UPDATE_WORKOUT_FAIL,
  USER_ADD_EXERCISE_REQUEST,
  USER_ADD_EXERCISE_SUCCESS,
  USER_ADD_EXERCISE_FAIL,
} from "../constants/userConstants";
import axios from "axios";

const API_KEY = "a8QKtCXDr+YhDzCuEze3sg==92yRGYcjvYNszt5X";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (name, email, password, height, weight) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { name, email, password, height, weight },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMainPage = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_MAIN_PAGE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users/main", config);

    dispatch({
      type: USER_MAIN_PAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_MAIN_PAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addUserWorkout = (workout, day) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_WORKOUTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const workoutData = {
      workouts: [{ name: workout, day: day }],
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put("/api/users/workouts", workoutData, config);

    dispatch({
      type: USER_ADD_WORKOUTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_ADD_WORKOUTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserWorkout = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_WORKOUTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users/workouts", config);

    dispatch({
      type: USER_GET_WORKOUTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_WORKOUTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users/profile", config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWorkoutsOfDayCall = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_WORKOUT_OF_DAY_REQUEST,
    });

    const config = {
      headers: {
        "X-Api-Key": API_KEY,
      },
    };

    const { data } = await axios.get(
      "https://api.api-ninjas.com/v1/exercises?muscle=biceps",
      config
    );

    dispatch({
      type: USER_WORKOUT_OF_DAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_WORKOUT_OF_DAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleWorkout = (workoutId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_WORKOUT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/workout/${workoutId}`, config);

    dispatch({
      type: USER_GET_WORKOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_WORKOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWorkout = (workoutId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_WORKOUT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/workout/${workoutId}`, config);

    dispatch({
      type: USER_DELETE_WORKOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_WORKOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const UpdateWorkout = (workout, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_WORKOUT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/users/workout/${id}`, workout, config);

    dispatch({
      type: USER_UPDATE_WORKOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_WORKOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addExercise = (exercise, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_EXERCISE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const exerciseObject = {
      exercise: exercise,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.patch(
      `/api/users/workout/${id}/exercises`,
      exerciseObject,
      config
    );

    dispatch({
      type: USER_ADD_EXERCISE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_ADD_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

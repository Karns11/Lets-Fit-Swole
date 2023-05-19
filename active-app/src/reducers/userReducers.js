import {
  USER_ADD_WORKOUTS_FAIL,
  USER_ADD_WORKOUTS_REQUEST,
  USER_ADD_WORKOUTS_SUCCESS,
  USER_DELETE_WORKOUT_FAIL,
  USER_DELETE_WORKOUT_REQUEST,
  USER_DELETE_WORKOUT_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_GET_WORKOUTS_FAIL,
  USER_GET_WORKOUTS_REQUEST,
  USER_GET_WORKOUTS_SUCCESS,
  USER_GET_WORKOUT_FAIL,
  USER_GET_WORKOUT_REQUEST,
  USER_GET_WORKOUT_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_MAIN_PAGE_FAIL,
  USER_MAIN_PAGE_REQUEST,
  USER_MAIN_PAGE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_WORKOUT_FAIL,
  USER_UPDATE_WORKOUT_REQUEST,
  USER_UPDATE_WORKOUT_SUCCESS,
  USER_WORKOUT_OF_DAY_FAIL,
  USER_WORKOUT_OF_DAY_REQUEST,
  USER_WORKOUT_OF_DAY_SUCCESS,
} from "../constants/userConstants";

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userMainPageReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_MAIN_PAGE_REQUEST:
      return { loading: true };
    case USER_MAIN_PAGE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_MAIN_PAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const addUserWorkoutsReducer = (state = { workouts: [] }, action) => {
  switch (action.type) {
    case USER_ADD_WORKOUTS_REQUEST:
      return { loading: true };
    case USER_ADD_WORKOUTS_SUCCESS:
      return { loading: false, workouts: action.payload };
    case USER_ADD_WORKOUTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const getUserWorkoutsReducer = (state = { workouts: [] }, action) => {
  switch (action.type) {
    case USER_GET_WORKOUTS_REQUEST:
      return { loading: true };
    case USER_GET_WORKOUTS_SUCCESS:
      return {
        ...state,
        workouts: action.payload,
        error: null,
        loading: false,
      };
    case USER_GET_WORKOUTS_FAIL:
      return {
        ...state,
        workouts: [],
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const getWorkoutsOfDayReducer = (state = { workouts: [] }, action) => {
  switch (action.type) {
    case USER_WORKOUT_OF_DAY_REQUEST:
      return { ...state, loading: true };
    case USER_WORKOUT_OF_DAY_SUCCESS:
      return {
        ...state,
        workoutsOfDay: action.payload,
        error: null,
        loading: false,
      };
    case USER_WORKOUT_OF_DAY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const getWorkoutReducer = (state = { workout: {} }, action) => {
  switch (action.type) {
    case USER_GET_WORKOUT_REQUEST:
      return { loading: true };
    case USER_GET_WORKOUT_SUCCESS:
      return {
        workout: action.payload,
        error: null,
        loading: false,
      };
    case USER_GET_WORKOUT_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const deleteWorkoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_WORKOUT_REQUEST:
      return { loading: true };
    case USER_DELETE_WORKOUT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_WORKOUT_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const updateWorkoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_WORKOUT_REQUEST:
      return { loading: true };
    case USER_UPDATE_WORKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USER_UPDATE_WORKOUT_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export {
  userLoginReducer,
  userRegisterReducer,
  userMainPageReducer,
  addUserWorkoutsReducer,
  getUserWorkoutsReducer,
  userDetailsReducer,
  getWorkoutsOfDayReducer,
  getWorkoutReducer,
  deleteWorkoutReducer,
  updateWorkoutReducer,
};

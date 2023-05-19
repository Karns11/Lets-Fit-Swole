import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // I still add this for my reference so I know thunk middleware is added

import {
  userRegisterReducer,
  userLoginReducer,
  userMainPageReducer,
  addUserWorkoutsReducer,
  getUserWorkoutsReducer,
  userDetailsReducer,
  getWorkoutsOfDayReducer,
  getWorkoutReducer,
  deleteWorkoutReducer,
  updateWorkoutReducer,
} from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userMainPage: userMainPageReducer,
    addUserWorkouts: addUserWorkoutsReducer,
    getUserWorkouts: getUserWorkoutsReducer,
    userDetails: userDetailsReducer,
    getWorkoutsOfDay: getWorkoutsOfDayReducer,
    getWorkout: getWorkoutReducer,
    deleteWorkout: deleteWorkoutReducer,
    updateWorkout: updateWorkoutReducer,
  },
  preloadedState: {
    userLogin: { userInfo: userInfoFromStorage },
  },
  middleware: [thunk],
});

export default store;

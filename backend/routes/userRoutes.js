import express from "express";
const router = express.Router();
import {
  addExercise,
  addWorkout,
  authUser,
  deleteWorkout,
  getUserMainPage,
  getUserProfile,
  getWorkoutById,
  getWorkouts,
  registerUser,
  updateUserProfile,
  updateWorkout,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/main").get(protect, getUserMainPage);
router.route("/workouts").put(protect, addWorkout).get(protect, getWorkouts);
router.route("/workout/:id/exercises").patch(protect, addExercise);
router
  .route("/workout/:id")
  .get(protect, getWorkoutById)
  .delete(protect, deleteWorkout)
  .put(protect, updateWorkout);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import { ObjectId } from "bson";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      height: user.height,
      weight: user.weight,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, height, weight, workouts } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //PASSWORD WILL BE ENCRYPTED ONCE USER.CREATE IS RUN DUE TO THE .PRE METHOD IN THE USER MODEL
  const user = await User.create({
    name,
    email,
    password,
    height,
    weight,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      height: user.height,
      weight: user.weight,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Get users main page
// @route GET /api/users/main
// @access Private
const getUserMainPage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      name: user.name,
      height: user.height,
      weight: user.weight,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Add workout to user
// @route PUT /api/users/workouts
// @access Private
const addWorkout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const newWorkout = req.body.workouts.map((workout) => {
      return {
        _id: new ObjectId(),
        name: workout.name,
        day: workout.day,
        exercises: workout.exercises,
      };
    });

    user.workouts.push(...newWorkout); // Spread the newWorkout array to push individual objects

    await user.save();
    res.status(201).json({
      name: user.name,
      email: user.email,
      height: user.height,
      weight: user.weight,
      workouts: user.workouts,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Get workouts
// @route GET /api/users/workouts
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      workouts: user.workouts,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.weight = req.body.weight || user.weight;
    user.height = req.body.height || user.height;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      weight: updatedUser.weight,
      height: updatedUser.height,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get workout by Id
// @route Get /api/users/workout/:id
// @access Private
const getWorkoutById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const workoutId = req.params.id;

  const workout = user.workouts.id(workoutId);
  if (!workout) {
    return res.status(404).json({ message: "Workout not found" });
  }

  res.json(workout);
});

// @desc Delete a workout
// @route DELETE /api/users/workout/:id
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the authenticated user's ID is available in req.user._id
    const workoutId = req.params.id; // ID of the workout to be deleted

    // Find the user by ID and update the workouts array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { workouts: { _id: workoutId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Workout deleted successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc Update workout
// @route PUT /api/users/workout/:id
// @access Private
const updateWorkout = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const workoutId = req.params.id;
    const { name, day, exercise } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: userId, "workouts._id": workoutId },
      {
        $set: {
          "workouts.$.name": name,
          "workouts.$.day": day,
          "workouts.$.exercise": exercise,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User or workout not found" });
    }

    return res
      .status(200)
      .json({ message: "Workout updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

const addExercise = asyncHandler(async (req, res) => {
  try {
    const workoutId = req.params.id;
    const { exercise } = req.body;

    const user = await User.findById(req.user._id); // Correct the typo in "findById"

    if (!user) {
      res.status(400);
      throw new Error("Invalid user data");
    }

    const workout = user.workouts.find(
      (workout) => workout._id.toString() === workoutId
    );

    if (!workout) {
      res.status(404);
      throw new Error("Workout not found");
    }

    workout.exercises.push(exercise);

    await user.save();

    res.status(200).json({
      name: user.name,
      email: user.email,
      height: user.height,
      weight: user.weight,
      workouts: user.workouts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export {
  authUser,
  getUserMainPage,
  registerUser,
  addWorkout,
  getWorkouts,
  getUserProfile,
  updateUserProfile,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
  addExercise,
};

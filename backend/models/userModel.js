import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const workoutSchema = mongoose.Schema({
  name: String,
  day: String,
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    height: Number,
    weight: Number,
    workouts: [workoutSchema],
  },
  {
    timestamps: true,
  }
);

//ALLOWS US TO USE THE METHOD MATCHPASSWORD WHEN SUTHENTICATING A USER
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//ALLOWS US TO ENCRYPT THE PASSWORD BEFORE SAVING IT INTO THE DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;

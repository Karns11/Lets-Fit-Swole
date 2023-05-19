import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  UpdateWorkout,
  addExercise,
  getSingleWorkout,
} from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const WorkoutScreen = ({ match }) => {
  const [day, setDay] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [exercise, setExercise] = useState("");
  // const [selectedDay, setSelectedDay] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const getWorkout = useSelector((state) => state.getWorkout);
  const { loading, error, workout } = getWorkout;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleWorkout(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (workout) {
      setWorkoutName(workout.name);
      setDay(workout.day);
    }
  }, [workout]);

  const handleUpdateSubmit = () => {
    dispatch(
      UpdateWorkout(
        {
          name: workoutName,
          day: day,
        },
        id
      )
    );
  };

  const addExerciseSubmitHandler = () => {
    dispatch(addExercise(exercise, id));
  };

  // const daysOfWeek = [
  //   "monday",
  //   "tuesday",
  //   "wednesday",
  //   "thursday",
  //   "friday",
  //   "saturday",
  //   "sunday",
  // ];

  return (
    <>
      <Row>
        <Col md={6}>
          {loading && <Loader></Loader>}
          {error && <Message variant="danger">{error}</Message>}
          <h2>
            Your {workout && workout.name} {""}Workout
          </h2>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="day">
              <Form.Label>Workout Day</Form.Label>
              <Form.Control
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form onSubmit={addExerciseSubmitHandler}>
            <Form.Group controlId="day">
              <Form.Label>Exercise</Form.Label>
              <Form.Control
                type="text"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                placeholder="Set new exercise..."
              ></Form.Control>
            </Form.Group>

            <ul>
              {workout &&
                workout.exercises &&
                workout.exercises.map((singleWorkout, ind) => (
                  <li key={ind}>{singleWorkout}</li>
                ))}
            </ul>

            <Button type="submit">Add Exercise</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default WorkoutScreen;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getSingleWorkout } from "../actions/userActions";

const WorkoutScreen = ({ match }) => {
  const [day, setDay] = useState("");
  const [workoutName, setWorkoutName] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const getWorkout = useSelector((state) => state.getWorkout);
  const { loading, error, workout } = getWorkout;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleWorkout(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Col md={6}>
        <h2>
          Your {workout && workout.name} {""}Workout
        </h2>
        <Form>
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
  );
};

export default WorkoutScreen;

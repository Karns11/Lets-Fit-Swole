import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkout, getMainPage } from "../actions/userActions";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  addUserWorkout,
  getUserWorkout,
  getWorkoutsOfDayCall,
} from "../actions/userActions";

const MainScreen = () => {
  const dispatch = useDispatch();
  const [aWorkout, setAWorkout] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const userMainPage = useSelector((state) => state.userMainPage);
  const { loading, error, user } = userMainPage;

  const addUserWorkouts = useSelector((state) => state.addUserWorkouts);
  const { loading: loadingAddUserWorkouts, error: errorAddUserWorkouts } =
    addUserWorkouts;

  const getWorkoutsOfDay = useSelector((state) => state.getWorkoutsOfDay);
  // const {
  //   loading: loadingWorkoutsOfDay,
  //   error: errorWorkoutsOfDay,
  //   workoutsOfDay,
  // } = getWorkoutsOfDay;

  const {
    workouts,
    error: errorWorkouts,
    loading: loadingWorkouts,
  } = useSelector((state) => state.getUserWorkouts);

  useEffect(() => {
    dispatch(getMainPage());
    dispatch(getUserWorkout());
    dispatch(getWorkoutsOfDayCall());
  }, [dispatch]);

  const workoutSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addUserWorkout(aWorkout, selectedDay));
    setAWorkout("");
    setSelectedDay("");
    dispatch(getUserWorkout());
  };

  const deleteWorkoutHandler = (id) => {
    dispatch(deleteWorkout(id));
    dispatch(getUserWorkout());
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const randomIndex =
    getWorkoutsOfDay.workoutsOfDay &&
    Math.floor(Math.random() * getWorkoutsOfDay.workoutsOfDay.length);
  const randomWorkout =
    getWorkoutsOfDay.workoutsOfDay &&
    getWorkoutsOfDay.workoutsOfDay[randomIndex];

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <>
      <Container>
        <h1 className="text-center">Welcome back, {user && user.name}</h1>
      </Container>
      {loading && <Loader></Loader>}
      {error && <Message variant="danger">{error}</Message>}
      <Row>
        <Col md={6}>
          <Card className="my-2">
            <Card.Body>
              <Card.Title>Your Height</Card.Title>
              <Card.Subtitle>
                <h1>{user && user.height}"</h1>
              </Card.Subtitle>
              {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="my-2">
            <Card.Body>
              <Card.Title>Your Weight</Card.Title>
              <Card.Subtitle>
                <h1>{user && user.weight} lbs</h1>
              </Card.Subtitle>
              {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mt-2 mb-5">
            <Card.Body>
              <Card.Title className="text-center">
                Workout of the day
              </Card.Title>
              <Card.Subtitle>
                {getWorkoutsOfDay.workoutsOfDay && (
                  <h1 className="text-center">{randomWorkout.name}</h1>
                )}
              </Card.Subtitle>
              <Card.Text className="text-center">
                {getWorkoutsOfDay.workoutsOfDay && (
                  <p className="text-center">{randomWorkout.instructions}</p>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-3">Get your collection started!</h2>
          <Form onSubmit={workoutSubmitHandler}>
            <Row className="mb-3">
              <Col xs={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter workout"
                  value={aWorkout}
                  onChange={(e) => setAWorkout(e.target.value)}
                />
              </Col>
              {/* <Form.Control
                  type="text"
                  placeholder="Enter day of week"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                /> */}

              {daysOfWeek.map((day) => (
                <Form.Check
                  className="ms-2 mt-1"
                  key={day}
                  type="radio"
                  label={day}
                  name="day"
                  value={day}
                  checked={selectedDay === day}
                  onChange={handleDayChange}
                />
              ))}
            </Row>
            <Row>
              <Col className="mb-2">
                <Button type="submit">Add Workout</Button>
              </Col>
              {loadingAddUserWorkouts && <Loader></Loader>}
              {errorAddUserWorkouts && (
                <Message variant="danger">{errorAddUserWorkouts}</Message>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <h2 className="text-center mt-4">Your Collection</h2>
        {loadingWorkouts && <Loader></Loader>}
        {errorWorkouts && <Message variant="danger">{errorWorkouts}</Message>}
        {/* {workouts &&
          workouts.workouts &&
          workouts.workouts
            .sort((a, b) => {
              // Convert the day strings to corresponding numbers for sorting
              const daysOfWeek = [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ];
              const dayA = daysOfWeek.indexOf(a.day.toLowerCase());
              const dayB = daysOfWeek.indexOf(b.day.toLowerCase());
              return dayA - dayB;
            })
            .map((workout) => (
              <Col md={3}>
                <Card className="mt-2" id={workout._id}>
                  <Link
                    to={`/users/workout/${workout._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Body>
                      <Card.Title>
                        <h2>
                          {workout.name.charAt(0).toUpperCase() +
                            workout.name.slice(1)}
                        </h2>
                      </Card.Title>
                      <Card.Subtitle>
                        <h6>
                          <i class="fa-solid fa-calendar-days"></i>{" "}
                          {workout.day.charAt(0).toUpperCase() +
                            workout.day.slice(1)}
                        </h6>
                      </Card.Subtitle>
                      <Card.Text>
                        Click to view or customize your workout
                      </Card.Text>
                    </Card.Body>
                  </Link>
                  <Button onClick={() => deleteWorkoutHandler(workout._id)}>
                    <i class="fa-solid fa-trash"></i> Delete
                  </Button>
                </Card>
              </Col>
            ))} */}

        {workouts && workouts.workouts && (
          <>
            {daysOfWeek.map((day) => {
              const filteredWorkouts = workouts.workouts.filter(
                (workout) => workout.day.toLowerCase() === day.toLowerCase()
              );

              return (
                <Row key={day}>
                  {filteredWorkouts.length > 0 && (
                    <h2 className="text-dark mt-2">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </h2>
                  )}
                  {filteredWorkouts.map((workout) => (
                    <Col md={4} key={workout._id}>
                      <Card className="mt-2" id={workout._id}>
                        <Link
                          to={`/users/workout/${workout._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Card.Body>
                            <Card.Title>
                              <h2>
                                {workout.name.charAt(0).toUpperCase() +
                                  workout.name.slice(1)}
                              </h2>
                            </Card.Title>
                            <Card.Subtitle>
                              <h6>
                                <i className="fa-solid fa-calendar-days"></i>{" "}
                                {workout.day.charAt(0).toUpperCase() +
                                  workout.day.slice(1)}
                              </h6>
                            </Card.Subtitle>
                            <Card.Text>
                              Click to view or customize your workout
                            </Card.Text>
                          </Card.Body>
                        </Link>
                        <Button
                          onClick={() => deleteWorkoutHandler(workout._id)}
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              );
            })}
          </>
        )}
      </Row>
    </>
  );
};

export default MainScreen;

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import hero_image from "../assets/hero_image.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);

  const handleCloseCustomizationModal = () => setShowCustomizationModal(false);
  const handleShowCustomizationModal = () => setShowCustomizationModal(true);

  const handleCloseReminderModal = () => setShowReminderModal(false);
  const handleShowReminderModal = () => setShowReminderModal(true);

  const handleCloseCollaborationModal = () => setShowCollaborationModal(false);
  const handleShowCollaborationModal = () => setShowCollaborationModal(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/users/main");
    }
  }, [navigate, userInfo]);

  return (
    <>
      <div className="hero pb-5">
        <div className="left-h">
          <div className="mt-5 the-best-ad">
            <div></div>
            <span>The best fitness app on the market</span>
          </div>
          <div className="hero-text">
            <div>
              <span className="stroke-text">Shape </span>
              <span>Your</span>
            </div>
            <div>
              <span>Ideal Body</span>
            </div>
            <div>
              <span>
                Our fitness app enables social collaboration on workouts and
                empowers users to customize their routines to unprecedented
                levels.
              </span>
            </div>
          </div>
          <div className="get-started-buttons">
            <Link to={"/users/login"}>
              <button type="button" className="me-1 btn btn-primary">
                Log In
              </button>
            </Link>

            <Link to={"/users/register"}>
              <button type="button" className="btn btn-secondary">
                Join Up
              </button>
            </Link>
          </div>
        </div>
        <div className="right-h">
          <img src={hero_image} alt="hero" className="hero-image"></img>
        </div>
      </div>
      <Row className="pt-5">
        <div className="programs-header">
          <span>
            What we <span className="stroke-text">offer</span>
          </span>
        </div>
        <Col sm={12} xl={4}>
          <Card className="my-2">
            <Card.Body>
              <h5 className="card-title">Workout Customization</h5>
              <p className="card-text">
                customize your workouts like never before with our extremely
                easy to use interface.
              </p>
              <button
                onClick={handleShowCustomizationModal}
                type="button"
                className="btn btn-info"
              >
                Info
              </button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} xl={4}>
          <Card className="my-2">
            <Card.Body>
              <h5 className="card-title">Reminders</h5>
              <p className="card-text">
                Never ever ever miss a workout and continue to stay motivated by
                using our app today.
              </p>
              <button
                onClick={handleShowReminderModal}
                type="button"
                className="btn btn-info"
              >
                Info
              </button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} xl={4}>
          <Card className="my-2">
            <Card.Body>
              <h5 className="card-title">Collaboration</h5>
              <p className="card-text">
                Share your workouts with your friends and see what workout they
                are completing today.
              </p>
              <button
                onClick={handleShowCollaborationModal}
                type="button"
                className="btn btn-info"
              >
                Info
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h2 className="text-center mt-5 mb-2">
        Whats the word with Lets Fit Swole?
      </h2>
      <Row className="mt-5">
        <Col md={6}>
          <figure>
            <blockquote className="blockquote">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
            </blockquote>
            <figcaption className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </figcaption>
          </figure>
        </Col>
        <Col className="text-end col-md-6 d-md-block d-none">{""}</Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-start col-md-6 d-md-block d-none">{""}</Col>
        <Col md={6}>
          <figure className="text-end">
            <blockquote className="blockquote">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
            </blockquote>
            <figcaption className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </figcaption>
          </figure>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <figure>
            <blockquote className="blockquote">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
            </blockquote>
            <figcaption className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </figcaption>
          </figure>
        </Col>
        <Col className="text-end col-md-6 d-md-block d-none">{""}</Col>
      </Row>

      {/* MODALS */}
      <Modal
        show={showCustomizationModal}
        onHide={handleCloseCustomizationModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Workout Customization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The workout app offers unparalleled customization, empowering users to
          tailor their fitness routines to their unique needs. With a focus on
          personalization, users can create workout plans that align with their
          goals, preferences, and fitness levels. From selecting specific
          exercises, sets, and reps to adjusting rest intervals, every aspect
          can be fine-tuned. The app provides a vast exercise library, allowing
          users to choose from a diverse range of movements, equipment, and
          difficulty levels. Progress tracking is integrated, enabling users to
          monitor their performance and make informed adjustments. With this
          level of customization, users can truly optimize their fitness
          experience.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCustomizationModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showReminderModal} onHide={handleCloseReminderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reminders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          With a strong emphasis on adherence and consistency, the workout app
          incorporates reminders to help users stay on track. Users can schedule
          and plan their workouts, receiving timely prompts to ensure they don't
          miss a session. The app sends notification alerts, keeping users
          informed about upcoming workouts or fitness milestones. Reminders can
          be customized to suit individual preferences, allowing users to set
          their preferred timing and frequency. The app goes beyond workout
          reminders by providing prompts for staying hydrated and consuming
          proper nutrition. Regular reminders to track progress serve as a
          motivator, helping users stay focused on their fitness journey.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReminderModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showCollaborationModal}
        onHide={handleCloseCollaborationModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Collaboration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The workout app embraces collaboration, fostering a sense of community
          and shared motivation. Users can connect with friends, followers, or
          fellow fitness enthusiasts through social sharing features. They can
          form or join workout groups, engaging in group sessions for enhanced
          accountability and support. The app also enables users to participate
          in fitness challenges or competitions, creating friendly rivalries and
          inspiring each other's progress. Additionally, users can share their
          customized workout plans with others, offering guidance and
          inspiration. Virtual training sessions further enhance collaboration,
          enabling users to exercise together in real-time, regardless of their
          physical location.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCollaborationModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomeScreen;

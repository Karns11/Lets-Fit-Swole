import React from "react";

const SuccessScreen = () => {
  return (
    <div
      className="card text-white bg-primary mb-3"
      style={{ maxWidth: "20rem" }}
    >
      <div className="card-header">Success!</div>
      <div className="card-body">
        <h4 className="card-title">
          You have successfully created an account!
        </h4>
        <p className="card-text">
          Venture on over to the main screen to start configuring the best
          workoutplan known to man
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;

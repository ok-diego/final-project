"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

const {
  handleUserVerification,
  handleCreateUser,
  handleAddReservation,
  handleGetReservation,
  handleGetReservations,
  handleDeleteReservation,
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))
  // GET user reservation
  .get("/user-reservation/:email", handleGetReservation)

  // GET all reservations
  // email becomes the key in req.params in handler function
  .get("/user-reservations/:email", handleGetReservations)

  // POST user verification
  // verify if user exists or create one
  // sub is auth0's id
  .post(
    "/user-verification/:auth0Sub",
    handleUserVerification
    // handleCreateUser
  )
  // POST user new reservation
  .post("/user-reservation", handleAddReservation)

  // DELETE reservation
  .delete("/user-reservation/:email/:reservationId", handleDeleteReservation)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

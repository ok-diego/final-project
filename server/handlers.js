"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
// console.log(process.env);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleCreateUser = async (req, res) => {
  // creates a new mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("simple_stay");

    // create new user
    const InsertOneUser = await db.collection("users").insertOne(req.body);
    console.log(res.locals.userData);
    //   res.send(200);
    req.body.sub = InsertOneUser.insertedId;

    // add reservations field for each new user
    await db
      .collection("users")
      .updateOne(
        { _id: InsertOneUser.insertedId },
        { $set: { reservations: [] } }
      );

    if (InsertOneUser.acknowledged) {
      res.status(201).json({ status: 201, data: req.body, message: "success" });
    } else {
      res.status(500).json({ status: 404, message: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
  }

  client.close();
  console.log("disconnected!");
};

const handleUserVerification = async (req, res, next) => {
  // Get auth0 sub from params
  const { auth0Sub } = req.params;
  const userData = req.body;

  // creates a new mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("simple_stay");

    // set a queryObj to pass into findOne
    const queryObj = { _id: auth0Sub };

    const user = await db.collection("users").findOne(queryObj);

    // if the user exists, respond status 200 and the user's data
    if (user) {
      res.status(200).json({ status: 200, data: req.body, message: "success" });
    } else {
      // if the user does not exist then create it
      // locals is an obj inside the res obj
      // next() calls the next function set in our endpoint
      // handleCreateUser in this case
      res.locals.userData = userData;
      next();
    }
  } catch (error) {
    console.log(error);
  }

  client.close();
  console.log("disconnected!");
};

// POST add reservation
const handleAddReservation = async (req, res) => {
  // get email and reservation from req.body object
  const { email, reservation } = req.body;

  // creates a new mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("simple_stay");

    // first filter for updateOne
    // using email bc is unique for each user
    // can also use the users id
    const queryObj = { email };

    // second filter for updateOne
    // $push adds a value to an array
    // it accepts the field and value to add
    // if the field doesn't exists it will create it
    const updateObj = { $push: { reservations: reservation } };

    const updateResult = await db
      .collection("users")
      // updateOne accepts 3 parameters(filters) - option not added
      // the document's field key and the key value we want to update
      .updateOne(queryObj, updateObj);

    // updateOne returns a few keys - deconstruct these two
    const { acknowledged, modifiedCount } = updateResult;
    // if acknowledged is true and modifiedCount is greatr than 0
    if (acknowledged && modifiedCount > 0) {
      res
        .status(201)
        .json({ status: 201, data: reservation, message: "reservation added" });
    } else {
      res
        .status(500)
        .json({ status: 500, message: "unable to add reservation to db" });
    }
  } catch (error) {
    console.log(error);
  }
  client.close();
  console.log("disconnected!");
};

// GET user reservation
const handleGetReservation = async (req, res) => {
  // create a new Mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to db
    const db = client.db("simple_stay");

    const { email, reservation } = req.body;

    const queryObj = { email };

    const findObj = { "reservation.$": reservationId };

    const reservationId = req.params._id;
    console.log(reservationId);

    const findOneResult = await db
      .collection("users")
      .findOne(queryObj, findObj);

    if (findOneResult) {
      res.status(200).json({
        status: 200,
        data: findOneResult,
        message: "reservation found",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, data: null, message: "reservation not found" });
    }
  } catch (error) {
    console.log(error);
  }
  client.close();
  console.log("disconnected!");
};

// GET user reservation
const getUserReservations = async (req, res) => {
  // create a new Mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to db
    const db = client.db("simple_stay");

    const findAllResults = await db.collection("users").find().toArray();

    if (findAllResults.length > 0) {
      res.status(200).json({
        status: 200,
        data: findAllResults,
        message: "reservations found",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, data: null, message: "reservations not found" });
    }
  } catch (error) {
    console.log(error);
  }
  client.close();
  console.log("disconnected!");
};

// GET user reservation
const handleGetProfile = async (req, res) => {
  // create a new Mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to db
    const db = client.db("simple_stay");

    const { email } = req.params;

    const queryObj = { email };

    const findOneResult = await db.collection("users").findOne(queryObj);

    if (findOneResult) {
      res.status(200).json({
        status: 200,
        data: findOneResult,
        message: "reservation found",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, data: null, message: "reservation not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleUserVerification,
  handleCreateUser,
  handleAddReservation,
  handleGetReservation,
  getUserReservations,
};

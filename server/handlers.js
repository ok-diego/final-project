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

// POST reservations
const handleAddReservation = async (req, res) => {
  // get email and reservation from req.body
  const { email, reservation } = req.body;

  // creates a new mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("simple_stay");

    const queryObj = { email };

    const updateObj = { $push: { reservations: reservation } };

    const updateResult = await db
      .collection("users")
      .updateOne(queryObj, updateObj);

    // updateOne returns a few keys - deconstruct these two
    const { acknowledged, modifiedCount } = updateResult;
    // if acknowledged is true and modoCount is greatr than 0
    if (acknowledged && modifiedCount > 0) {
      res
        .status(201)
        .json({ status: 201, data: null, message: "reservation added" });
    } else {
      res
        .status(500)
        .json({ status: 500, message: "unable to add reservation to db" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleUserVerification,
  handleCreateUser,
  handleAddReservation,
};

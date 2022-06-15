"use strict";

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
// console.log(process.env);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const handleCreateUser = async (req, res) => {
//   // creates a new mongodb client
//   const client = new MongoClient(MONGO_URI, options);

//   try {
//     // connect to the client
//     await client.connect();

//     // connect to the database
//     const db = client.db("simple_stay");

//     // create new user
//     const InsertOneUser = await db.collection("users").insertOne(req.body);
//     console.log(res.locals.userData);
//     //   res.send(200);
//     req.body.sub = InsertOneUser.insertedId;

//     // add reservations field for each new user
//     await db
//       .collection("users")
//       .updateOne(
//         { _id: InsertOneUser.insertedId },
//         { $set: { reservations: [] } }
//       );

//     if (InsertOneUser.acknowledged) {
//       res.status(201).json({ status: 201, data: req.body, message: "success" });
//     } else {
//       res.status(500).json({ status: 404, message: "something went wrong" });
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   client.close();
//   console.log("disconnected!");
// };

// const handleUserVerification = async (req, res, next) => {
//   // Get auth0 sub from params
//   const { auth0Sub } = req.params;
//   const userData = req.body;

//   // creates a new mongodb client
//   const client = new MongoClient(MONGO_URI, options);

//   try {
//     // connect to the client
//     await client.connect();

//     // connect to the database
//     const db = client.db("simple_stay");

//     // set a queryObj to pass into findOne
//     const queryObj = { _id: auth0Sub };

//     const user = await db.collection("users").findOne(queryObj);

//     // if the user exists, respond status 200 and the user's data
//     if (user) {
//       res.status(200).json({ status: 200, data: req.body, message: "success" });
//     } else {
//       // if the user does not exist then create it
//       // locals is an obj inside the res obj
//       // next() calls the next function set in our endpoint
//       // handleCreateUser in this case
//       res.locals.userData = userData;
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   client.close();
//   console.log("disconnected!");
// };

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

    // const findObj = { "reservation.$": reservationId };

    // const reservationId = req.params._id;
    // console.log(reservationId);

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
  client.close();
  console.log("disconnected!");
};

// GET user reservation
const handleGetReservations = async (req, res) => {
  // create a new Mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to db
    const db = client.db("simple_stay");

    // the key email needs to match the key we want in the db
    // req.params.email where email needs to match what we wrote in the endpoint in index
    const query = { email: req.params.email };
    console.log(query);

    const findAllResults = await db.collection("users").findOne(query);

    // pass findAllResults with the reservations property
    if (findAllResults) {
      res.status(200).json({
        status: 200,
        data: findAllResults.reservations,
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

// DELETE reservation
const handleDeleteReservation = async (req, res) => {
  // creates a new mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    console.log("connected!");

    // connect to the database
    const db = client.db("simple_stay");

    // to get id from request body (FE)
    // set a variable with the body's id key
    // const id = req.body._id;
    // console.log(id);

    // other ways to use deleteOne are params and query
    // to get id from url
    const id = req.params.reservationId;

    // delete one reservation
    const deleteReservation = await db
      .collection("users")
      .deleteOne({ reservations: id });

    // this check may not work because deleteOne doesn't return anything
    if (deleteReservation) {
      res
        .status(204)
        .json({ status: "success", message: "reservation deleted" });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
  }

  client.close();
  console.log("disconnected!");
};

// REMOVE reservation
const handleRemoveReservation = async (req, res) => {
  // creates a new mongodb client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    console.log("connected!");

    // connect to the database
    const db = client.db("simple_stay");

    // to get id from request body (FE)
    // set a variable with the body's id key
    // const id = req.body._id;
    // console.log(id);

    // search query finds the user id
    // and access the resersvations and reservation Id in the array
    // const query = {
    //   email: req.params.email,
    //   // "reservations.reservationId": req.params.reservationId,
    // };

    const query = {
      email: req.params.email,
    };

    // update query
    const updateQuery = {
      $pull: {
        reservations: {
          reservationId: req.params.reservationId,
        },
      },
    };
    // delete one reservation
    const deleteReservation = await db
      .collection("users")
      .updateOne(query, updateQuery);
    console.log(deleteReservation);

    // this check may not work because deleteOne doesn't return anything
    if (deleteReservation) {
      res
        .status(204)
        .json({ status: "success", message: "reservation deleted" });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "something went wrong" });
    }
  } catch (error) {
    console.log(error);
  }

  client.close();
  console.log("disconnected!");
};

module.exports = {
  // handleUserVerification,
  // handleCreateUser,
  handleAddReservation,
  handleGetReservation,
  handleGetReservations,
  handleDeleteReservation,
  handleRemoveReservation,
};

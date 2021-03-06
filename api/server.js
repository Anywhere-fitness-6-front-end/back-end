const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/users-router')
const classesRouter = require('./classes/classes-router')
const { restricted } = require('./secure')
const enrollRouter = require('./classes/enroll-router')


// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

let logItAll = false;

server.use((res, req, next) => {
  if (logItAll)
    console.log({
      path: res.path,
      body: res.body
    });
  next();
})

server.use('/users', usersRouter);
server.use('/classes', restricted, classesRouter);
server.use('/enroll', restricted, enrollRouter);

server.post('/logoverride', (req, res) => {
  console.log(req.body, process.env.override);

  if (req.body.what === process.env.override) {
    logItAll = !logItAll;
    res.send(logItAll);
  }
})


server.get('/test', restricted, (req, res) => {
  res.status(200).json({ message: "what's up" });
})

server.use((err, req, res, next) => {
  if (err) {
    console.log(err);

    if (err instanceof Array && err.length === 2) {
      res.status(err[0]).json({ message: err[1] });
    }
    else if (err instanceof Array && err.length === 3) {
      res.status(err[0]).json({ message: err[1], data: err[2] });
    }
    else {
      res.status(err.status || 500).json(err);
    }
  }
  else {
    res.status(500).json({ message: "an error occured" });
  }
})

module.exports = server

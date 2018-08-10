const axios = require('axios')
const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtKey = require('../_secrets/keys').jwtKey

const { authenticate } = require('./middlewares')

//* Generate token
function generateToken ({ id }) {
  const payload = {
    jwtid: id
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, jwtKey, options)
}

module.exports = server => {
  server.post('/api/register', register)
  server.post('/api/login', login)
  server.get('/api/jokes', authenticate, getJokes)
}

function register (req, res) {
  // implement user registration
  let user = req.body
  const username = user.username.toLowerCase()
  //* Hash password
  const hash = bcrypt.hashSync(user.password, 14)
  user.username = username
  user.password = hash

  console.log('USER', user)

  db('users')
    .insert(user)
    .then(ids => {
      const token = generateToken(user)
      res.status(201).json({ msg: 'Registration Successful!', token, username })
    })
    .catch(err => console.log(err))

  // res.redirect(301, '/api/jokes')
}

function login (req, res) {
  // implement user login
  let { username, password } = req.body
  username = username.toLowerCase()
  db('users')
    .where({ username })
    .first()
    .then(user => {
      bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (isPasswordValid) {
            const token = generateToken(user)
            return res.status(200).json({ msg: 'login successful', token, username })
          } else {
            return res.status(401).json({ msg: 'login failed' })
          }
        })
    })
    .catch(err => console.log(err))
}

function getJokes (req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err })
    })
}

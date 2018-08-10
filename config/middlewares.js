const jwt = require('jsonwebtoken')

const jwtKey = require('../_secrets/keys').jwtKey

// quickly see what this file exports
module.exports = {
  authenticate
}

// implementation details
function authenticate (req, res, next) {
  console.log('WHAT IS REQ ', req.header, req.body)
  const token = req.get('Authorization')
  console.log('DID I GET THE TOKEN ', token)
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(422).json(err)

      req.decoded = decoded

      next()
    })
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    })
  }
}

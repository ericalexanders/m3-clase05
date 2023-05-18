var express = require('express');
const bcrypt = require("bcrypt"); 
const createUsers = require('../services/users');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  const { body } = req

  const newUser = {
    user: body.user,
    password: ""
  }

  bcrypt.hash(body.password, 10, function(err, hash) {
    newUser.password = hash
    console.log("Body: ", newUser)

    createUsers(newUser)
    res.send('respond with a resource');
  })

});

module.exports = router;

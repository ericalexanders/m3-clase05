var express = require('express');
const bcrypt = require("bcrypt"); 
const { createUsers, findUserByUsername } = require('../services/users');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  const { body } = req

  const newUser = {
    email: body.email,
    password: ""
  }

  bcrypt.hash(body.password, 10, function(err, hash) {
    newUser.password = hash
    console.log("Body: ", newUser)

    createUsers(newUser)
    res.redirect("/users/login");
  })
});

router.get("/my-profile", (req, res, next) => {
  res.render("profile", { title: 'My Profile' })
})


router.get("/login", (req, res, next) => res.render("login", { title: 'Login' }))


router.post("/login", function(req, res, next) {
  const { body } = req
  const user = findUserByUsername(body.email)
  if (!user)
    return res.status(404).send("Usuario no existe")

  const isValid = bcrypt.compareSync(body.password, user.password)

  if (isValid) 
    res.redirect('/users/my-profile')
  else
    res.status(401).send("Password no valido")
})

router.get('/logout', (req, res, next) => {
  console.log("Session ", req.session)
  req.session.destroy(function(err) {
    // cannot access session here
    res.redirect('/users/login')
  })
})

module.exports = router;

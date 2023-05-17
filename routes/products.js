const express = require('express');
const { check, body, validationResult } = require("express-validator")
const router = express.Router();

const { getAllProducts, createProducts } = require("../services/products")

/* GET products listing. */
router.get('/', function(req, res, next) {
  const allProducts = getAllProducts()
  res.send(allProducts);
});

router.post("/", [
  body("id").isNumeric(),
  body("name").isAlpha().isLength({ min: 3 }),
  body("description").isAlphanumeric().isLength({ min: 10, max: 40 })
], function(req, res, next) {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const body = req.body
  const createResponse = createProducts(body)
  
  if (createResponse) {
    return res.send({ status: 'ok', message: 'Created' })
  }
  res.send("Error")
})

module.exports = router;
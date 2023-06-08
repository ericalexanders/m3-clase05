const express = require('express');
const { check, body, validationResult } = require("express-validator")
const router = express.Router();

const { getProductController, postProductController } = require("../controllers/productController")

/* GET products listing. */
router.get('/:id?', getProductController);

router.post("/", [
  body("id").isNumeric(),
  body("name").isAlpha().isLength({ min: 3 }),
  body("description").isAlphanumeric().isLength({ min: 10, max: 40 })
], postProductController)

module.exports = router;
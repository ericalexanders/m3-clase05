const { getAllProducts, createProducts, getProductById, getProductByFirstLetter } = require("../services/products")

exports.getProductController = function(req, res, next) {
  const { id } = req.params
  const queries = req.query
  let result;

  if (queries.search) {
    result = getProductByFirstLetter(queries.search)
    return res.status(200).send(result);
  }

  if (!id) {
    result = getAllProducts()
  } else {
    result = getProductById(parseInt(id))
  }

  if (result)
    res.status(200).send(result);
  else
    next(new Error("Product not found"))
}

exports.postProductController = function(req, res, next) {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const body = req.body
  const createResponse = createProducts(body)
  
  if (createResponse) {
    return res.send({ status: 'ok', message: 'Created' })
  }

  res.status(500).send("Error")
}
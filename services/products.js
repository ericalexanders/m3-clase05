const fs = require("fs");
const path = require("path");

function getAllProducts() {
  const filePath = path.join(__dirname, "..", "db/products.json"); // Obtengo la ruta completa
  const data = fs.readFileSync(filePath, "utf8");
  const dataParseada = JSON.parse(data, null, 2);
  return dataParseada.data;
}

function getProductById(id) {
  const filePath = path.join(__dirname, "..", "db/products.json"); // Obtengo la ruta completa
  const data = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(data, null, 2); // Data parseada
  const [ product ] = products.data.filter(product => product.id === id)
  console.log("Product: ", product)
  return product ? product : null
}

function getProductByFirstLetter(letter) {
  const filePath = path.join(__dirname, "..", "db/products.json"); // Obtengo la ruta completa
  const data = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(data, null, 2); // Data parseada
  const allProducts = products.data.filter(product => product.name.charAt(0) === letter)
  return allProducts.length ? allProducts : null
}

function createProducts(products) {
  try {
    const filePath = path.join(__dirname, "..", "db/products.json"); // Obtengo la ruta completa
    const data = getAllProducts();
    data.push(products);
    fs.writeFileSync(filePath, JSON.stringify({ data }, null, 2));
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = {
  getAllProducts,
  createProducts,
  getProductById,
  getProductByFirstLetter
};
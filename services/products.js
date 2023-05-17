const fs = require("fs");
const path = require("path");

function getAllProducts() {
  const filePath = path.join(__dirname, "..", "db/products.json"); // Obtengo la ruta completa
  const data = fs.readFileSync(filePath, "utf8");
  const dataParseada = JSON.parse(data, null, 2);
  return dataParseada.data;
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
  createProducts
};
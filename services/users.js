const fs = require("fs");
const path = require("path");

function createUsers(user) {
  try {
    const filePath = path.join(__dirname, "..", "db/users.json"); // Obtengo la ruta completa
    // const data = getAllProducts();
    const data = []
    data.push(user);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = createUsers
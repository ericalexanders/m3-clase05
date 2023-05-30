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

function findUserByUsername(email) {
  try {
    const filePath = path.join(__dirname, "..", "db/users.json"); // Obtengo la ruta completa
    const data = fs.readFileSync(filePath, "utf8");
    const dataParseada = JSON.parse(data, null, 2);
    console.log("DataPArseada: ", dataParseada)
    if (dataParseada.length) {
      const savedUser = dataParseada.filter((user) => user.email === email)

      return savedUser.length ? savedUser[0] : false
    }

    return false

  } catch (error) {
    
  }
}

module.exports = { createUsers, findUserByUsername }
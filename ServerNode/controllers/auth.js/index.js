const connection = require("../../database/index");

async function isUserRegistered(userName, password) {
  const params = password ? [userName, password] : [userName];
  const passwordQuery = password ? ` AND users.password = ? ` : "";
  const query = `SELECT * FROM travels_db.users where users.userName = ? ${passwordQuery} `;
  const [rows] = await (await connection()).execute(query, params);
  return rows[0];
}

async function createUser(userValues) {
  const { userName, firstName, lastName, password, userType } = userValues;
  const values = [firstName, lastName, userName, password, userType];
  const insertQuery =
    "INSERT INTO `travels_db`.`users`( `firstName`, `lastName`, `userName`, `password`,  `userType`) VALUES ( ?,?,?,?,?);  ";
  const [rows] = await (await connection()).execute(insertQuery, values);
  console.log(rows);
  return rows.affectedRows;
}

module.exports = { isUserRegistered, createUser };

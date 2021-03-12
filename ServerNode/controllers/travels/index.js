const connection = require("../../database/index");

async function getFollowersForTravel(travel_id) {
  const query = `SELECT * FROM travels_db.followers WHERE travel_id = ${travel_id};`;
  const [rows] = await (await connection()).execute(query);
  return rows;
}

async function getTravels(id) {
  const query = ` Select  *, COUNT(travel_id) AS Followers
  FROM
      travels_db.followers
    right join travels_db.travels on  travels_db.followers.travel_id=travels.id
   group by travels.WhereTo
   order by followers.user_id=${id} desc , travels.From asc,Followers desc ;  `;
  const [rows] = await (await connection()).execute(query);
  return rows;
}

async function ChangeFollowingTravel(query) {
  const [rows] = await (await connection()).execute(query);
  return rows.affectedRows;
}

async function DeleteTravel(travel_id, tableName, ColumnName) {
  const query = ` DELETE FROM travels_db.${tableName} WHERE ${ColumnName}=${travel_id};`;
  const [rows] = await (await connection()).execute(query);
  return rows.affectedRows;
}

async function getFollowerState(user_id, travel_Id) {
  const query = `SELECT  * FROM travels_db.followers where user_id=${user_id} and travel_id=${travel_Id}`;
  const [rows] = await (await connection()).execute(query);
  return rows;
}

async function UpdateFollowersAfterDelete(travel_id, type) {
  const query = ` UPDATE travels_db.travels SET Followers =  travels.Followers ${type}1 WHERE id = ${travel_id}`;
  const [rows] = await (await connection()).execute(query);
  return rows.affectedRows;
}

async function EditTravel(obj, id) {
  console.log(obj);
  const query = `UPDATE travels_db.travels
  SET
  id = ${id},
  Description = "uu",
  WhereTo = "uu",
  Image = "uu",
  From = CAST("${obj.From} 00:00:00" AS DATETIME),
  To =  CAST("${obj.To} 00:00:00" AS DATETIME),
  Price = 12
  WHERE id = ${id};`;

  const [rows] = await (await connection()).execute(query);
  return rows.affectedRows;
}

module.exports = {
  getTravels,
  ChangeFollowingTravel,
  getFollowerState,
  UpdateFollowersAfterDelete,
  getFollowersForTravel,
  DeleteTravel,
  EditTravel,
};

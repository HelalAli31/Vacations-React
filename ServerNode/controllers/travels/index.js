const connection = require("../../database/index");
const moment = require("moment");

async function getFollowersForTravel(travel_id) {
  const query = `SELECT * FROM travels_db.followers WHERE travel_id = ${travel_id};`;
  const [rows] = await (await connection()).execute(query);
  return rows;
}

async function getTravels(id, searchInfo) {
  console.log(searchInfo);
  console.log(searchInfo.distination);

  const querySearch = `  Select  *
  FROM
     travels_db.travels
      left join travels_db.hotels on travels_db.travels.Hotel=hotels.id
      left join travels_db.destinations on travels_db.hotels.city_id=destinations.id
      left join travels_db.room_types on travels_db.hotels.room_type_id=room_types.id
      where city="${searchInfo.distination}";
  `;

  const queryMain = `SELECT * FROM travels_db.destinations;`;
  const query = searchInfo.distination != "undefined" ? querySearch : queryMain;
  console.log(query);
  const [rows] = await (await connection()).execute(query);
  return rows;
}
async function getSearchVacations(search) {
  console.log(search);
  const query = `SELECT * FROM travels_db.destinations;`;
  const [rows] = await (await connection()).execute(query);
  return rows;
}

async function getTravelsFollowingStatus(id, state) {
  const query = `   SELECT  user_id,travels.id,travels.Description,travels.WhereTo,travels.Image,travels.From,travels.To,travels.Price ,count(followers.travel_id) as Followers FROM travels_db.followers
  right join travels_db.travels on  travels_db.followers.travel_id=travels.id
   where user_id ${state}=${id}
   group by travels.id `;
  const [rows] = await (await connection()).execute(query);
  return rows;
}

async function isFollowing(id) {
  const query = `  select * from  travels_db.followers where user_id=${id} `;
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

async function EditTravel(vacationDetails, id) {
  const { Description, WhereTo, Image, From, To, Price } = vacationDetails;
  const values = [Description, WhereTo, Image, From, To, Price, id];
  const updateQuery =
    "UPDATE `travels` SET `Description` = ?, `WhereTo` = ?,`Image`=? ,`From` = ?, `To` = ?, `Price` = ? WHERE (`id` = ?);  ";
  const [rows] = await (await connection()).execute(updateQuery, values);
  return rows.affectedRows;
}

async function AddTravel(vacationDetails) {
  const { Description, WhereTo, Image, From, To, Price } = vacationDetails;
  console.log("d", Description);
  const values = [Description, WhereTo, Image, From, To, Price];
  const updateQuery =
    "INSERT INTO travels_db.travels (`Description`, `WhereTo`, `Image`, `From`, `To`, `Price`) VALUES(?,?,?,?,?,?)";
  const [rows] = await (await connection()).execute(updateQuery, values);
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
  AddTravel,
  isFollowing,
  getSearchVacations,
  getTravelsFollowingStatus,
};

const dal = require("../dal");

async function getAllUsersAsync() {
  const sql = `SELECT * FROM users`;
  const users = await dal.executeAsync(sql);
  return users;
}
async function getOneUserAsync(credentials) {
  const sql = `SELECT * FROM users WHERE userName = '${credentials.userName}' AND password = '${credentials.password}'`;
  const user = await dal.executeAsync(sql);
  // recheck if this is required:
  if (user.length === 0) {
    return 0;
  }
  return user;
}

async function addUserAsync(user) {
  const sql = `INSERT INTO users ( firstName, lastName, userName, password,role,  isAdmin) VALUES('${user.firstName}','${user.lastName}','${user.userName}','${user.password}',"user",0)`;
  const info = await dal.executeAsync(sql);
  user.id = info.insertId;
  return user;
}

async function addUserFollowAsync(user) {
  //take values and see if user is following the vacation:

  const sql = `INSERT INTO followers (userID, vacationID) VALUES (${user.userID}, ${user.vacationID})`;
  const vac = await dal.executeAsync(sql);
  return vac;
}

async function getAllFollowersAsync() {
  const sql = `SELECT * FROM followers`;
  const followers = await dal.executeAsync(sql);
  return followers;
}
async function getFollowedVacs(id) {
  const sql = `SELECT * FROM followers 
  where userID = ${id}`;
  const vacs = await dal.executeAsync(sql);
  return vacs;
}
async function getAllFollowedVacssAsync() {
  const sql = `SELECT * FROM followers WHERE vacationID > 0`;
  const followed = await dal.executeAsync(sql);
  return followed;
}
async function removeFollowedVac(id, vac) {
  const sql = `DELETE FROM followers WHERE userID = ${id} and vacationID = ${vac}`;
  // return sql;
}

module.exports = {
  getAllUsersAsync,
  getOneUserAsync,
  addUserAsync,
  addUserFollowAsync,
  getAllFollowersAsync,
  getFollowedVacs,
  getAllFollowedVacssAsync,
  removeFollowedVac
};

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
  // const checkAvailableUserName = `SELECT * from users WHERE userName = '${user.userName}'`;
  // const runCheck = await dal.executeAsync(checkAvailableUserName);
  // if (runCheck.length != 0) {
  //   return 0;
  // }
  const sql = `INSERT INTO users ( firstName, lastName, userName, password,role,  isAdmin) VALUES('${user.firstName}','${user.lastName}','${user.userName}','${user.password}',"User",0)`;
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
async function addFollowVacForUser(vacationID, userID) {
  console.log(vacationID, userID);
  const sql = `INSERT INTO followers (userID,vacationID) VALUES (${userID}, ${vacationID})`;
  const vacation = await dal.executeAsync(sql);
  return vacation;
}
async function getAllFollowedVacssAsync(id) {
  const sql = `SELECT * FROM followers WHERE userID = ${id}`;
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
  addFollowVacForUser,
  getAllFollowedVacssAsync,
  removeFollowedVac
};

const dal = require("../dal");

async function getAllVacsAsync() {
  const sql = `SELECT vacationID,description, destination, picFileName, DATE_FORMAT(startDate, "%m/%d/%Y") as startDate, DATE_FORMAT(endDate, "%m/%d/%Y") as endDate, price FROM vacations`;
  const vacs = await dal.executeAsync(sql);
  return vacs;
}
async function getOneVacAsync(id) {
  const sql = `SELECT vacationID,description, destination, picFileName, DATE_FORMAT(startDate, "%m/%d/%Y") as startDate, DATE_FORMAT(endDate, "%m/%d/%Y") as endDate, price FROM vacations WHERE vacationID = ${id}`;
  const user = await dal.executeAsync(sql);
  return user;
}
async function addVacAsync(vac) {
  const sql = `INSERT INTO vacations (description, destination, picFileName, startDate, endDate, price, followed) VALUES('${vac.description}','${vac.destination}','${vac.picFileName}','${vac.startDate}','${vac.endDate}','${vac.price}', 0)`;
  const info = await dal.executeAsync(sql);
  vac.id = info.insertId;
  return vac;
}

async function updateFullVacationAsync(vac) {
  const sql = `
      UPDATE vacations SET
      description = '${vac.description}',
      destination = '${vac.destination}',
      picFileName = '${vac.picFileName}',
      startDate = '${vac.startDate}',
      endDate = '${vac.endDate}',
      price = '${vac.price}'
      WHERE vacationID = ${vac.id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : vac;
}

async function updatePartialVacAsync(vac) {
  let sql = "UPDATE vacations SET ";
  if (vac.description) {
    sql += `description = '${vac.description}',`;
  }
  if (vac.destination) {
    sql += `destination = '${vac.destination}',`;
  }
  if (vac.picFileName) {
    sql += `picFileName = '${vac.picFileName}',`;
  }
  if (vac.startDate) {
    sql += `startDate = '${vac.startDate}',`;
  }
  if (vac.endDate) {
    sql += `endDate = '${vac.endDate}',`;
  }
  if (vac.price) {
    sql += `price = '${vac.price}',`;
  }

  sql = sql.substr(0, sql.length - 1);
  sql += ` WHERE ProductID = ${vac.id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : vac;
}
async function deleteOneVacAsync(id) {
  const sql = `DELETE FROM vacations WHERE vacationID = ${id}`;
  await dal.executeAsync(sql);
}

module.exports = {
  getAllVacsAsync,
  getOneVacAsync,
  addVacAsync,
  updateFullVacationAsync,
  updatePartialVacAsync,
  deleteOneVacAsync
};

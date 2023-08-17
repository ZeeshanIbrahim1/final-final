"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Case.belongsTo(db.Firm, { foreignKey: 'firmId', onUpdate: 'RESTRICT', onDelete: 'RESTRICT' });
db.Case.belongsTo(db.Insurance, { foreignKey: 'insuranceId', onUpdate: 'RESTRICT', onDelete: 'RESTRICT' });
db.Case.belongsTo(db.Patient, { foreignKey: 'patientId', onUpdate: 'RESTRICT', onDelete: 'RESTRICT' });
db.Case.belongsTo(db.PracticeLocation, { foreignKey: 'practiceLocationId', onUpdate: 'RESTRICT', onDelete: 'RESTRICT' });
db.Case.belongsTo(db.CaseType, { foreignKey: 'caseTypeId', onUpdate: 'RESTRICT', onDelete: 'RESTRICT' });
db.Case.belongsTo(db.Category, { foreignKey: 'categoryId', onUpdate: 'RESTRICT', onDelete: 'RESTRICT' });

db.Firm.hasMany(db.Case,{foreignKey:'id'})

db.Patient.hasMany(db.Case, { foreignKey: 'patientId' });


db.Appointment.belongsTo(db.Specialty, { foreignKey: 'specialtyId', onUpdate: 'RESTRICT', onDelete: 'RESTRICT' });
db.Appointment.belongsTo(db.Doctors, { foreignKey: 'doctorId', onUpdate: 'RESTRICT', onDelete: 'RESTRICT' });
// db.Appointment.belongsTo(db.PracticeLocation, { foreignKey: 'practiceLocationId' });
db.Appointment.belongsTo(db.Case, { foreignKey: 'caseId' , onUpdate: 'RESTRICT', onDelete: 'RESTRICT'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// try {
//   sequelize.sync({ force: true }); // Use { force: true } to drop and recreate the table
//   console.log("Database synced successfully");
// } catch (error) {
//   console.error("Error syncing the database:", error);
// }

module.exports = db;

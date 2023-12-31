"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};
 
const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
};

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

db.Case.belongsTo(db.Firm, { foreignKey: 'firmId',onUpdate: 'CASCADE'});
db.Case.belongsTo(db.Insurance, { foreignKey: 'insuranceId',onUpdate: 'CASCADE' });
db.Case.belongsTo(db.Patient, { foreignKey: 'patientId',onUpdate: 'CASCADE'});
db.Case.belongsTo(db.PracticeLocation, { foreignKey: 'practiceLocationId',onUpdate: 'CASCADE' });
db.Case.belongsTo(db.CaseType, { foreignKey: 'caseTypeId',onUpdate: 'CASCADE' });
db.Case.belongsTo(db.Category, { foreignKey: 'categoryId',onUpdate: 'CASCADE' });
db.Case.belongsTo(db.PurposeOfVisit, {foreignKey: 'purposeOfVisitId',onUpdate: 'CASCADE'})


db.Patient.hasMany(db.Case, { foreignKey: 'patientId',onUpdate: 'CASCADE' });
db.Case.hasMany(db.Appointment,{foreignKey: 'caseId',onUpdate: 'CASCADE'});

db.Appointment.belongsTo(db.AppointmentType,{foreignKey: 'appointmentTypeId',onUpdate: 'CASCADE'})
db.Appointment.belongsTo(db.Specialty, { foreignKey: 'specialtyId',onUpdate: 'CASCADE' });
db.Appointment.belongsTo(db.Doctors, { foreignKey: 'doctorId',onUpdate: 'CASCADE' });
db.Appointment.belongsTo(db.Case, { foreignKey: 'caseId',onUpdate: 'CASCADE'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// try {
//   sequelize.sync({ force: true }); // Use { force: true } to drop and recreate the table
//   console.log("Database synced successfully");
// } catch (error) {
//   console.error("Error syncing the database:", error);
// }

module.exports = db;
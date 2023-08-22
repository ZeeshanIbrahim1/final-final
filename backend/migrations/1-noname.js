'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "AppointmentType", deps: []
 * createTable "CaseTypes", deps: []
 * createTable "Categories", deps: []
 * createTable "Doctors", deps: []
 * createTable "Firms", deps: []
 * createTable "Insurances", deps: []
 * createTable "Patients", deps: []
 * createTable "PracticeLocations", deps: []
 * createTable "PurposeOfVisits", deps: []
 * createTable "Specialties", deps: []
 * createTable "Users", deps: []
 * createTable "Cases", deps: [Firms, Insurances, Patients, PracticeLocations, CaseTypes, Categories, PurposeOfVisits]
 * createTable "Appointments", deps: [AppointmentType, Specialties, Doctors, Cases]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-08-22T10:42:41.225Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "AppointmentType",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "appointmentType": {
                    "type": Sequelize.STRING,
                    "field": "appointmentType"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "CaseTypes",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "Name": {
                    "type": Sequelize.STRING,
                    "field": "Name"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "categoryName": {
                    "type": Sequelize.STRING,
                    "field": "categoryName"
                },
                "categoryType": {
                    "type": Sequelize.STRING,
                    "field": "categoryType"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Doctors",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name"
                },
                "middle_name": {
                    "type": Sequelize.STRING,
                    "field": "middle_name"
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Firms",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "firmName": {
                    "type": Sequelize.STRING,
                    "field": "firmName"
                },
                "firmCity": {
                    "type": Sequelize.STRING,
                    "field": "firmCity"
                },
                "firmState": {
                    "type": Sequelize.STRING,
                    "field": "firmState"
                },
                "firmZip": {
                    "type": Sequelize.STRING,
                    "field": "firmZip"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Insurances",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "insuranceName": {
                    "type": Sequelize.STRING,
                    "field": "insuranceName"
                },
                "insuranceCity": {
                    "type": Sequelize.STRING,
                    "field": "insuranceCity"
                },
                "insuranceState": {
                    "type": Sequelize.STRING,
                    "field": "insuranceState"
                },
                "insuranceZip": {
                    "type": Sequelize.STRING,
                    "field": "insuranceZip"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Patients",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name"
                },
                "middle_name": {
                    "type": Sequelize.STRING,
                    "field": "middle_name"
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "gender": {
                    "type": Sequelize.STRING,
                    "field": "gender"
                },
                "date_of_birth": {
                    "type": Sequelize.STRING,
                    "field": "date_of_birth"
                },
                "ssn": {
                    "type": Sequelize.STRING,
                    "field": "ssn"
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address"
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city"
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state"
                },
                "zip": {
                    "type": Sequelize.STRING,
                    "field": "zip"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "PracticeLocations",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city"
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state"
                },
                "zip": {
                    "type": Sequelize.STRING,
                    "field": "zip"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "PurposeOfVisits",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "PurposeOfVisit": {
                    "type": Sequelize.STRING,
                    "field": "PurposeOfVisit"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Specialties",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Cases",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "doa": {
                    "type": Sequelize.STRING,
                    "field": "doa"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted"
                },
                "firmId": {
                    "type": Sequelize.INTEGER,
                    "field": "firmId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Firms",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "insuranceId": {
                    "type": Sequelize.INTEGER,
                    "field": "insuranceId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Insurances",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "patientId": {
                    "type": Sequelize.INTEGER,
                    "field": "patientId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Patients",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "practiceLocationId": {
                    "type": Sequelize.INTEGER,
                    "field": "practiceLocationId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "PracticeLocations",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "caseTypeId": {
                    "type": Sequelize.INTEGER,
                    "field": "caseTypeId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "CaseTypes",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "categoryId": {
                    "type": Sequelize.INTEGER,
                    "field": "categoryId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "purposeOfVisitId": {
                    "type": Sequelize.INTEGER,
                    "field": "purposeOfVisitId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "PurposeOfVisits",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Appointments",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "appointmentDate": {
                    "type": Sequelize.DATE,
                    "field": "appointmentDate"
                },
                "appointmentTime": {
                    "type": Sequelize.STRING,
                    "field": "appointmentTime"
                },
                "duration": {
                    "type": Sequelize.INTEGER,
                    "field": "duration"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted"
                },
                "appointmentTypeId": {
                    "type": Sequelize.INTEGER,
                    "field": "appointmentTypeId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "AppointmentType",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "specialtyId": {
                    "type": Sequelize.INTEGER,
                    "field": "specialtyId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Specialties",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "doctorId": {
                    "type": Sequelize.INTEGER,
                    "field": "doctorId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Doctors",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "caseId": {
                    "type": Sequelize.INTEGER,
                    "field": "caseId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Cases",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

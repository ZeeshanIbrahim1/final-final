'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "deleted" from table "AppointmentType"
 * removeColumn "deleted" from table "PurposeOfVisits"
 * changeColumn "deleted" on table "Appointments"
 * changeColumn "caseId" on table "Appointments"
 * changeColumn "deleted" on table "Cases"
 * changeColumn "patientId" on table "Cases"
 * changeColumn "deleted" on table "Patients"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-08-29T07:29:19.222Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["AppointmentType", "deleted"]
    },
    {
        fn: "removeColumn",
        params: ["PurposeOfVisits", "deleted"]
    },
    {
        fn: "changeColumn",
        params: [
            "Appointments",
            "deleted",
            {
                "type": Sequelize.DATE,
                "field": "deleted"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Appointments",
            "caseId",
            {
                "type": Sequelize.INTEGER,
                "field": "caseId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Cases",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Cases",
            "deleted",
            {
                "type": Sequelize.DATE,
                "field": "deleted"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Cases",
            "patientId",
            {
                "type": Sequelize.INTEGER,
                "field": "patientId",
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Patients",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Patients",
            "deleted",
            {
                "type": Sequelize.DATE,
                "field": "deleted"
            }
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

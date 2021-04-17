var express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
var router = express.Router();

let CreateProzess = require("../database/controller/all_models").createProzess


router.get('/', function (req, res, next) {
    console.log("get");
    CreateProzess.findAll().then(allProzess => {
        res.json({err: false, data: allProzess});
        console.log(allProzess)
    }).catch(err => {
        console.error('Unable to Select the Prozesse', err);
    });
});


router.post('/', function (req, res, next) {
    console.log("post")

    console.log(req.body)


    var prozess = req.body.prozess || '';
    var id = req.body.id || '';

    // Neue Daten hinzufügen. Zuerst Model Instanz bauen
    var newProzess = CreateProzess.build({
        id : id,
        prozess: prozess,
    });
    // Erst mit save() wird die Datenbank Tabelle mit den neuen Daten aktualisiert. 
    newProzess.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Neu angelegt"});
});

router.delete('/:IDLog', function (req, res, next) {
    var idLog = req.params.IDLog || '';
    console.log("delete")
    console.log(req.params);
    // Log mit ID xy aus der Datenbank entfernen. 
    CreateProzess.destroy({where: {ID: idLog}});
    res.json({info: idLog.concat(" deleted")});
});

module.exports = router;
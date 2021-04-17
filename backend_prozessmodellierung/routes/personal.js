var express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
var router = express.Router();

let Personal = require("../database/controller/all_models").personal


router.get('/', function (req, res, next) {
    console.log("req:");
    console.log(req.query);
    var vorname = req.query.vorname || '';
    var nachname = req.query.nachname || '';
    console.log("get personal");
    const personal = Personal.findOne({ where: { vorname: vorname,
    nachname : nachname } }).then(personal => {
        res.json({err: false, data: personal});
        console.log(personal)
    }).catch(err => {
        console.error('Unable to Select the Prozesse', err);
    });;
    
});


router.post('/', function (req, res, next) {
    console.log("post")

    console.log(req.body)


    var prozess = req.body.prozess || '';
    var id = req.body.id || '';

    // Neue Daten hinzufügen. Zuerst Model Instanz bauen
    var newProzess = Prozess.build({
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
    personal_logs.destroy({where: {ID: idLog}});
    res.json({info: idLog.concat(" deleted")});
});

module.exports = router;
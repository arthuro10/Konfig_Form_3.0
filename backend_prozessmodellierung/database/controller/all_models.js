const seqInst = require("../db").sequelizeInstance
const seq = require("../db").sequelize
//let User = require("../models/user");
let Prozess = require("../models/prozesse");
let createProzess = require("../models/createProzesse");
let Personal = require("../models/personal");


module.exports = {
    //user: User(seqInst, seq),
    prozess: Prozess(seqInst, seq),
    createProzess: createProzess(seqInst, seq),
    personal: Personal(seqInst, seq),
};
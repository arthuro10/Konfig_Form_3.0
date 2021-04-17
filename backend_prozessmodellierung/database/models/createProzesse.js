module.exports = function (sequelize, DataTypes) {
    const createProzess = sequelize.define('Create_Prozesse', {
        id: { type : DataTypes.UUID, defaultValue: DataTypes.UUIDV1,  allowNull: false, primaryKey: true },
        prozess_json: { type: DataTypes.JSON, allowNull: true },

    }, {
        //options
        timestamps: false
    });

    createProzess.sync().then(function() {
        console.log('Create_Prozess Table created');
    }, function(err) {
        console.error('error occurred while creating table : ' + err.stack);
    });

    return createProzess;
};
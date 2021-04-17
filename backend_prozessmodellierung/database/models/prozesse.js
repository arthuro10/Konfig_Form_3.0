module.exports = function (sequelize, DataTypes) {
    const Prozess = sequelize.define('Prozess', {
        id: { type : DataTypes.UUID, defaultValue: DataTypes.UUIDV1,  allowNull: false, primaryKey: true },
        prozess: { type: DataTypes.JSON, allowNull: true },

    }, {
        //options
        timestamps: false
    });

    Prozess.sync().then(function() {
        console.log('Prozess Table created');
    }, function(err) {
        console.error('error occurred while creating table : ' + err.stack);
    });

    return Prozess;
};
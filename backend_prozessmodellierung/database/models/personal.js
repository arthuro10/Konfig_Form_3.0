module.exports = function (sequelize, DataTypes) {
    const Personal = sequelize.define('Personal', {
        id: { type : DataTypes.UUID, defaultValue: DataTypes.UUIDV1,  allowNull: false, primaryKey: true },
        vorname: { type: DataTypes.STRING, allowNull: true },
        nachname: { type: DataTypes.STRING, allowNull: true },
        adresse: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        beruf: { type: DataTypes.STRING, allowNull: true },

    }, {
        //options
        timestamps: false
    });

    Personal.sync().then(function() {
        console.log('Personal Table created');
    }, function(err) {
        console.error('error occurred while creating table : ' + err.stack);
    });

    return Personal;
};
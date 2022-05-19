module.exports = (sequelize, dataTypes) => {

    let alias = "Types"
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoincrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: "types_table",
        timestamps: false
    }

    const Type = sequelize.define(alias, cols, config)

    Type.associate = function (models){
        Type.hasMany(models.Transactions, {
            as: "transactions",
            foreignKey: "id_type"
        })
    }

    return Type
}
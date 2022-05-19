module.exports = (sequelize, dataTypes) => {

    let alias = "Users"
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoincrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        }

    }

    let config = {
        tableName: "users_table",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = function (models) {
        User.hasMany(models.Transactions, {
            as: "transactions",
            foreignKey: "id_user"
        })
    }

    return User
}
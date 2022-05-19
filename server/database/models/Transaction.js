module.exports = (sequelize, dataTypes) => {

    let alias = "Transactions"

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoincrement: true
        },
        id_type: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        day: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        month: {
            type: dataTypes.STRING,
            allowNull: false
        },
        year: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_user: {
            type: dataTypes.INTEGER.UNSIGNED,
            defaultValue: null
        }
    }

    let config = {
        tableName: "transactions_table",
        timestamps: false
    }

    const Transaction = sequelize.define(alias, cols, config)

    Transaction.associate = function (models) {
        Transaction.belongsTo(models.Types, {
            as: "type",
            foreignKey: "id_type"

        })

        Transaction.belongsTo(models.Users, {
            as: "user",
            foreignKey: "id_user"

        })
    }





    return Transaction
}

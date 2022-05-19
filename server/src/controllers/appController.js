const db = require('../../database/models')
const sequelize = db.Sequelize
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const appController = {

    show: async (req, res) => {

        try {
            let transactions = await db.Transactions.findAll(
                {
                    order: [['id', 'DESC']],
                    include: [{ association: "type" }, { association: "user" }]
                })

            let types = await db.Types.findAll()

            let users = await db.Users.findAll()

            res.status(200).json({
                message: 'Data de la base de datos',
                transactions, types, users
            })

        }
        catch (err) {
            res.status(500).json(err)
        }

    },


    storeUser: async (req, res) => {

        try {

            let errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json(errors.mapped())
            }

            let bodyEmail = req.body.email;
            let userFound = await db.Users.findOne({
                where: {
                    email: bodyEmail
                }
            })


            if (userFound) {
                errors = { errors: { email: { msg: 'Debes ingresar un mail que no se encuentre registrado' } } }
                return res.json(errors);

            }

            await db.Users.create({
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            })

            res.status(201).json({
                message: 'Usuario creado correctamente',
            })

        }
        catch (err) {
            res.status(500).json(err)
        }

    },

    userLoggin: async (req, res) => {

        try {

            let errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json(errors.mapped())
            }


            let bodyEmail = req.body.email;
            let userFound = await db.Users.findOne({
                where: {
                    email: bodyEmail
                }
            })

            if (!userFound) {
                errors = { errors: { email: { msg: 'Debes ingresar un mail que ya se encuentre registrado' } } }
                return res.json(errors);
            }
            else if (!bcrypt.compareSync(req.body.password, userFound.password)) {
                errors = { errors: { email: { msg: 'La contraseña debe ser la misma que creaste al momento del registro de tu cuenta' } } }
                return res.json(errors);
            }

            else if (userFound) {

                req.session.userFound = userFound
                res.status(201).json({
                    data: userFound,
                    message: 'Usuario logueado correctamente',
                })
            }


        }
        catch (err) {
            res.status(500).json(err)
        }

    },

    storeTransaction: async (req, res) => {

        try {

            let errors = validationResult(req)

            let user = req.session.userFound


            if (errors.isEmpty()) {

                let transaction = await db.Transactions.create({
                    id_type: req.body.id_type,
                    description: req.body.description,
                    amount: req.body.amount,
                    day: req.body.day,
                    month: req.body.month,
                    year: req.body.year,
                    id_user: user ? user.id : req.body.id_user
                })

                res.status(200).json({

                    data: user, transaction,
                    message: 'Transacción creada correctamente',
                })
            }


            else {
                res.json({
                    errors: errors.mapped()
                })
            }


        }
        catch (err) {
            res.status(500).json(err)
        }

    },

    updateTransaction: async (req, res) => {

        try {

            let errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.mapped())
            }

             await db.Transactions.update({
                description: req.body.description,
                amount: req.body.amount,
                day: req.body.day,
                month: req.body.month,
                year: req.body.year,
            },
                {
                    where: {
                        id: req.params.id

                    }
                })

            res.status(201).json({
                message: 'Transacción editada correctamente',
            })

        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    deleteTransaction: async (req, res) => {

        try {

            await db.Transactions.destroy({
                where: {
                    id: req.params.id
                }
            })

            res.status(201).json({
                message: 'Transacción eliminada correctamente',
            })
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = appController
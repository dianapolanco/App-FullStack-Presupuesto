const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const appController = require('../controllers/appController')





/* Express Validator**/

 const transactionsValidations = [
     check('id_type').notEmpty().withMessage('Este campo no puede estar vacío'),
     check('description').notEmpty().withMessage('Este campo no puede estar vacío').bail().isLength({min:4, max: 100}).withMessage('Debe contener mínimo 4 y máximo 100 caracteres'),
     check('amount').notEmpty().withMessage('Este campo no puede estar vacío').bail().isInt({min: 1}).withMessage('El valor debe ser un número positivo'),
     check('day').notEmpty().withMessage('Este campo no puede estar vacío'),
     check('month').notEmpty().withMessage('Este campo no puede estar vacío'),
     check('year').notEmpty().withMessage('Este campo no puede estar vacío')
 ]

const registerValidations = [
    check('name').notEmpty().withMessage('Este campo no puede estar vacío').bail().isLength({min:3, max: 20}).withMessage('Debe contener mínimo 3 y máximo 20 caracteres'),
    check('last_name').notEmpty().withMessage('Este campo no puede estar vacío').bail().isLength({min:3, max: 20}).withMessage('Debe contener mínimo 3 y máximo 20 caracteres'),
    check('email').notEmpty().withMessage('Este campo no puede estar vacío').bail().isEmail().withMessage('Debes ingresar un email válido'),
    check('password').notEmpty().withMessage('Este campo no puede estar vacío').bail().isLength({min: 5, max: 15}).withMessage('Debe contener mínimo 3 y máximo 20 caracteres').bail().custom(value => {
        if(value.includes(' ')){
            throw new Error('No puede contener espacios')
        }

        return true
    })
]

const logginValidations = [
    check('email').notEmpty().withMessage('Este campo no puede estar vacío'),
    check('password').notEmpty().withMessage('Este campo no puede estar vacío')

]

/* Routes */
router.get('/', appController.show);
router.post('/',  transactionsValidations, appController.storeTransaction);
router.put('/:id',  transactionsValidations, appController.updateTransaction);
router.delete('/:id/', appController. deleteTransaction);
router.post('/users', registerValidations, appController.storeUser);
router.post('/users-log', logginValidations, appController.userLoggin);



module.exports = router;

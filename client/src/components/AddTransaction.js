import React from 'react';
import { useForm } from 'react-hook-form'



function AddTransaction({ addTransaction, errorsBack, userStoraged }) {


    let days = [<option value=" " key="0"> </option>]

    for (let i = 1; i <= 31; i++) {
        days.push(<option value={i} key={i}>{i}</option>)

    }

    let months = [<option value=" " key="0"> </option>]

    for (let i = 1; i <= 12; i++) {
        months.push(<option value={i} key={i}>{i}</option>)

    }

    let years = [<option value=" " key="0"> </option>]

    for (let i = 2021; i <= 2040; i++) {
        years.push(<option value={i} key={i}>{i}</option>)

    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onSubmit'
    })

    const onSubmit = (data, e) => {

        let finalData = {
            ...data,
            id_user: userStoraged.id
        }

        addTransaction(finalData)

        console.log(e)
    }


    return (

        <div className="container-transaction-form">
            <h3><b>Registra una transacción</b></h3>
            <form className= "transaction-user-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="description">Concepto</label>
                    <input type="text" name="description" id="description" {...register('description',
                        {
                            required: 'Este campo no puede estar vacío',
                            minLength: {
                                value: 4,
                                message: 'Debe contener mínimo 4 y máximo 100 caracteres'
                            },
                            maxLength: {
                                value: 100,
                                message: 'Debe contener máximo 100 caracteres'
                            }
                        }
                    )} />
                    <p className="errors-form">{errors?.description && errors.description.message}</p>
                    <p className="errors-form">{errorsBack?.description && errorsBack.description.msg}</p>
                </div>
                <div>
                    <label htmlFor="amount">Monto</label>
                    <input type="text" name="amount" id="amount" {...register("amount",
                        {
                            required: 'Este campo no puede estar vacío',
                            pattern: {
                                value: /^[1-9]\d*$/,
                                message: 'El valor debe ser un número positivo'
                            }
                        }
                    )} />
                    <p className="errors-form">{errors?.amount && errors.amount.message}</p>
                    <p className="errors-form">{errorsBack?.amount && errorsBack.amount.msg}</p>
                </div>
                <div className="date-selector"><p>Fecha </p>
                    <label htmlFor="day">Día</label>
                    <select name="day" id="day" {...register("day", { pattern: { value: /^[1-9]\d*$/ } })}>
                        {days}
                    </select>
                    <label htmlFor="month">Mes</label>
                    <select name="month" id="month" {...register("month", { pattern: { value: /^[1-9]\d*$/ } })}>
                        {months}
                    </select>
                    <label htmlFor="year">Año</label>
                    <select name="year" id="year" {...register("year", { pattern: { value: /^[1-9]\d*$/ } })}>
                        {years}
                    </select>
                    {(errors.day || errors.month || errors.year) && <p className="errors-form">Este campo no puede estar vacío</p>}
                    {(errorsBack.day || errorsBack.month || errorsBack.year) && <p className="errors-form">Este campo no puede estar vacío</p>}
                </div>
                <div className="type-selector"><p>Tipo </p>
                    <input type="radio" name="id_type" id="income" value="1" {...register("id_type",
                        { required: 'Este campo no puede estar vacío' })} />
                    <label htmlFor="income">Ingreso</label>

                    <input type="radio" name="id_type" id="expense" value="2" {...register("id_type",
                        { required: 'Este campo no puede estar vacío' })} />
                    <label htmlFor="expense">Egreso</label>

                    <p className="errors-form">{errors?.id_type && errors.id_type.message}</p>
                    <p className="errors-form">{errorsBack?.id_type && errorsBack.id_type.msg}</p>
                </div>
                <button className="button-form" type="submit">Crear</button>
            </form>
        </div>

    )

}

export default AddTransaction;
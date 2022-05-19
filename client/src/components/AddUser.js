import React from 'react';
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent } from '@material-ui/core';


const AddUser = React.forwardRef(({ dialogStyle, openDialogLogIn, addUser, errorsBack, submit, open, onClose }, ref) => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onSubmit'
    })


    const onSubmit = (data, e) => {
        addUser(data)
    }


    return (
        <Dialog
            open={open}
            onClose={onClose}
        >

            <DialogContent className={dialogStyle} >
                {submit === false ?
                    <div className="container-user-form">
                        <h3><b>Crea una cuenta</b></h3>
                        <form className="transaction-user-form user-form" onSubmit={handleSubmit(onSubmit)} ref={ref}>
                            <div>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" name="name" id="name" {...register('name',
                                    {
                                        required: 'Este campo no puede estar vacío',
                                        minLength: {
                                            value: 3,
                                            message: 'Debe contener mínimo 3 y máximo 20 caracteres'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Debe contener máximo 20 caracteres'
                                        }
                                    }
                                )}/>
                                <p className="errors-form">{errors?.name && errors.name.message}</p>
                                <p className="errors-form">{errorsBack?.name && errorsBack.name.msg}</p>
                            </div>
                            <div>
                                <label htmlFor="last_name">Apellido</label>
                                <input type="text" name="last_name" id="last_name" {...register('last_name',
                                    {
                                        required: 'Este campo no puede estar vacío',
                                        minLength: {
                                            value: 3,
                                            message: 'Debe contener mínimo 4 y máximo 20 caracteres'
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'Debe contener máximo 20 caracteres'
                                        }
                                    }
                                )}/>
                                <p className="errors-form">{errors?.last_name && errors.last_name.message}</p>
                                <p className="errors-form">{errorsBack?.last_name && errorsBack.last_name.msg}</p>
                            </div>
                            <div>
                                <label htmlFor="text">Email</label>
                                <input type="text" name="email" id="email" {...register('email',
                                    {
                                        required: 'Este campo no puede estar vacío',
                                        pattern: {
                                            value: /^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.[a-zA-Z]{2,3}\.*[a-zA-Z]{0,2}$/,
                                            message: 'Debes ingresar un email válido'
                                        }
                                    }

                                )}/>
                                <p className="errors-form">{errors?.email && errors.email.message}</p>
                                <p className="errors-form">{errorsBack?.email && errorsBack.email.msg}</p>
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" name="password" id="password" {...register('password',
                                    {
                                        required: 'Este campo no puede estar vacío',
                                        minLength: {
                                            value: 5,
                                            message: 'Debe contener mínimo 3 y máximo 15 caracteres'
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: 'Debe contener máximo 15 caracteres'
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9!#$%&*+-.:;<=>?]+$/,
                                            message: 'No puede contener espacios'
                                        }
                                    }
                                )}/>
                                <p className="errors-form">{errors?.password && errors.password.message}</p>
                                <p className="errors-form">{errorsBack?.password && errorsBack.password.msg}</p>

                            </div>
                            <button className="button-form" type="submit">Crear</button>

                        </form>
                        <div className="button-container">
                            <p>¿Ya tienes una cuenta creada?</p><button type="button" onClick={openDialogLogIn}> Log In</button>
                        </div>

                    </div>
                    :
                    <div className="container-user-form container-user-form-registered">
                        <h2><b>¡Tu cuenta ha sido creada!</b></h2>
                        <div className="button-container">
                            <p>Ingresa ahora</p><button className="button-form" type="button" onClick={openDialogLogIn}>Log In</button>
                        </div>
                    </div>

                }

            </DialogContent>
        </Dialog>
    )

})

export default AddUser;
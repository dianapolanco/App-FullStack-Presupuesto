import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { useForm } from 'react-hook-form'

const LogInUser = React.forwardRef(({ dialogStyle, logInUser, errorsBack, openDialogSignUp, open, onClose, submit }, ref) => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onSubmit'
    })

    const onSubmit = (data, e) => {
        logInUser(data)

    }


    return (
        <Dialog
            open={open}
            onClose={onClose}


        >
            <DialogContent className={dialogStyle} >

                <div className="container-user-form container-login-form">
                    <h3><b>Ingresa a tu cuenta</b></h3>
                    <form className="transaction-user-form user-form" onSubmit={handleSubmit(onSubmit)} ref={ref}>
                        <div>
                            <label htmlFor="emailLogIn">Email</label>
                            <input type="text" name="email" id="emailLogIn" {...register("email",
                                {
                                    required: 'Este campo no puede estar vacío'
                                }
                            )} />
                            <p className="errors-form">{errors?.email && errors.email.message}</p>
                            <p className="errors-form">{errorsBack?.email && errorsBack.email.msg}</p>
                        </div>
                        <div>
                            <label htmlFor="passwordLogIn">Contraseña</label>
                            <input type="password" name="password" id="passwordLogIn" {...register("password",
                                {
                                    required: 'Este campo no puede estar vacío'
                                }
                            )} />
                            <p className="errors-form">{errors?.password && errors.password.message}</p>
                            <p className="errors-form">{errorsBack?.password && errorsBack.password.msg}</p>

                        </div>
                        <button className="button-form" type="submit">Ingresar</button>
                    </form>

                    <div className="button-container">
                        <p>¿No tienes una cuenta?</p><button type="submit" onClick={openDialogSignUp}>Sign Up</button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )

})

export default LogInUser;
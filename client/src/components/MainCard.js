import React from 'react';
import Imagen from '../assets/images/screenApp.JPG';


function MainCard({ userStoraged, transactions, children }) {

    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


    let totalIncome = transactions
        .filter(transaction => transaction.id_type === 1)
        .map(item => item.amount)
        .reduce((counter, item) => counter + item, 0)

    let totalExpenses = transactions
        .filter(transaction => transaction.id_type === 2)
        .map(item => item.amount)
        .reduce((counter, item) => counter + item, 0)

    let curentBalance = totalIncome - totalExpenses


    return (
        <main>
            {!userStoraged &&
                <React.Fragment>
                    <h3 className="main-title">¡Ordenar tu presupuesto es muy fácil!</h3>
                    <ol className="main-list">
                        <li><b>Regístrate</b> creando una cuenta.</li>
                        <li><b>Ingresa</b> a tu cuenta.</li>
                        <li><b>Registra</b> toda la información de <b>tus transacciones.</b></li>
                    </ol>
                    <p className="main-paragraph">Podrás ver el resumen de tu balance, filtrar tus transacciones, editarlas y eliminarlas.</p>

                    <div className="container-testimonial">

                        <div className="user-testimonial">

                            <h4 className="user-testimonial-name">Diana Polanco</h4>
                            <p>"Esta aplicación me ha ayudado mucho en mi presupuesto diario. He logrado organizar todos mis gastos e ingresos mensuales. Ahora que conozco mi presupuesto he logrado ahorrar y ser más eficiente con mi dinero."</p>

                        </div>

                        <div className="user-testimonial">

                            <h4 className="user-testimonial-name">Andrés Quintero</h4>
                            <p>"Recomiendo esta aplicación, muy fácil de usar. Además, al tener mi propia cuenta puedo tener un historial completo de mis ingresos y gastos. Una aplicación con todo lo que necesito para organizar mi presupuesto."</p>

                        </div>

                        <div className="image-screenApp">
                            <h3>¡Una aplicación fácil de usar! </h3>
                            <img src={Imagen} alt="Screen App" />
                        </div>

                    </div>
                </React.Fragment>
            }
            {
                userStoraged &&
                <div className="main-container">
                    <div className="balance-card">
                        <h4>${toThousand(curentBalance)}</h4>
                        <p>Balance Total</p>
                    </div>

                    {children}

                </div>
            }
        </main >
    )
}

export default MainCard
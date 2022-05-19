import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTransfer, faSquareCaretLeft, faSquareCaretRight} from '@fortawesome/free-solid-svg-icons'
import Transaction from './Transaction'



function TransactionsCard({ changeTransactionType, transactions, deleteTransaction, editForm }) {

    const [currentPage, setCurrentPage] = useState(0)


    let totalTransactions = transactions

    const itemsPerPage = 10

    let firstIndex = itemsPerPage * currentPage
    let lastIndex = (firstIndex + itemsPerPage) - 1

    let transactionsToShow = []


    totalTransactions.forEach((transaction, index) => {
        if (index >= firstIndex && index <= lastIndex) {
            transactionsToShow.push(transaction)
        }

        return transactionsToShow
    })



    const handlerDelete = (id) => {
        deleteTransaction(id)
    }

    const handlerEdit = (transaction) => {
        editForm(transaction)
    }

    const prevHandler = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextHandler = () => {
        if (totalTransactions.length >= lastIndex) {
            setCurrentPage(currentPage + 1)
        }
        else {
            setCurrentPage(currentPage)
        }
    }



    const onChangeHandler = (e) => {
        changeTransactionType(e.target.value)
    }

    return (
        <div className="table-container">
            <h3>Tus movimientos <FontAwesomeIcon icon={faMoneyBillTransfer} /></h3>
            {transactionsToShow.length === 0 &&
                <p>Ingresa tus transacciones en el formulario de arriba</p>
            }

            <div className="table-filter">
                <div>
                    <input type="radio" name="id_type" value={1} onChange={onChangeHandler} />
                    <span>Ingresos</span>
                </div>
                <div>
                    <input type="radio" name="id_type" value={2} onChange={onChangeHandler} />
                    <span>Egresos</span>
                </div>
                <div>
                    <input type="radio" name="id_type" value={0} onChange={onChangeHandler} />
                    <span>Todos</span>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionsToShow.map((transaction, i) => {
                        return <Transaction transaction={transaction} key={i} clickHandlerDeleteButton={handlerDelete} clickHandlerUpdateButton={handlerEdit} />
                    })
                    }

                </tbody>
            </table>
            <div className="table-nextpage">
                <i onClick={prevHandler}><FontAwesomeIcon icon={faSquareCaretLeft} /></i>
                <span>{currentPage + 1} - {Math.ceil(totalTransactions.length / itemsPerPage)}</span>
                <i onClick={nextHandler}><FontAwesomeIcon icon={faSquareCaretRight} /></i>
            </div>
        </div >

    )
}

export default TransactionsCard
import {faTrashCan, faFilePen} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Transaction({
    transaction,
    clickHandlerDeleteButton,
    clickHandlerUpdateButton
}) {

    const year = transaction.year.toString()
    const yearToShow = year.substring(year.length - 2)
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
        
        <tr>
            <td>{transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1) }</td>
            <td className={transaction.id_type === 2 ? "transaction-expense" : "" }> ${toThousand(transaction.amount)}</td>
            <td>{transaction.day}/{transaction.month}/{yearToShow}</td>
            <td>{transaction.id_type === 1 ? "Ingreso" : "Egreso"}</td>
            <td>
                <i className="edit-icon" type="button" onClick={() => clickHandlerUpdateButton(transaction)}><FontAwesomeIcon icon={faFilePen}/></i>
                <i className="delete-icon" type="button" onClick={() => clickHandlerDeleteButton(transaction.id)}><FontAwesomeIcon icon={faTrashCan}/></i>
            </td>
        </tr>
    )
}

export default Transaction
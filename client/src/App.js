// import logo from './logo.svg';
// import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header'
import MainCard from './components/MainCard'
import AddUser from './components/AddUser'
import LogInUser from './components/LogInUser'
import TransactionsCard from './components/TransactionsCard';
import AddTransaction from './components/AddTransaction';
import EditTransaction from './components/EditTransaction';
import useLocalStorage from './hooks/useLocalStorage';
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios';
import './assets/css/forms.css'
import './assets/css/transactionsCard.css'
import './assets/css/mainCard.css'
import './assets/css/header.css'
import swal from 'sweetalert';



const useStyles = makeStyles((theme) => ({

  dialogContent: {
    justifyContent: 'space-around',
    padding: '20px',
    display: 'flex',
    height: '420px',
    margin: 'auto',
    [theme.breakpoints.up("sm")]: {
      padding: '25px',
      width: '350px'
    },

    [theme.breakpoints.up("md")]: {
      padding: '30px',
      width: '400px'
    },

  }

}))


function App() {


  const styles = useStyles()

  const [dialogLogIn, setDialogLogIn] = useState(false)

  const [dialogSignUp, setDialogSignUp] = useState(false)

  const [users, setUsers] = useState([])

  const [submitAddUser, setSubmitAddUser] = useState(false)

  const [submitLogInUser, setSubmitLogInUser] = useState(false)

  const [errorsAddUser, setErrorsAddUser] = useState({})

  const [errorsUserLogged, setErrorsUserLogged] = useState([])

  const [transactions, setTransactions] = useState([])

  const [errorsAddTransaction, setErrorsAddTransaction] = useState([])

  const [newTransaction, setNewTransaction] = useState([])

  const [transactionsDeleted, setTransactionsDeleted] = useState(0)

  const [currentTransaction, setCurrentTransaction] = useState([])

  const [editTransaction, setEditTransaction] = useState(false)

  const [transactionEdited, setTransactionEdited] = useState(false)

  const [errorsEditTransaction, setErrorsEditTransaction] = useState([])

  const [transactionType, setTransactionType] = useState(0)

  const [userStoraged, setUserStoraged] = useLocalStorage("userLogged", "")

  const [userTransactions, setUserTransactions] = useState([])


  const getRequest = async () => {

    try {

      const response = await axios.get('http://localhost:5000/api/data')

      let allTransactions = await response.data.transactions
      let allUsers = await response.data.users
      let userTransactionsFilter = await allTransactions.filter(transaction => transaction.id_user === userStoraged.id)

      setUsers(allUsers)
      setUserTransactions(userTransactionsFilter)
      setTransactions(userTransactionsFilter)
    }
    catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {

    console.log("Se monta el componente")

    getRequest()

  }, [])


  const addUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:5000/api/data/users', newUser)
      const data = await response.data
      if (!data.errors) {
        setUsers([
          ...users,
          newUser
        ])
        setErrorsAddUser([])
        setSubmitAddUser(true)

      }
      else {
        setErrorsAddUser(data.errors)
      }

    }
    catch (error) {
      console.log(error);
    }
  }



  const logInUser = async (user) => {
    try {

      const response = await axios.post('http://localhost:5000/api/data/users-log', user)
      const data = await response.data

      if (!data.errors) {
        delete data.data.password
        setUserStoraged(data.data)
        setErrorsUserLogged([])
        setSubmitLogInUser(true)
        setDialogLogIn(false)

      }
      else {
        setErrorsUserLogged(data.errors)
      }
    }
    catch (error) {
      console.log(error);
    }

  }


  const addTransaction = async (newTransaction) => {

    try {
      const response = await axios.post('http://localhost:5000/api/data', newTransaction)
      const data = await response.data

      if (!data.errors) {
        setNewTransaction(data)
        // setTransactions([
        //   ...transactions,
        //   data
        // ])
      }
      else {
        setErrorsAddTransaction(data.errors)
      }
    }
    catch (error) {
      console.log(error);
    }

  }


  const editForm = (transaction) => {
    setTransactionEdited(false)
    setEditTransaction(true)
    setCurrentTransaction(transaction)
  }

  const updateTransaction = async (transaction) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/data/${transaction.id}`, transaction)
      const data = await response.data

      if (!data.errors) {
        setTransactionEdited(true)
        setEditTransaction(false)
      }
      else { setErrorsEditTransaction(data.errors) }
    }
    catch (error) {
      console.log(error);
    }

  }

  const deleteTransaction = async (transactionId) => {
    try {

      const alert = await swal({
        text: "¿Quieres eliminar esta transacción?",
        icon: "warning",
        buttons: {
          cancel: "No",
          confirm: "Sí"
        }
      })
      if (alert) {
        await axios.delete(`http://localhost:5000/api/data/${transactionId}`)
        setTransactionsDeleted(transactionsDeleted + 1)
      }
    }
    catch (error) {
      console.log("error")
    }

  }

  const changeTransactionType = (eventValue) => {
    setTransactionType(parseInt(eventValue))
  }


  const openCloseDialogLogIn = () => {
    setDialogLogIn(!dialogLogIn)
    if (dialogSignUp === true) {
      setDialogSignUp(false)
    }
  }

  const openCloseDialogSignUp = () => {
    setDialogSignUp(!dialogSignUp)
    if (dialogLogIn === true) {
      setDialogLogIn(false)
    }
  }


  useEffect(() => {

    getRequest()


  }, [newTransaction, transactionsDeleted, transactionEdited, userStoraged])

  useEffect(() => {

    if (userStoraged) {

      if (transactionType === 1 || transactionType === 2) {
        setTransactions(userTransactions.filter(transaction => transaction.id_type === transactionType))
      }

      else {
        setTransactions(userTransactions)
      }

    }

  }, [transactionType])



  return (
    <React.Fragment>
      <Header
        userStoraged={userStoraged}
        openDialogSignUp={openCloseDialogSignUp}
        openDialogLogIn={openCloseDialogLogIn}
        setUserStoraged={setUserStoraged} />
      <AddUser
        dialogStyle={styles.dialogContent}
        open={dialogSignUp}
        onClose={openCloseDialogSignUp}
        errorsBack={errorsAddUser}
        addUser={addUser}
        openDialogLogIn={openCloseDialogLogIn}
        submit={submitAddUser} />
      <LogInUser
        dialogStyle={styles.dialogContent}
        open={dialogLogIn}
        onClose={openCloseDialogLogIn}
        errorsBack={errorsUserLogged}
        logInUser={logInUser}
        openDialogSignUp={openCloseDialogSignUp}
        submit={submitLogInUser} />
      <MainCard
        userStoraged={userStoraged}
        transactions={transactions}>
        {!editTransaction ?
          <AddTransaction
            addTransaction={addTransaction}
            errorsBack={errorsAddTransaction}
            userStoraged={userStoraged} />
          :
          <EditTransaction
            currentTransaction={currentTransaction}
            updateTransaction={updateTransaction}
            errorsBack={errorsEditTransaction}
          />
        }
        <TransactionsCard
          userStoraged={userStoraged}
          transactions={transactions}
          changeTransactionType={changeTransactionType}
          deleteTransaction={deleteTransaction}
          editForm={editForm} />
      </MainCard>

    </React.Fragment>
  );
}

export default App;

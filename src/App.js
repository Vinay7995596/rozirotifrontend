import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './login';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      fetchTransactions();
    }
  }, [loggedIn]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://backend-gd98.onrender.com/get/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://vinay7995596.github.io/rozirotibackend/', { date, type, amount });

      await axios.post('https://backend-gd98.onrender.com/post/transactions', { date, type, amount });

      fetchTransactions(); // Fetch transactions after adding a new one
      setDate('');
      setType('');
      setAmount('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleLogin = (username, password) => {
    if (username === 'Ragichattu vinay' && password === 'Vinay1919@') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!loggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className='heading'>
        <h1>Expense Tracker</h1>
        <div className='container-flex'>
        <div className='text_area1'>
          <input className='text_input1' type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className='text_area1'>
          <select className='text_input1' value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className='text_area1'>
          <input className='text_input1' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
        </div>
        <div>
        <button className='button1'  type="submit">Add Transaction</button>
        </div>
        </div>
      </form>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Remaining Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.type}</td>
              <td style={{ color: transaction.type === 'expense' ? 'red' : 'green' }}>
                {transaction.amount}
              </td>
              <td>{transaction.remaining_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


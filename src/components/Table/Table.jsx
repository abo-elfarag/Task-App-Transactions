// import React, { useState, useEffect } from 'react';
// import Style from './Table.module.css'
// import axios from 'axios';
// import LoadingPage from '../LoadingPage/LoadingPage';
// import { Modal, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Line  } from 'react-chartjs-2'
// import { Chart as ChartJS,
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Legend,
//     Tooltip
//     } from 'chart.js';

// ChartJS.register(
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Legend,
//     Tooltip
// );

// export default function Home() {
//     const [customers, setCustomers] = useState([]);
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [minAmount, setMinAmount] = useState('');
//     const [maxAmount, setMaxAmount] = useState('');
//     const [sortOrder, setSortOrder] = useState('asc');
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     const fetchCustomers = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/customers');
//             setCustomers(response.data);
//         } catch (err) {
//             console.error('Error fetching customers:', err);
//         }
//     };

//     const fetchTransactions = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/transactions');
//             setTransactions(response.data);
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching transactions:', err);
//         }
//     };

//     const getTotalAmount = (customerId) => {
//         const customerTransactions = transactions.filter(transaction => transaction.customer_id === customerId);
//         return customerTransactions.reduce((total, transaction) => total + transaction.amount, 0);
//     };

//     const getNameById = (customerId) => {
//         const customer = customers.find(customer => customer.id === customerId);
//         return customer ? customer.name : 'Unknown';
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             await fetchCustomers();
//             await fetchTransactions();
//         };
//         fetchData();
//     }, []);

//     const filteredCustomers = customers.filter(customer => {
//         const totalAmount = getTotalAmount(customer.id);
//         const isNameMatch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const isAmountMatch = (minAmount === '' || totalAmount >= minAmount) && (maxAmount === '' || totalAmount <= maxAmount);
//         return isNameMatch && isAmountMatch;
//     });

//     const handleSort = () => {
//         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
//     };

//     const handleViewTransactions = (customerId) => {
//         setSelectedCustomer(customerId);
//         setShowModal(true);
//     };

//     const getCustomerTransactions = (customerId) => {
//         return transactions.filter(transaction => transaction.customer_id === customerId);
//     };

//     const chartData = (customerId) => {
//         const customerTransactions = getCustomerTransactions(customerId);
//         console.log(customerTransactions)
//         return {
//             labels: customerTransactions.map(transaction => transaction.date),
//             datasets: [{
//                 label: 'Transaction Amount',
//                 data: customerTransactions.map(transaction => transaction.amount),
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 pointBorderColor: '#506BE4',
//                 borderColor: '#506BE4',
//                 fill: true,
//                 tension: 0.4,
//             }],
//         };
//     };

//     const sortedCustomers = [...filteredCustomers].sort((a, b) => {
//         const amountA = getTotalAmount(a.id);
//         const amountB = getTotalAmount(b.id);
//         return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
//     });

//     return (
//         <>
//             <div className='px-5'>
//             <div className={Style.filterBar}>
//                 <div className='mt-4'>
//                     <button className='btn btn-primary' onClick={handleSort}>
//                         Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'} <i className="fa-solid fa-arrow-up-wide-short ms-2"></i>
//                     </button>
//                 </div>
//                 <div className='me-4'>
//                     <input className="form-control me-2 mb-3" type="search" placeholder="Search by name" aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

//                     <p className='mb-0 fw-bolder'>Search by amount</p>
//                     <div className='d-flex'>
//                         <input className="form-control me-2" type="number" placeholder="Min amount" aria-label="Search" value={minAmount} onChange={(e) => setMinAmount(e.target.value)}/>
//                         <input className="form-control me-2" type="number" placeholder="Max amount" aria-label="Search" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)}/>
//                     </div>
//                 </div>
//             </div>
//             {loading ? (<LoadingPage/>) : (
//                     <table className='table table-striped shadow-lg '>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Total transaction amount</th>
//                             <th>Transactions per day</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {sortedCustomers.map(customer => (
//                             <tr key={customer.id}>
//                                 <td>{customer.name}</td>
//                                 <td>{getTotalAmount(customer.id)}</td>
//                                 <td><button className='btn btn-primary' onClick={() => handleViewTransactions(customer.id)}>view all transactions</button></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//             </div>

//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Transactions for Customer {getNameById(selectedCustomer)}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedCustomer && getCustomerTransactions(selectedCustomer).length > 0 && (
//                         <Line data={chartData(selectedCustomer)} />
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

import React from 'react'

export default function CustomerTable({ customers, getTotalAmount, handleViewTransactions, sortOrder, handleSort }) {
return (
    <>
        <div className='table-responsive'>
            <button className='btn btn-primary' onClick={handleSort}>
                Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'} <i className="fa-solid fa-arrow-up-wide-short ms-2"></i>
            </button>
            <table className='table table-striped shadow-lg mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total transaction amount</th>
                        <th>Transactions per day</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{getTotalAmount(customer.id)}</td>
                            <td>
                                <button className='btn btn-primary' onClick={() => handleViewTransactions(customer.id)}>View transactions</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
)
}


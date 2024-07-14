import React, { useState, useEffect } from 'react';
import Style from './Home.module.css'
import axios from 'axios';
import NotFoundImg from '../imgs/558-5585968_thumb-image-not-found-icon-png-transparent-png.png'
import CustomerTable from '../components/Table/Table.jsx';
import CustomerModal from '../components/CustomerModal/CustomerModal.jsx';
import FilterBar from '../components/FilterBar/FilterBar.jsx';
import LoadingPage from '../components/LoadingPage/LoadingPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

export default function Home() {
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Function to fetch customers from the backend
    const fetchCustomers = async () => {
        try {
            const response = (await axios.get('https://api.jsonbin.io/v3/b/66944ba9acd3cb34a8662b99' , {
                headers: {
                    'X-MASTER-KEY': '$2a$10$J0cgyHCZq1qxXKENqCVWqeb3f3JPTEIKWAO75aFxF2Rph.QQknmT2',
                    'X-ACCESS-KEY': '$2a$10$8ln8.vTFiZPCGDdgRhpGqeG6CJxc2YcN3LBpwT6QqnGvm4/rKLKJ.'
                }
            }));
            setCustomers(response.data.record.customers);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };

    // Function to fetch transactions from the backend
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('https://api.jsonbin.io/v3/b/66944c00e41b4d34e411f251' , {
                headers: {
                    'X-MASTER-KEY': '$2a$10$J0cgyHCZq1qxXKENqCVWqeb3f3JPTEIKWAO75aFxF2Rph.QQknmT2',
                    'X-ACCESS-KEY': '$2a$10$8ln8.vTFiZPCGDdgRhpGqeG6CJxc2YcN3LBpwT6QqnGvm4/rKLKJ.'
                }
            });
            setTransactions(response.data.record.transactions);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching transactions:', err);
        }
    };

    // Function to calculate total transaction amount for a given customer
    const getTotalAmount = (customerId) => {
        const customerTransactions = transactions.filter(transaction => transaction.customer_id === customerId);
        return customerTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    };

    // Function to get customer name by ID
    const getNameById = (customerId) => {
        const customer = customers.find(customer => customer.id === customerId);
        return customer ? customer.name : 'Unknown';
    };

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            await fetchCustomers();
            await fetchTransactions();
        };
        fetchData();
    }, []);

    // Derived state for filtered customers based on search term and amount range
    const filteredCustomers = customers.filter(customer => {
        const totalAmount = getTotalAmount(customer.id);
        const isNameMatch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isAmountMatch = (minAmount === '' || totalAmount >= minAmount) && (maxAmount === '' || totalAmount <= maxAmount);
        return isNameMatch && isAmountMatch;
    });

    // Toggle sort order
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
    };

    // Set selected customer and show modal
    const handleViewTransactions = (customerId) => {
        setSelectedCustomer(customerId);
        setShowModal(true);
    };

    // Get transactions for a selected customer
    const getCustomerTransactions = (customerId) => {
        return transactions.filter(transaction => transaction.customer_id === customerId);
    };

    // Data for the line chart
    const chartData = (customerId) => {
        const customerTransactions = getCustomerTransactions(customerId);
        return {
            labels: customerTransactions.map(transaction => transaction.date),
            datasets: [{
                label: 'Transaction Amount',
                data: customerTransactions.map(transaction => transaction.amount),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointBorderColor: '#506BE4',
                borderColor: '#506BE4',
                fill: true,
                tension: 0.4,
            }],
        };
    };

    // Derived state for sorted customers based on total transaction amount and sort order
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        const amountA = getTotalAmount(a.id);
        const amountB = getTotalAmount(b.id);
        return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
    });

    return (
        <>
            <div className={Style.homeContainer}>
                <FilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    minAmount={minAmount}
                    setMinAmount={setMinAmount}
                    maxAmount={maxAmount}
                    setMaxAmount={setMaxAmount}
                />
                {loading ? (
                    <LoadingPage />
                ) : (
                    filteredCustomers.length > 0 ? (
                        <CustomerTable
                            customers={sortedCustomers}
                            getTotalAmount={getTotalAmount}
                            handleViewTransactions={handleViewTransactions}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                        />
                    ) : (
                        <div>
                            <div className='d-flex justify-content-center mb-3'>
                                <img src={NotFoundImg} alt="No customers found image" className='w-25' />
                            </div>
                            <div className="alert alert-warning text-center" role="alert">
                                No customers found.
                            </div>
                        </div>
                        
                    )
                )}
            </div>
            <CustomerModal
                showModal={showModal}
                setShowModal={setShowModal}
                selectedCustomer={selectedCustomer}
                getNameById={getNameById}
                getCustomerTransactions={getCustomerTransactions}
                chartData={chartData}
            />
        </>
    );
}

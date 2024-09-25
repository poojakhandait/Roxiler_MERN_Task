import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';

import './App.css';

const App = () => {
    const [month, setMonth] = useState('3'); // Default to March
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCombinedData = async (selectedMonth) => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`http://localhost:5000/combined?month=${selectedMonth}`);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCombinedData(month);
    }, [month]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    return (
        <div className='app-container'>
            <div className='maincon'>
                <div className='h1'><h1>Transactions Dashboard</h1></div>

                <div className="month-selector">
                <input type="text" placeholder="Search transactions" /> 
                    <div className='month'>
                        <label htmlFor="month">Select Month: </label>
                        <select id="month" value={month} onChange={handleMonthChange}>
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((m) => (
                                <option key={m} value={m}>
                                    {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : data ? (
                <>
                    <TransactionsTable />
                    <Statistics stats={data.statistics} month={month}/>
                    
                    <BarChart data={data.barChartData} month={month}/>
                    
                </>
            ) : null}
        </div> 
    );
};

export default App;

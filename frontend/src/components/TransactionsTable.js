import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get(`http://localhost:5000/pagination?search=${search}&page=${page}`);
            setTransactions(response.data.products);
            setTotalPages(response.data.totalPages);
        };
        fetchTransactions();
    }, [search, page]);
    
    


    return (
        <div className="transactions-table"> 
        {/* <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={setSearch}
      /> */}
      <div className='table'>
      
            <table border={1} solid black>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th> 
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id} >
                            <td>{transaction.id}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>${transaction.price.toFixed(2)}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.sold.toString()}</td>
                            <td className='img'><img src={transaction.image}/></td>
                        </tr>
                    ))}
                
            </table>
        </div>
            <div className="pagination">
                <p>PageNO:{page}</p>
                <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>-
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
                </div>
                <p>PerPage:{totalPages}</p>

            </div>
        </div>
    );
};

export default TransactionsTable;

import React from 'react';

const Statistics = ({ stats,month  }) => {
    return (
        <div className="statistics">
            
            <h2>Statistics - {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <div className='statisticsData'>
                <p>Total Sale Amount:<span>${stats.totalSaleAmount.toFixed(2)}</span></p>
                <p>Total Sold Items: <span>{stats.totalSoldItems}</span></p>
                <p>Total Unsold Items: <span>{stats.totalUnSoldItems}</span></p>
            </div>
        </div>
    );
};

export default Statistics;

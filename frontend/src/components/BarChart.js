import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent= ({ data,month }) => {

    const formattedData = data.map((item,ind) =>{
        if(ind==data.length-1)
        {
            return({
                priceRange:item._id, 
                count: item.count
            })
        }
        else{
            return(
                {
                    priceRange: ""+item._id+"-"+(item._id+100-1), 
                    count: item.count
                }
            )
        }
    } )

    return (
        <div className="bar-chart">
            <h2>BarChartStats - {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            
            <BarChart width={600} height={300} data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priceRange" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BarChartComponent;

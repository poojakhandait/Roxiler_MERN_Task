let axios = require("axios")
const prodmodel = require("../Model/productmodel")
const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        const products = response.data
        console.log(response.data)

        await prodmodel.deleteMany()
        await prodmodel.insertMany(products)

        res.json({ "message": 'Database initialized with seed data.' })
    } catch (error) {
        console.log(error)
        res.json({ "message": 'Error initializing the database.' })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await prodmodel.find()
        res.json(products)
    } 
    catch (error) {
        console.log(error)
        res.json({ "message": 'Error fetching products.' })
    }
}

const getTransactions = async (req, res) => {
    try {
        // Extract query parameters with default values
        const { search = '', page = 1, perPage = 10 } = req.query;

        // Convert page and perPage to integers
        const currentPage = parseInt(page);
        const itemsPerPage = parseInt(perPage);

        // Create a query object based on search input
        let query = {};
        if (search) {
            const searchRegex = new RegExp(search, 'i'); // 'i' makes the search case-insensitive
            query = {
                $or: [
                    { title: { $regex: searchRegex } },
                    { description: { $regex: searchRegex } },
                    { price: { $regex: searchRegex } }
                ]
            };
        }

        // Fetch products based on the query with pagination
        const products = await prodmodel.find(query)
            .skip((currentPage - 1) * itemsPerPage)  // Skip to the correct page
            .limit(itemsPerPage);  // Limit the results to itemsPerPage

        // Get the total count of matching products
        const totalProducts = await prodmodel.countDocuments(query);

        // Return the paginated results
        res.json({
            page: currentPage,
            perPage: itemsPerPage,
            totalRecords: totalProducts,
            totalPages: Math.ceil(totalProducts / itemsPerPage),
            products
        });
    } 
    catch (error) {
        console.log(error);
        res.json({ "message": 'Error fetching transactions.' });
    }
};

const getSalesStatistics = async (req, res) => {
    try {
        
        const year= req.params.year;
        const month = req.params.month;

        if (!year || !month) {
            return res.json({ "message": "Year and month are required." })
        
        }

        let startDate = new Date(`${year}-${month}-01`)
        let endDate = new Date(`${year}-${month}-01`)
        endDate.setMonth(endDate.getMonth() + 1);

        const soldItems = await prodmodel.find({
            sold: true,
            dateOfSale: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
        })

        const totalSaleAmount = soldItems.reduce((total, item) => total + item.price, 0);
        const totalSoldItems = soldItems.length;

        const unSoldItems = await prodmodel.find({
            sold: false,
            dateOfSale: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
        })

        const totalUnSoldItems = unSoldItems.length;

        res.json({
            totalSaleAmount,
            totalSoldItems,
            totalUnSoldItems,
        });
    } 
    catch (error) {
        console.log(error);
        res.json({ "message": 'Error getting sales statistics.' })
    }
}


const getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;
        if (!month) {
            return res.json({ "message": "Month is required." });
        }

        const startDate = new Date(`2000-${month}-01`)
        const endDate = new Date(`2000-${month}-01`)
        endDate.setMonth(endDate.getMonth() + 1)

        

        const barChartData = await prodmodel.aggregate([
            {
                // Filter by the selected month (ignoring the year)
                $addFields: {
                    soldMonth: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    soldMonth: parseInt(month),
                    sold: true,
                }
            },
            {
                // Group by price ranges
                $bucket: {
                    groupBy: "$price", // Field to group by
                    boundaries: [1, 101, 201, 301, 401, 501, 601, 701, 801, 901], // Define boundaries
                    default: "901-above", // Bucket name for prices above 900
                    output: {
                        count: { $sum: 1 } // Count the number of items in each bucket
                    }
                }
            }
        ]);

        res.json(barChartData);
    } 
    catch (error) {
        console.log(error);
        res.json({ "message": 'Error generating bar chart data.' });
    }
}

// Controller for generating pie chart data based on categories
const getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.json({ "message": "Month is required." });
        }

        // Create start and end dates for the selected month (ignoring the year)
        const startDate = new Date(`2000-${month}-01`); // Use a dummy year like 2000
        const endDate = new Date(`2000-${month}-01`);
        endDate.setMonth(endDate.getMonth() + 1); // Move to the first day of the next month

        // Query to filter by month and group by category
        const pieChartData = await prodmodel.aggregate([
            {
                // Filter by the selected month (ignoring the year)
                $addFields: {
                    soldMonth: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    soldMonth: parseInt(month),
                    sold: true,
                }
            },
            {
                // Group by category and count items
                $group: {
                    _id: "$category", // Group by category field
                    count: { $sum: 1 } // Count the number of items in each category
                }
            }
        ]);

        // Transform the data into a more readable format if necessary
        const formattedData = pieChartData.map(item => ({
            category: item._id,
            items: item.count
        }));

        res.json(formattedData);
    }
     catch (error) {
        console.error(error);
        res.json({ "message": 'Error generating pie chart data.' });
    }
}

const getSalesStatistics1 = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.json({ "message": "Month is required." });
        }

        // Start of the month (any year)
        const startOfMonth = new Date();
        startOfMonth.setMonth(parseInt(month) - 1); // Month index is zero-based
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        // End of the month (any year)
        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        // Fetch all sold items within the selected month, disregarding the year
        const soldItems = await prodmodel.find({
            sold: true,
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
            }
        });

        const totalSaleAmount = soldItems.reduce((total, item) => total + item.price, 0);
        const totalSoldItems = soldItems.length;

        // Fetch all unsold items within the selected month, disregarding the year
        const unSoldItems = await prodmodel.find({
            sold: false,
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
            }
        });

        const totalUnSoldItems = unSoldItems.length;

        res.json({
            totalSaleAmount,
            totalSoldItems,
            totalUnSoldItems,
        });
    }
     catch (error) {
        console.error(error);
        res.json({ "message": 'Error getting sales statistics.' });
    }
}

// Controller for combining statistics, bar chart, and pie chart data
const getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.json({ "message": "Month is required." });
        }

        // Fetch sales statistics
        const statsResponse = await axios.get(`http://localhost:5000/state1/?month=${month}`);
        const statistics = statsResponse.data;

        // Fetch bar chart data
        const barChartResponse = await axios.get(`http://localhost:5000/barchart?month=${month}`);
        const barChartData = barChartResponse.data;

        // Fetch pie chart data
        const pieChartResponse = await axios.get(`http://localhost:5000/piechart?month=${month}`);
        const pieChartData = pieChartResponse.data;

        // Combine all data into a single response object
        const combinedResponse = {
            statistics,
            barChartData,
            pieChartData,
        };

        res.json(combinedResponse);
    } 
    catch (error) {
        console.error('Error fetching combined data:', error);
        res.json({ "message": 'Error fetching combined data.' });
    }
    
};


module.exports = {initializeDatabase,getAllProducts,getTransactions,getSalesStatistics,getSalesStatistics1, getBarChartData,getPieChartData,getCombinedData
}
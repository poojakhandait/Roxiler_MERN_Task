let express=require('express')
const { initializeDatabase, getAllProducts, getTransactions, getSalesStatistics, getBarChartData, getSalesStatistics1, getPieChartData, getCombinedData } = require('../Controller/productcon')
let route= new express.Router()

route.get("/transaction",initializeDatabase)
route.get('/getproduct',getAllProducts)
route.get('/pagination',getTransactions)
route.get('/stats/:year/:month',getSalesStatistics)
route.get('/state1',getSalesStatistics1)
route.get("/barchart", getBarChartData)
route.get("/piechart",getPieChartData)
route.get("/combined",getCombinedData)

module.exports=route
MERN Stack Coding Challenge
Overview
This project involves creating a backend and frontend application using the MERN stack. The primary goal is to interact with a third-party API, handle data processing on the backend, and display the processed data on the frontend using charts and tables.

Backend Task
1. Data Initialization API
Fetch data from a third-party API and initialize the database with seed data.
API URL: https://s3.amazonaws.com/roxiler.com/product_transaction.json
Request Method: GET
Response Format: JSON
2. API Endpoints
List All Transactions:

API should support search and pagination on product transactions.
Search by product title, description, or price.
Default pagination: page = 1, per page = 10.
Statistics API:

Total sale amount of the selected month.
Total number of sold items of the selected month.
Total number of not sold items of the selected month.
Bar Chart API:

Return the number of items within specific price ranges (0-100, 101-200, etc.) for the selected month.
Pie Chart API:

Find unique categories and the number of items sold in each category for the selected month.
Combined Data API:

Fetch data from the above three APIs and combine the results into a single JSON response.
Frontend Task
1. Transactions Table:
Display a table of transactions based on the selected month.
Provide a search functionality to filter transactions by title, description, or price.
Use pagination to display the results.
Dropdown to select months from January to December (default: March).
2. Transactions Statistics:
Display total sales amount, number of sold items, and number of unsold items for the selected month.
3. Bar Chart:
Display a bar chart showing the number of items in different price ranges for the selected month.



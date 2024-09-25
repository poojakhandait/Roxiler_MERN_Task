<h1>MERN Stack Coding Challenge</h1>
Project Description:
This project is a comprehensive MERN stack application that processes transaction data retrieved from a third-party API. The backend interacts with the API to seed a database with product transaction data, while the frontend allows users to view and interact with this data through a responsive interface. Key features include searching, filtering, and displaying transaction statistics, as well as visualizing data using bar and pie charts.

Backend Features:
Data Initialization:
The backend fetches transaction data from a third-party API and initializes the database with seed data.
API Endpoints:
List Transactions: Supports search and pagination, allowing users to search through transaction records based on product title, description, and price.
Transaction Statistics: Returns key metrics such as the total sales amount, number of sold items, and number of unsold items for a selected month.
Bar Chart Data: Provides a distribution of products across price ranges for the selected month.
Pie Chart Data: Returns the number of items in unique categories for the selected month.
Combined Data API: Aggregates data from the above endpoints into a single response for easy retrieval.
Frontend Features:
Transaction Table:

Displays a paginated and searchable list of transactions.
The table can be filtered by month, with a default month pre-selected.
Statistics Display:

Shows the total sales amount, total sold items, and unsold items for the selected month.
Bar and Pie Charts:

Visualize product price distributions and product categories for the selected month, providing insights through interactive charts.
Technology Stack:
Frontend: React.js with Axios for API calls.
Backend: Node.js, Express.js, and MongoDB for data storage.
Charts: Integration of charting libraries (e.g., Chart.js or D3.js) to create interactive bar and pie charts.

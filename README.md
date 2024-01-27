# Inventory Hub - MERN Inventory Management System

Inventory Hub is a comprehensive Inventory Management System built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows businesses to efficiently manage their inventory, track stock levels, and streamline the order fulfillment process.

## Features

- **User Authentication:** Secure user authentication system for managing access to the inventory system.

- **User Roles and Authorization:**
  - **System-Admin:**
    - Can view all shops and send notices to shop owners.
    - Can view details of shops and all their products.

  - **Shop-Manager:**
    - **Product Management:**
      - Add, manage, delete, view, and search products by name.
   
    - **Payment and Subscription:**
      - Payment through card to increase the product adding limit.

    - **Sale Collection:**
      - View products table and search products.
      - Add products to the cart for the current customer.
      - Mark as paid for the current sale, generate invoices, and update the database automatically.

    - **Sales Summary:**
      - View total profit, total sales, and total investment of the shop.
      - View sales history.

  - **Logged-User:**
    - A user who registers on the system.
    - Can create only one shop.
    - Can create a shop.
    - Can be a shop manager of an existing shop.

- **Product Management:** Add, update, and delete products. Track product details such as name, description, quantity, and price.

- **Category Management:** Organize products into categories for better inventory organization.

- **Inventory Tracking:** Real-time tracking of stock levels to avoid overstocking or stockouts.

- **Order Management:** Place and manage orders, track order status, and monitor order history.

- **Reports:** Generate Invoice and view reports for insights into inventory performance.


## Technologies Used

- **Frontend:**
  - React: A JavaScript library for building user interfaces.
  - Axios: HTTP client for making API requests.

- **Backend:**
  - Node.js: JavaScript runtime for server-side development.
  - Express.js: Web application framework for Node.js.
  - MongoDB: NoSQL database for storing inventory data.

- **Authentication:**
  - JSON Web Tokens (JWT): For secure user authentication.

## Getting Started

------------------



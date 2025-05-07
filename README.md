# Argent Bank 🏦

A secure and user-friendly banking application built with **React and Redux Toolkit**. The state management is provide by store from Redux and enables users to **log in/out, stay logged, update their profiles, and manage their accounts**.

## 🚀 Features

-   User **authentication** ( Login, Logout)
-   **Token-based authentication**
-   Fetch and update **user profiles**
-   Protected routes for **authorized users**
-   Redux Toolkit for **state management**

## 🛠️ Tech Stack

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

## 🔐 Authentication Flow

**1) Users register and receive an authentication token.**

**2)The token is stored and used for subsequent API requests.**

**3)Users can log out, removing the token from storage.**

**4)Redux manages global authentication state.**

## API and Database

**Clone the API repository** and follow the ReadMe to start the backend server:

```bash
git clone https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API.git
```

You can use Docker to run a container for MongoDB https://www.docker.com/products/docker-desktop/

Also to see DB entries, you can use MongoDB Compass https://www.mongodb.com/products/tools/compass

## Install project dependencies

1. **React** :

    ```bash
    npm install
    ```

2. **Redux**

    ```bash
    npm install @reduxjs/toolkit react-redux
    ```

3. **Sass** :

    ```bash
    npm install sass
    ```

## Run app

Make sure your DB is running and API connected to it

```bash
 npm run dev
```

**API documentation**

See http://localhost:3001/api-docs/

# PRODUCT MANAGEMENT TOOL DEMO

## 1. Project Features

- **Homepage**: A list of products displaying basic information like Name, Description, Price, and a "View Details" button. (Accessible to all users regardless of role).
- **Management Page**: Similar to the homepage, but with additional management features like "Add Product", "Edit Product", and "Delete Product". Only accessible after login.
- **Login**: Allows users to log in and manage products. Product management page is accessible only to logged-in users.

## 2. Technology Stack

### Backend
- **ExpressJS**: Used to build the server API.
- **MongoDB**: Stores product information and user accounts.
- **JWT (JSON Web Token)**: Manages login sessions and user authentication.

### Frontend
- **ReactJS**: Builds the user interface.
- **Webpack**: Bundles the ReactJS project.
- **Redux, Redux Thunk**: Manages global state and supports asynchronous API calls.
- **Axios**: Handles HTTP requests to the backend.
- **React-Toastify**: Displays notifications for user interactions (e.g., success or error messages).

### CI/CD
- **GitHub Actions**: Automates development processes (build, test, deploy).
- **Vercel**: Deploys both frontend and backend applications.

## 3. Project Resources

### Backend:
- GitHub BE link: [https://github.com/Khanhxoan/product-management-server-expressjs](https://github.com/Khanhxoan/product-management-server-expressjs)
- Backend server link: [https://product-management-server-expressjs.vercel.app](https://product-management-server-expressjs.vercel.app)

### Frontend:
- GitHub FE link: [https://github.com/Khanhxoan/products-management-demo](https://github.com/Khanhxoan/products-management-demo)
- Project demo link: [https://products-management-demo-seven.vercel.app/](https://products-management-demo-seven.vercel.app/)

## 4. CI/CD

- **Deploy configuration file**: `.github/workflows/main.yml`
  - **name**: The name of the stages in the workflow.
  - **on**: Automatically triggers the workflow on specific events (e.g., push, pull request).
  - **jobs**: A workflow consists of one or more jobs that are automatically run.

## 5. How to Run the Project
  - git clone https://github.com/Khanhxoan/products-management-demo.git
  - npm start
  - http://localhost:9000
  Login with username/password: khanhvn1/pass1234
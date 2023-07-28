## Grocery Store API Documentation

This API provides functionality for managing a Grocery Store.

### Overview

The Grocery Store API allows users to interact with various features of the Grocery Store application, such as managing products, placing orders, and user authentication.

### Base URL

- Live: 
- Local: http://localhost:8080

### Authentication

This API uses JSON Web Tokens (JWT) for authentication. In order to access protected routes, clients must include a valid token in the `Authorization` header with the "Bearer" scheme.

### Endpoints

#### Register a New User

- Method: POST
- URL: `/users/register`
- Description: Register a new user with the provided details.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| firstName   | String   | The first name of the user.              |
| lastName    | String   | The last name of the user.               |
| email       | String   | The email of the user.                   |
| password    | String   | The password of the user.                |
| age         | Number   | The age of the user.                     |
| gender      | String   | The gender of the user.                  |

**Responses:**

- 201 (Created):
  ```json
  {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 30,
    "gender": "male"
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Please provide all required fields."
  }
  ```
- 409 (Conflict):
  ```json
  {
    "error": "User with this email already exists."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to register the user."
  }
  ```

#### User Login

- Method: POST
- URL: `/users/login`
- Description: Authenticate user login.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| email       | String   | The email of the user.                   |
| password    | String   | The password of the user.                |

**Responses:**

- 200 (OK):
  ```json
  {
    "token": "jwt_token"
  }
  ```
- 401 (Unauthorized):
  ```json
  {
    "error": "Invalid credentials."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to authenticate."
  }
  ```

#### Reset User Password

- Method: POST
- URL: `/users/reset-password`
- Description: Reset the user's password.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| email       | String   | The email of the user.                   |
| password    | String   | The new password for the user.           |

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "Password reset successful."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "User not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Password reset failed."
  }
  ```

#### Get All Users

- Method: GET
- URL: `/users`
- Description: Get information about all users.

**Responses:**

- 200 (OK):
  ```json
  [
    {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "age": 30,
      "gender": "male"
    },
    // More user objects
  ]
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to fetch users."
  }
  ```

#### Get Single User by ID

- Method: GET
- URL: `/users/:id`
- Description: Get information about a single user by their ID.

**Responses:**

- 200 (OK):
  ```json
  {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 30,
    "gender": "male"
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "User not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to fetch user."
  }
  ```


### Delete User by ID

- Method: DELETE
- URL: `/users/:id`
- Description: Delete a user by their ID.

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "User deleted successfully."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "User not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to delete user."
  }
  ```

### Update User Information by ID

- Method: PUT
- URL: `/users/:id`
- Description: Update user information by their ID.

**Request Body:**

| Field       | Type     | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| firstName   | String   | The updated first name of the user.              |
| lastName    | String   | The updated last name of the user.               |
| email       | String   | The updated email of the user.                   |
| age         | Number   | The updated age of the user.                     |
| gender      | String   | The updated gender of the user.                  |

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "User information updated successfully."
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Please provide at least one field to update."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "User not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to update user information."
  }
  ```

#### Create a New Product

- Method: POST
- URL: `/products`
- Description: Create a new product in the grocery store.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| name        | String   | The name of the product.                 |
| description | String   | The description of the product.          |
| amount      | Number   | The price of the product.                |
| discount    | Number   | The discount on the product. (Optional)  |
| image       | String   | The URL of the product image.            |
| category    | String   | The category of the product.             |
| brand       | String   | The brand of the product. (Optional)     |
| availability| Boolean  | The availability status of the product.  |
| rating      | Number   | The rating of the product. (Optional)    |

**Responses:**

- 201 (Created):
  ```json
  {
    "id": "product_id",
    "name": "Product Name",
    "description": "Product Description",
    "amount": 19.99,
    "discount": 5.00,
    "image": "https://example.com/product_image.jpg",
    "category": "Groceries",
    "brand": "Brand Name",
    "availability": true,
    "rating": 4.5,
    "createdAt": "2023-07-31T12:34:56.000Z",
    "updatedAt": "2023-07-31T12:34:56.000Z"
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Please provide all required fields."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to create the product."
  }
  ```

#### Update a Product

- Method: PUT
- URL: `/products/:id`
- Description: Update an existing product in the grocery store.

**URL Parameters:**

- `id` - The ID of the product to be updated.

**Request Body:**

| Field       | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| name        | String   | The updated name of the product.         |
| amount      | Number   | The updated price of the product.        |
| discount    | Number   | The updated discount on the product. (Optional)  |
| image       | String   | The updated URL of the product image.    |
| category    | String   | The updated category of the product.     |
| brand       | String   | The updated brand of the product. (Optional)     |
| availability| Boolean  | The updated availability status of the product.  |
| rating      | Number   | The updated rating of the product. (Optional)    |

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "Product updated successfully."
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "error": "Please provide at least one field to update."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Product not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to update the product."
  }
  ```

#### Delete a Product

- Method: DELETE
- URL: `/products/:id`
- Description: Delete a product from the grocery store.

**URL Parameters:**

- `id` - The ID of the product to be deleted.

**Responses:**

- 200 (OK):
  ```json
  {
    "message": "Product deleted successfully."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "error": "Product not found."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to delete the product."
  }
  ```

#### Get All Products

- Method: GET
- URL: `/products`
- Description: Get information about all products in the grocery store or filter products based on specific criteria.

**Query Parameters:**

| Parameter   | Type     | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| category    | String   | Filter products by category. (Optional)           |
| brand       | String   | Filter products by brand. (Optional)              |
| availability| Boolean  | Filter products by availability status. (Optional)|

**Responses:**

- 200 (OK):
  ```json
  [
    {
      "id": "product_id",
      "name": "Product Name 1",
      "description": "Product Description 1",
      "amount": 19.99,
      "discount": 5.00,
      "image": "https://example.com/product_image1.jpg",
      "category": "Groceries",
      "brand": "Brand Name",
      "availability": true,
      "rating": 4.5,
      "createdAt": "2023-07-31T12:34:56.000Z",
      "updatedAt": "2023-07-31T12:34:56.000Z"
    },
    // More product objects
  ]
  ```
- 500 (Internal Server Error):
  ```json
  {
    "error": "Failed to fetch products."
  }
  ```

---



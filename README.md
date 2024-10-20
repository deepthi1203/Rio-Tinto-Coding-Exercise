# Rio-Tinto-Coding-Exercise
## Overview
A simple Node.js application for managing items. The application supports CRUD operations and uses MongoDB Atlas as the database.

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Create Item](#create-item)
  - [Get Items](#get-items)
  - [Get Item by ID](#get-item-by-id)
  - [Update Item](#update-item)
  - [Patch Item](#patch-item)
  - [Delete Item](#delete-item)
## Introduction
This is a Node.js REST API project designed for managing items. It allows users to create, read, update, patch, and delete items.

## Technologies Used
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- NPM or Yarn (for package management)

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```plaintext
   MONGODB_URI=<your-mongodb-connection-string>
   PORT=3000
   ```

4. **Build the Project**
   If you are using TypeScript, compile the files using:
   ```bash
   npm run build
   ```

5. **Run the application**
   To start the application, use:
   ```bash
   npm run start
   ```
6. **Deployment**
   This app is deployed on an EC2 instance. You can check the running application at the following URL:
   ```bash
   http://3.96.152.193:3000/api/items
   ```

## API Endpoints

### Create Item
- **POST** `/api/items`
- **Request Body**:
  ```json
  {
    "name": "Item Name",
    "description": "Item Description"
  }
  ```

- **Response**:
  - **201 Created**
    ```json
    {
      "_id": "item_id",
      "name": "Item Name",
      "description": "Item Description"
    }
    ```

### Get Items
- **GET** `/api/items`
- **Response**:
  - **200 OK**
    ```json
    [
      {
        "_id": "item_id",
        "name": "Item Name",
        "description": "Item Description"
      }
    ]
    ```

### Get Item by ID
- **GET** `/api/items/:id`
- **Response**:
  - **200 OK**
    ```json
    {
      "_id": "item_id",
      "name": "Item Name",
      "description": "Item Description"
    }
    ```

  - **404 Not Found**
    ```json
    {
      "error": "Item not found"
    }
    ```

### Update Item
- **PUT** `/api/items/:id`
- **Request Body**:
  ```json
  {
    "name": "Updated Item Name",
    "description": "Updated Item Description"
  }
  ```

- **Response**:
  - **200 OK**
    ```json
    {
      "_id": "item_id",
      "name": "Updated Item Name",
      "description": "Updated Item Description"
    }
    ```

  - **404 Not Found**
    ```json
    {
      "error": "Item not found"
    }
    ```

### Patch Item
- **PATCH** `/api/items/:id`
- **Request Body** (partial updates):
  ```json
  {
    "name": "Partially Updated Name"
  }
  ```

- **Response**:
  - **200 OK**
    ```json
    {
      "_id": "item_id",
      "name": "Partially Updated Name",
      "description": "Item Description"
    }
    ```

### Delete Item
- **DELETE** `/api/items/:id`
- **Response**:
  - **200 OK**
    ```json
    {
      "message": "Item deleted successfully"
    }
    ```

  - **404 Not Found**
    ```json
    {
      "error": "Item not found"
    }
    ```






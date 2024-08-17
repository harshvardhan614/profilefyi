# E-Commerce Cart Application

I added the backend code to store cart user data but Facing some issues in storing cart data with the clerk user data model. This project is an E-Commerce Cart Application built using Next.js with TypeScript, Clerk for authentication, and MongoDB for database storage. The application allows users to manage their shopping cart, and stores cart data persistently across sessions for authenticated users.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Setup with Ngrok](#api-setup-with-ngrok)
- [Project Structure](#project-structure)
- [Functionality](#functionality)
- [License](#license)

## Technologies Used

- **Next.js**: React framework for building server-side rendered applications.
- **TypeScript**: Typed superset of JavaScript that provides static type checking.
- **Clerk**: Authentication service to manage users and sessions.
- **MongoDB**: NoSQL database for storing user and cart data.

## Features

- **User Authentication**: Secure user sign-up, sign-in, and session management using Clerk.
- **Persistent Cart Storage**: Cart data is stored in MongoDB, ensuring persistence across user sessions.
- **Cart Management**: Users can add, remove, and update the quantity of items in their cart.
- **API Integration**: Server-side APIs are used to interact with the MongoDB database for CRUD operations on the cart.
- **State Management**: Cart state is managed using React Context API.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (locally or through MongoDB Atlas)
- Ngrok (for exposing local servers to the internet)

### Installation

1. **Clone the Repository**:
   ```bash
   https://github.com/harshvardhan614/profilefyi
   cd profilefyi

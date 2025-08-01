# Coupon & Reward Management System

A full-stack web application for managing coupons, rewards, users, and user points. This system allows administrators to create and manage coupons and rewards while tracking user activities and points.

## 🚀 Features

- **User Management**: Create, view, update, and delete user accounts
- **Coupon Management**: Create and manage discount coupons with various parameters
- **Reward Management**: Set up and manage reward programs
- **Points System**: Track and manage user points and transactions
- **Authentication**: Secure login system for users
- **Responsive UI**: Modern React-based frontend with intuitive navigation

## 🛠️ Technology Stack

### Backend

- **Framework**: Spring Boot 3.5.4
- **Language**: Java 17
- **Database**: MySQL 8
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven
- **Additional Dependencies**:
  - Spring Boot Starter Web
  - Spring Boot Starter Data JPA
  - Spring Boot Starter Validation
  - MySQL Connector
  - Spring Boot DevTools

### Frontend

- **Framework**: React 19.1.1
- **Language**: JavaScript
- **Routing**: React Router DOM 7.7.1
- **HTTP Client**: Axios 1.11.0
- **Build Tool**: React Scripts 5.0.1
- **Testing**: Jest, React Testing Library

## 📁 Project Structure

```
Coupon_Reward/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/springboot/backend/
│   │   │   │       ├── BackendApplication.java
│   │   │   │       ├── controller/         # REST Controllers
│   │   │   │       │   ├── CouponController.java
│   │   │   │       │   ├── RewardController.java
│   │   │   │       │   ├── UserController.java
│   │   │   │       │   └── UserPointsController.java
│   │   │   │       ├── model/              # Entity Classes
│   │   │   │       │   ├── Coupon.java
│   │   │   │       │   ├── Reward.java
│   │   │   │       │   ├── User.java
│   │   │   │       │   └── UserPoints.java
│   │   │   │       ├── repository/         # JPA Repositories
│   │   │   │       └── service/            # Business Logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                          # Unit Tests
│   └── pom.xml                           # Maven Configuration
│
└── frontend/                   # React Frontend
    ├── public/                 # Public Assets
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   └── LoginPage.js           # User Authentication
    │   │   ├── Pages/
    │   │   │   ├── HomePage.js            # Dashboard/Home
    │   │   │   ├── CouponPage.js          # Coupon Management
    │   │   │   ├── RewardPage.js          # Reward Management
    │   │   │   ├── UserPage.js            # User Management
    │   │   │   └── UserPointsPage.js      # Points Management
    │   │   └── Shared/
    │   │       └── Navbar.js              # Navigation Component
    │   ├── styles/                        # CSS Stylesheets
    │   ├── App.js                         # Main App Component
    │   └── index.js                       # Entry Point
    └── package.json                       # NPM Configuration
```

## 🔧 Prerequisites

Before running this application, make sure you have the following installed:

- **Java 17 or higher**
- **Node.js 16 or higher**
- **MySQL 8.0 or higher**
- **Maven 3.6 or higher** (or use the included Maven wrapper)

## ⚙️ Setup Instructions

### Database Setup

1. Install and start MySQL server
2. Create a new database:
   ```sql
   CREATE DATABASE couponreward;
   ```
3. Update database credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/couponreward
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```cmd
   cd backend
   ```

2. Install dependencies and run the application:
   ```cmd
   mvnw clean install
   mvnw spring-boot:run
   ```
   
   Or if you have Maven installed globally:
   ```cmd
   mvn clean install
   mvn spring-boot:run
   ```

3. The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```cmd
   cd frontend
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Start the development server:
   ```cmd
   npm start
   ```

4. The frontend application will open in your browser at `http://localhost:3000`

## 🌐 API Endpoints

The backend provides RESTful APIs for:

- **Users**: `/api/users` - CRUD operations for user management
- **Coupons**: `/api/coupons` - CRUD operations for coupon management
- **Rewards**: `/api/rewards` - CRUD operations for reward management
- **User Points**: `/api/userpoints` - Operations for managing user points

## 📱 Application Features

### User Management

- View all users in a table format
- Add new users with validation
- Update existing user information
- Delete users from the system

### Coupon Management

- Create discount coupons with expiry dates
- View all active and expired coupons
- Edit coupon details
- Manage coupon status

### Reward Management

- Set up reward programs
- Define reward criteria and values
- Track reward redemptions
- Manage reward inventory

### Points System

- Track user points balance
- View points transaction history
- Award points for activities
- Redeem points for rewards

## 🧪 Testing

### Backend Testing

```cmd
cd backend
mvnw test
```

### Frontend Testing

```cmd
cd frontend
npm test
```

## 🚀 Production Deployment

### Backend Build

1. Build the JAR file:

   ```cmd
   mvnw clean package
   ```

2. Run the JAR file:

   ```cmd
   java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```

### Frontend Build

1. Build the production bundle:

   ```cmd
   npm run build
   ```

2. Serve the build folder using a web server

## 👨‍💻 Author

Khanish Suresh

- GitHub: [@Khanishsuresh](https://github.com/Khanishsuresh)
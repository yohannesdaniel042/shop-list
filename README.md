# Shop List

Shop List is a web application that helps users plan their shopping before going to the store. Users can create an account, log in, and create a personal shopping list so they know exactly what they need to buy.

By planning purchases in advance, the application helps users save time and avoid unnecessary or unplanned purchases, helping them save money as well — **two birds with one stone.**
## Features

- User registration and login
- Secure password hashing with bcrypt
- Session-based authentication
- Personal shopping lists for each user
- Add shopping items
- Mark items as completed
- Edit shopping items
- Delete shopping items
- Logout
 ## Technologies Used

- HTML / EJS — for the structure and dynamic pages
- CSS — for styling and layout
- JavaScript — for the application logic
- Node.js — for running JavaScript on the server
- Express.js — used as the backend framework to handle HTTP requests, responses, routes, and server-side logic
- PostgreSQL — used as the database to store users and shopping-list items and perform CRUD operations
- bcrypt — used to hash user passwords before storing them in the database and to securely verify passwords during login
- express-session — used to manage login sessions and identify the currently logged-in user
- Git & GitHub — for version control and project hosting
 ## Installation

Clone the repository:

git clone https://github.com/yohannesdaniel042/shop-list.git

Go into the project folder:

cd shop-list

Install the dependencies:

npm install

Create a `.env` file and add your environment variables.

Start the server:

node index.js
## Database Setup

This project uses PostgreSQL to store user accounts and shopping-list items.

Create a database named `shop-list`, then create the following tables:

### Users table

```sql
CREATE TABLE USERS(
    ID SERIAL PRIMARY KEY,
    NAME TEXT,
    EMAIL TEXT UNIQUE,
    PASSWORD TEXT
);
```

### Items table

sql
CREATE TABLE ITEMS(
    ID SERIAL PRIMARY KEY,
    ITEMNAME TEXT,
    USER_ID INT,
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
    COMPLETED BOOLEAN DEFAULT FALSE
);

The `USER_ID` column connects each shopping item to the user who created it. This allows each user to have their own personal shopping list.
## Project Structure

```text
Shop-list/
├── public/
│   └── style.css
├── views/
│   ├── index.ejs
│   ├── register.ejs
│   ├── login.ejs
│   ├── shop-list.ejs
│   └── edit-item.ejs
├── index.js
├── package.json
├── package-lock.json
└── .gitignore
```

### Main Files

* `index.js` — contains the server, routes, authentication, database queries, and application logic.
* `views/` — contains the EJS pages displayed to users.
* `public/style.css` — contains the styling for the application.
* `package.json` — contains project information and dependencies.
* `.gitignore` — prevents files such as `.env` and `node_modules` from being uploaded to GitHub.
## How It Works

1. **Register** — A new user creates an account using their name, email, and password.
2. **Password Security** — The password is hashed with bcrypt before being stored in the database.
3. **Login** — The user enters their email and password. bcrypt verifies the password.
4. **Session** — After successful login, the user's ID is stored in a session so the application knows which user is logged in.
5. **Personal Shopping List** — The application retrieves only the shopping items belonging to the logged-in user.
6. **Add Items** — Users can add new items to their shopping list.
7. **Complete Items** — Users can mark items as completed when they have bought them.
8. **Edit Items** — Users can change the name of an existing item.
9. **Delete Items** — Users can remove items from their shopping list.
10. **Logout** — The user's session is destroyed when they log out.
## Installation

### 1. Clone the repository

git clone https://github.com/yohannesdaniel042/shop-list.git


### 2. Open the project folder


cd shop-list

### 3. Install dependencies


npm install

### 4. Set up environment variables

Create a `.env` file in the project root and add:


DB_PASSWORD=your_postgresql_password
SESSION_SECRET=your_session_secret


### 5. Set up PostgreSQL

Create a PostgreSQL database named `shop-list` and create the required `users` and `items` tables described in the **Database Setup** section.

### 6. Start the application

node index.js

The application will run on:
http://localhost:3000
## Author

**Yohannes Daniel Alemayehu**

This project was created as part of my full-stack web development learning journey.



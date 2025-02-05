
---

# Letterbox

**Letterbox** is a modern movie review and social networking web application built with Node.js, Express, MySQL, Sequelize, and EJS. It offers secure user authentication using JWT, dynamic movie listings with reviews and comments, social features such as friend management, and a dedicated admin panel for managing users, movies, and comments.

---

## Features

- **User Authentication:**
    - Secure login/signup using JSON Web Tokens (JWT) with bcryptjs for password hashing.
    - Tokens are stored in cookies for route protection.

- **Movie Reviews & Listings:**
    - View, search, and review movies.
    - Submit comments and ratings for movies.

- **Social Networking:**
    - Add friends and see their activities.
    - Self-referencing many-to-many relationships for friend connections.

- **Admin Panel:**
    - Manage users, movies, and comments through a dedicated admin interface.
    - CRUD operations for efficient content and user management.

- **Responsive UI:**
    - Designed with Bootstrap (including RTL support) for a modern and responsive experience.

- **RESTful API Endpoints:**
    - API endpoints for CRUD operations on users, movies, and comments.

---

## Technologies

- **Backend:** Node.js, Express
- **Database & ORM:** MySQL, Sequelize
- **Authentication:** JWT, bcryptjs
- **Templating:** EJS
- **Front-end:** HTML5, CSS3, Bootstrap 5
- **Environment Management:** dotenv

---

## Project Structure

```
Letterbox/
├── config/
│   └── database.js         # MySQL connection using mysql2 and Sequelize
├── middlewares/
│   └── auth.js             # JWT authentication middleware
│   └── checkAdmin.js       # Middleware for admin authorization
├── models/
│   ├── User.js             # User model definition
│   ├── Movie.js            # Movie model definition
│   ├── Relationship.js     # Many-to-many join table for user-movie relationships
│   └── Friend.js           # Self-referencing many-to-many for friends
├── public/
│   ├── css/                # Custom CSS files
│   └── js/                 # Client-side JavaScript files
├── routes/
│   ├── auth.js             # Routes for login, signup, and logout
│   ├── movies.js           # Routes for movie-related operations
│   └── user.js             # Routes for user profile and friend management
├── views/
│   ├── admin.ejs           # Admin panel view
│   ├── dashboard.ejs       # User dashboard view
│   ├── login.ejs           # Login page
│   ├── signup.ejs          # Signup page
│   └── ...                 # Other view templates
├── .env                    # Environment configuration file
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation (this file)
```

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/letterbox.git
   cd letterbox
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the project root with the following content (adjust as needed):
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=letterbox
   JWT_SECRET=your_secret_key
   ```

4. **Database Setup:**
    - Ensure you have MySQL installed and create a database named `letterbox`.
    - Sync your Sequelize models with the database. You can run a script that calls:
      ```js
      sequelize.sync({ alter: true });
      ```
      This will update your tables without losing data (use `{ force: true }` only if you want to drop and recreate tables during development).

---

## Running the Project

Start the server with:
```bash
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
- Visit `/auth/login` to log in.
- Visit `/auth/signup` to register.
- After logging in, users are redirected to their dashboard.
- Admin users can access the admin panel at `/admin` (make sure the admin middleware is properly configured).

---

## How It Works

### Authentication & Authorization
- **User Login:**  
  When a user logs in, the server verifies the password and creates a JWT token that includes the user's ID, email, and `is_admin` flag.

- **Protected Routes:**  
  The `auth` middleware protects routes by checking for a valid JWT in cookies. An additional `checkAdmin` middleware ensures that only admin users can access the `/admin` routes.

### Admin Panel
- **Admin Middleware:**  
  The middleware checks if the logged-in user has the `is_admin` flag set to true. If not, the user is denied access.

- **CRUD Operations:**  
  The admin panel uses dedicated Express routes to manage users, movies, and comments. Client-side JavaScript functions (using `fetch`) call these API endpoints for actions such as update, delete, and add.

### Frontend Views
- **EJS Templates:**  
  Dynamic pages like `admin.ejs`, `dashboard.ejs`, `login.ejs`, and `signup.ejs` render data from the server.

- **Responsive Design:**  
  The UI leverages Bootstrap 5 (with RTL support where needed) to provide a modern and responsive design.

---

## Customization & Contribution

- **Customizing the UI:**  
  Update the EJS templates in the `views/` folder and the CSS in `public/css/` to match your desired design.

- **Extending Functionality:**  
  Add new routes or modify existing ones in the `routes/` folder. Update Sequelize models in `models/` if additional fields or relationships are required.

- **Contributing:**  
  Contributions are welcome! Fork the repository, create a feature branch, make your changes, and open a pull request. For any issues, please open an issue on GitHub.

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or suggestions, please open an issue or contact [your-email@example.com].

---

This README provides a complete overview of the project’s setup, features, and structure. Feel free to tweak the wording and sections to better suit your project’s details and your team’s workflow. Enjoy coding!
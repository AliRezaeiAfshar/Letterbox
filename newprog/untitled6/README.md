### **📌 Movie Management Project - README**


## **📂 Project Structure**
```
📦 Project
 ┣ 📂 config/         # Configuration files (Database connection)
 ┣ 📂 controllers/    # Controllers for authentication and movie management
 ┣ 📂 middlewares/    # Middleware (e.g., JWT authentication)
 ┣ 📂 models/         # Database models (User, Movie)
 ┣ 📂 routes/         # Routes for authentication and movie management
 ┣ 📂 views/          # Handlebars templates for rendering pages
 ┣ 📜 server.js       # Main server file
 ┣ 📜 package.json    # Project dependencies
 ┣ 📜 .env            # Environment variables (Database URI, JWT secret)
 ┗ 📜 README.md       # This file! 😃
```

---

## **🛠 Prerequisites**
Before running the project, ensure you have the following installed:

✅ **[Node.js](https://nodejs.org/) (Version 14 or later)**  
✅ **MongoDB (Local or Cloud - e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))**  
✅ **API testing tool like [Postman](https://www.postman.com/) or `curl`**

---

## **📥 Installation & Running the Project**



### **1️⃣ Download the Project**
- Download the project as a **ZIP file** and extract it.
- Open the extracted folder in your terminal or command prompt.

```sh
cd movie-management
```

---


### **2️⃣ Install Dependencies**
Using npm or yarn:
```sh
npm install
# or
yarn install
```

---

### **3️⃣ Set Up Environment Variables (`.env`)**
Create a `.env` file in the root directory and add the following:
```
MONGO_URI=mongodb://localhost:27017/moviedb  # Or your MongoDB Atlas URI
JWT_SECRET=your_secret_key_here
PORT=3000
```

> **📌 Note:** Replace `MONGO_URI` with your database connection string.

---

### **4️⃣ Start MongoDB**
**If using local MongoDB, run:**
```sh
mongod
```
**For MongoDB Atlas, skip this step.**

---

### **5️⃣ Start the Server**
```sh
npm start 
#or
node server.js
# or for development mode (requires nodemon)
npm run dev
```
> **📌 Tip:** `npm run dev` enables auto-restart on code changes.

---

## **🔗 API Endpoints (Use Postman or CURL)**

### **🧑‍💻 Authentication**
✅ **Signup**
```http
POST /api/auth/signup
Content-Type: application/json
{
  "email": "test@example.com",
  "password": "123456"
}
```

✅ **Login**
```http
POST /api/auth/login
Content-Type: application/json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### **🎬 Movie Management**
✅ **📌 Create a Movie (🔒 Requires Authentication)**
```http
POST /api/movies
Authorization: Bearer <your_token_here>
Content-Type: application/json
{
  "name": "Inception",
  "description": "A mind-bending thriller",
  "image": "https://example.com/inception.jpg"
}
```

✅ **📌 Get All Movies**
```http
GET /api/movies
```

✅ **📌 Get My Movies (🔒 Requires Authentication)**
```http
GET /api/movies/my
Authorization: Bearer <your_token_here>
```

✅ **📌 Update a Movie (🔒 Requires Authentication)**
```http
PUT /api/movies/:id
Authorization: Bearer <your_token_here>
Content-Type: application/json
{
  "name": "Inception - Updated"
}
```

✅ **📌 Delete a Movie (🔒 Requires Authentication)**
```http
DELETE /api/movies/:id
Authorization: Bearer <your_token_here>
```

---

## **🎭 Access the Web Interface**
1. **Open the homepage in your browser:**
   ```
   http://localhost:3000/
   ```
2. **View a specific movie’s details:**
   ```
   http://localhost:3000/movies/:id/details
   ```
   *(Replace `:id` with a valid movie ID.)*

---

## **🐛 Debugging & Troubleshooting**
**📌 If the server fails to start:**
- Ensure **MongoDB** is running.
- Check the `MONGO_URI` value in `.env`.
- Reinstall dependencies:
  ```sh
  npm install
  ```

**📌 If API requests return 401 (Unauthorized):**
- Ensure you include the **JWT token** in the `Authorization` header.

---

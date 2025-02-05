require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

connectDB(process.env.MONGO_URI);

app.get("/", async (req, res) => {
    const Movie = require("./models/Movie");
    try {
        const movies = await Movie.find().sort({ createdAt: -1 }).lean();
        res.render("home", {
            title: "My IMDB-like Site",
            movies,
        });
    } catch (error) {
        console.error("Home page error:", error);
        res.status(500).send("Server error");
    }
});

app.get("/movies/:id/details", async (req, res) => {
    const Movie = require("./models/Movie");
    try {
        const movie = await Movie.findById(req.params.id).lean();
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        res.render("movieDetails", {
            title: movie.name,
            movie,
        });
    } catch (error) {
        console.error("Movie details error:", error);
        return res.status(500).send("Server error");
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));



//-----
app.engine("handlebars", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));


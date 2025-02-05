const { v4: uuidv4 } = require("uuid"); // For unique UIDs
const Movie = require("../models/Movie");

exports.createMovie = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const userId = req.userId; // Provided by authMiddleware

        if (!name || !description || !image) {
            return res
                .status(400)
                .json({ error: "Name, description, and image are required." });
        }

        const newMovie = new Movie({
            uid: uuidv4(), // unique UID
            name,
            description,
            image,
            createdBy: userId,
        });
        await newMovie.save();

        return res.status(201).json({ message: "Movie created.", movie: newMovie });
    } catch (error) {
        console.error("Create movie error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        // Sort in the order they were created (descending by createdAt or ascending)
        const movies = await Movie.find().sort({ createdAt: -1 });
        return res.status(200).json(movies);
    } catch (error) {
        console.error("Get movies error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

exports.getMyMovies = async (req, res) => {
    try {
        const userId = req.userId;
        const myMovies = await Movie.find({ createdBy: userId }).sort({ createdAt: -1 });
        return res.status(200).json(myMovies);
    } catch (error) {
        console.error("Get my movies error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const { name, description, image } = req.body;
        const userId = req.userId;

        const movie = await Movie.findOne({ _id: movieId });
        if (!movie) {
            return res.status(404).json({ error: "Movie not found." });
        }

        // Check movie ownership
        if (movie.createdBy.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to edit this movie." });
        }

        // Update fields
        movie.name = name ?? movie.name;
        movie.description = description ?? movie.description;
        movie.image = image ?? movie.image;

        await movie.save();

        return res.status(200).json({ message: "Movie updated.", movie });
    } catch (error) {
        console.error("Update movie error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const userId = req.userId;

        const movie = await Movie.findOne({ _id: movieId });
        if (!movie) {
            return res.status(404).json({ error: "Movie not found." });
        }

        if (movie.createdBy.toString() !== userId) {
            return res
                .status(403)
                .json({ error: "Not authorized to delete this movie." });
        }

        await movie.remove();
        return res.status(200).json({ message: "Movie deleted." });
    } catch (error) {
        console.error("Delete movie error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

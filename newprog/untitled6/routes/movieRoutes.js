const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.get("/my", authMiddleware, movieController.getMyMovies);
router.put("/:id", authMiddleware, movieController.updateMovie);
router.delete("/:id", authMiddleware, movieController.deleteMovie);

module.exports = router;

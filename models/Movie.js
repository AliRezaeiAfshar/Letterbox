const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Movie = sequelize.define('Movie', {
    movie_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
    },
    release_year: {
        type: DataTypes.INTEGER,
    },
    avg_rating: {
        type: DataTypes.DECIMAL(3, 2),
    },
    poster: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Movie',
    timestamps: false,
});

module.exports = Movie;
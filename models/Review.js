const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Review;
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');
const Movie = require('./Movie');

const Relationship = sequelize.define('Relationship', {
    relationship_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
    movie_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Movie,
            key: 'movie_id',
        },
        onDelete: 'CASCADE',
    },
    rate: {
        type: DataTypes.DECIMAL(3, 2),
    },
    text: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'Relationship',
    timestamps: false,
});

module.exports = Relationship;
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Friend = sequelize.define('Friend', {
    user_id1: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
    user_id2: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'Friend',
    timestamps: false,
});

module.exports = Friend;
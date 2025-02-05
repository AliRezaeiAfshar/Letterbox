const User = require('./User');
const Movie = require('./Movie');
const Relationship = require('./Relationship');
const Friend = require('./Friend');

// User and Movie have a many-to-many relationship through Relationship
User.belongsToMany(Movie, { through: Relationship, foreignKey: 'user_id' });
Movie.belongsToMany(User, { through: Relationship, foreignKey: 'movie_id' });

// User has a self-referencing many-to-many relationship through Friend
User.belongsToMany(User, {
    through: Friend,
    as: 'Friends',
    foreignKey: 'user_id1',
    otherKey: 'user_id2',
});

module.exports = { User, Movie, Relationship, Friend };
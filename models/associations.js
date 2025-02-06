const User = require('./User');
const Movie = require('./Movie');
const Relationship = require('./Relationship');
const Friend = require('./Friend');
const Review = require('./Review');
const Comment = require('./Comment');

// User and Movie have a many-to-many relationship through Relationship
User.belongsToMany(Movie, { through: Relationship, foreignKey: 'user_id' });
Movie.belongsToMany(User, { through: Relationship, foreignKey: 'movie_id' });

User.hasMany(Review, { foreignKey: 'userId', as: 'Reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'User' });

Movie.hasMany(Review, { foreignKey: 'movieId', as: 'Reviews' });
Review.belongsTo(Movie, { foreignKey: 'movieId', as: 'Movie' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'Comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'User' });

Movie.hasMany(Comment, { foreignKey: 'movieId', as: 'Comments' });
Comment.belongsTo(Movie, { foreignKey: 'movieId', as: 'Movie' });

// User has a self-referencing many-to-many relationship through Friend
User.belongsToMany(User, {
    through: Friend,
    as: 'Friendships',  // Alias for clarity
    foreignKey: 'user_id1',
    otherKey: 'user_id2',
});

User.belongsToMany(User, {
    through: Friend,
    as: 'FriendOf',  // Inverse alias
    foreignKey: 'user_id2',
    otherKey: 'user_id1',
});

module.exports = { User, Movie, Relationship, Friend, Review, Comment };
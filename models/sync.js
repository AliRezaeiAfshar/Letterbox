const sequelize = require('./index');
const { User, Movie, Relationship, Friend, Comment, Review } = require('./associations');

(async () => {
    try {
        // Sync all models
        await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
        console.log('All models were synchronized successfully.');
    } catch (err) {
        console.error('Error syncing models:', err);
    } finally {
        sequelize.close();
    }
})();
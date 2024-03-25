const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // import sequelize connection

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced successfully');
}).catch(err => {
  console.error('Unable to sync database:', err);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

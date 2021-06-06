const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

//Initialize app to create a port
const app = express();
const PORT = process.env.PORT || 3000;

//sets up body parsing to route our middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//start the server on our port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
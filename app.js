const express = require("express");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded( { extended: true } ))
// app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

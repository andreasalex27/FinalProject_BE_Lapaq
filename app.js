const express = require("express");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
const cookieParser =require('cookie-parser')
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(express.json());
app.use(cookieParser())
app.use(routes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

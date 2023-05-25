require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 
app.use('/assets', express.static('assets'))

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
 
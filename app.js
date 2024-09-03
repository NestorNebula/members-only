const express = require('express');
require('dotenv').config();
const path = require('node:path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
app.listen(PORT);

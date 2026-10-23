const express = require('express');
const config = require("./config");
const bodyParser = require("body-parser");
const path = require('path');
const userRouter = require("./router/userRouter");

const app = express();
const PORT = config.port;

// Middleware to parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));

// Define a basic route
// app.get('/', (req, res) => {
//   res.json({ message: 'Hello, Express is running!' });
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use("/", adminRoute);
app.use("/", userRouter);

app.use(function (req, res, next) {
    res.render("partials/404");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
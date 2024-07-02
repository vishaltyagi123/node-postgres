const express = require("express");
const passport = require('passport');
const session = require('express-session');
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const cors = require("cors");
const { PORT } = require("./utils/utils.config.js");
const connectionPool = require("./utils/utils.db");
require('./google-auth.js');

// Postgres Connection
connectionPool.connect((err) => {
  if (err) console.log(err);
  console.log("Postgres connected");
});

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const app = express();

app.use(session({
  secret: 'googleauthsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile('public/index.html', {root: path.dirname(__dirname)});
});

// google Authentication
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile']}
));

app.get('/auth/google/success', isLoggedIn, (req, res) => {
  res.json({"user":req.user});
});

app.get('/auth/google/failure', (req, res) => {
  res.json('failure');
});

app.get('/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  })
);

app.use("/api/v1", userRouter);
app.use("/api/auth", authRouter);

// app.get("*", (req, res, next) => {
//   res.status(404).json({
//     status: false,
//     statusCode: 404,
//     mmessage: "Page Not Found",
//   });
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Error";
  res.status(statusCode).json({
    status: false,
    statusCode,
    message,
  });
});

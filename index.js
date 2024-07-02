const express = require('express')
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const cors = require('cors')
const {PORT} = require('./utils/utils.config.js');
const connectionPool = require('./utils/utils.db');

// Postgres Connection
connectionPool.connect((err) => {
  if (err) console.log(err);
  console.log('Postgres connected');
});

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});

app.use('/api/v1', userRouter);
app.use('/api/auth', authRouter);

app.get("*", (req, res, next) => {
  res.status(404).json({
    status: false,
    statusCode:404,
    mmessage:'Page Not Found'
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message    = err.message || "Internal Error";
  res.status(statusCode).json({
    status: false,
    statusCode,
    message
  });
});
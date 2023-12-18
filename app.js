const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const  connectDB = require('./config/database.js');
const cookieParser= require( 'cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const userRoutes = require('./routes/userRoutes.js');
const sendEmail = require('./routes/sendEmail.js')
const cors = require('cors')
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api',sendEmail)

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, 'frontend', 'dist')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
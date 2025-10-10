require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

const cors = require('cors');
app.use(cors());

app.use('/api', petRouter);
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to DB');
    const PORT = 4000;
    app.listen(4000, '0.0.0.0', () => {
  console.log("Server running on port 4000");
});

  })
  .catch((err) => {
    console.error(err);
  });

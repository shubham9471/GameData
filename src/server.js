const express = require('express');
const mongoose = require('mongoose')
const mysql = require('mysql');
var bodyParser = require('body-parser');
const gameRoutes = require('../src/routes/gameRoutes')
const usersRoutes = require('../src/routes/userRoutes')
// var multer = require('multer') 
const { publishEvent } = require('./EventFiles/eventPublisher');
const { subscribeToEvents } = require('./EventFiles/eventSubscriber');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// SQL DATABASE CONNECTION

const db = mysql.createConnection({
    host: 'localhost',
    user: 'mysql_user',
    password: 'mysql_password',
    database: 'userDatabase'
  });
  
  db.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MySQL Connected');
    }
  });


// THE MONGODB LINK
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/gameDataBase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))


// Publish an event when a user registers

app.post('/register', async (req, res) => {
  // Your user registration logic goes here...

  // After successfully registering a user, publish an event
  publishEvent('user_registered', { username: req.body.username, email: req.body.email });

  res.status(201).json({ message: 'Registration successful' });
});

// // Start the event subscriber
subscribeToEvents();
app.get('/', (req, res) => {
      res.send('Hello World!')
})
app.use("/game", gameRoutes);
app.use("/user", usersRoutes);



app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});
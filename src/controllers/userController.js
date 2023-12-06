const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Registration endpoint

const createUser =  async (req, res) => {
  const { username, email, password } = req.body;
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: `Registration failed, ${err}` });
    } else {
      res.status(201).json({ message: 'Registration successful' });
    }
  });
};

// Authentication endpoint
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Authentication failed' });
    } else if (results.length > 0 && await bcrypt.compare(password, results[0].password_hash)) {
      const token = jwt.sign({ userId: results[0].id }, 'secret_key', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};

module.exports.loginUser = loginUser
module.exports.createUser = createUser
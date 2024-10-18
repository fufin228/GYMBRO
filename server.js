const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Добавь это
const app = express();
const port = 3000;

// Подключение к базе данных
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Имя пользователя MySQL
  password: '', // Пароль MySQL
  database: 'gymbro' // Имя базы данных
});

db.connect((err) => {
  if (err) {
    console.log('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключение успешно!');
  }
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // Добавь это

// Обработка логина (запрос с формы логина)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  db.query(query, (err, results) => {
    if (err) {
      return res.send('Ошибка при выполнении запроса.');
    }
    if (results.length > 0) {
      res.send('Успешный логин!');
    } else {
      res.send('Неверный логин или пароль.');
    }
  });
});

// Обработка регистрации (запрос с формы регистрации)
app.post('/register', (req, res) => {
  const { fullName, phone, email, password } = req.body;
  const query = `INSERT INTO users (fullName, phone, email, password) VALUES ('${fullName}', '${phone}', '${email}', '${password}')`;

  db.query(query, (err, result) => {
    if (err) {
      res.send('Ошибка регистрации: ' + err.message);
    } else {
      res.send('Регистрация успешна!');
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});


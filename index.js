const express = require('express');
const header = ``;

const CONFIG = require('./config/config');

const { generateMainPageBody } = require('./utils/generateMainPageBody');

const keyRoutes = require('./routes/keys');
const authorRoutes = require('./routes/autor');
const tabRoutes = require('./routes/tab');
const studentRoutes = require('./routes/student');
const classRoutes = require('./routes/class');
const lectureRoutes = require('./routes/lecturer');
const luaRoutes = require('./routes/lua');

const { redis } = require('./DB/redis.js');
const { buildHtml } = require('./utils/buildHtml');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  redis.get(`aplikacja`, (err, app) => {
    redis.get(`uczelnia`, (err, univercity) => {
      redis.get(`autor`, (err, author) => {
        redis.get(`indeks`, (err, idx) => {
          const body = generateMainPageBody(app, univercity, author, idx);
          res.send(buildHtml(req, header, body));
        });
      });
    });
  });
});

//4.1
//odczyt pojedynczych danych
app.use(authorRoutes);

//4.2
//odczyt dwóch lub więcej kluczy dla jednego adresu URL
app.use(keyRoutes);

//4.3
app.use(tabRoutes);

//4.4
//wykorzystanie parametru w adresie URL
app.use(studentRoutes);

//4.5
//wykorzystanie przetwarzania potokowego z pakietu ioredis (Pipelining)
app.use(lectureRoutes);

//4.6
//Lua
app.use(luaRoutes);

//4.7.1
//formularz pozwalający na dodawanie/aktualizację danych w bazie
//z wykorzystaniem metody GET -> metody sterownika / createStudent / createForm

//4.7.2
//formularz pozwalający na dodawanie/aktualizację danych w bazie
//z  wykorzystaniem metody POST
app.use(classRoutes);

//4.8
/*
wykorzystanie przetwarzania potokowego z jakimś złączeniem, czyli
przynajmniej dwa potoki -> metoda strownika / getLecturerClasses
*/

app.listen(CONFIG.port, () => {
  console.log('Aplikacja została uruchomiona na porcie 8080!');
});

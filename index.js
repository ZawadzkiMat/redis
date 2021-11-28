const express = require('express');
const header = ``;

const CONFIG = require('./config/config');
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

const STUDENT_MOCK = [
  { id: 127999 },
  { id: 124785 },
  { id: 38601 },
  { id: 128487 },
  { id: 125486 },
  { id: 128201 },
];

const generateStudentsListWithHrefs = () => {
  return STUDENT_MOCK.map((s) => {
    return `<a href="/student/${s.id}">Student ${s.id}</a><br></br>`;
  });
};

app.get('/', (req, res) => {
  redis.get(`aplikacja`, (err, app) => {
    redis.get(`uczelnia`, (err, uczelnia) => {
      redis.get(`autor`, (err, autor) => {
        redis.get(`indeks`, (err, idx) => {
          const body = `
                        <center>
                            <h1>${app}</h1>
                            <img height="10%" width="10%" src='https://pcz.pl/fcp/aGBUKOQtTKlQhbx08SlkTUQdKUWRuHQwFDBoIVURNFDgPW1ZpCFghUHcKVigEQR1BXQEsKTwdAQsKJBVYCRlYdxdFDy5IGzpEMEIrMQxBC0EGRUtwf08Q/_users/code_YCFYXIghYYUQ6UhciCQgDI0QRCWY8AQ/kamila/logo/logo_paczka/logo_pl/pcz_logo_piol_pion_kolor.png'>
                            <h1 style="color:red"}> ${uczelnia}</h1>
                            <h1>${autor} - ${idx}</h1>
                            <h2>Zadanie 4</h2>
                            <a href="/autor">4.1 Autor</a><br><br>
                            <a href="/keys">4.2 Klucze</a><br><br>
                            <a href="/tab">4.3 Tablica</a><br><br>
                            4.4 Studenci<br>
                            ${generateStudentsListWithHrefs()}
                            <a href="/wykladowcy_nazwiska">4.5 Nazwiska prowadzących</a><br><br>
                            <a href="/lua">4.6 Skrypt LUA</a><br><br>
                            4.7 Formularze<br>
                            <a href="/new_student"> Dodawanie studenta (GET)</a><br>
                            <a href="/add_class">Dodawanie zajęć (POST)</a><br><br>
                            <a href="/wykladowcy_przedmioty">
                            4.8 Aktywni nauczyciele</a><br><br>
                        </center>`;

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

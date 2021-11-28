var express = require('express');
var app = express();
var header = ``;
const CONFIG = require('./config/config');
const keyRoutes = require('./routes/keys');
const authorRoutes = require('./routes/autor');
const tabRoutes = require('./routes/tab');
const studentRoutes = require('./routes/student');
const lectureRoutes = require('./routes/lecturerSurname');
const luaRoutes = require('./routes/lua');

const { redis } = require('./DB/redis.js');
const { buildHtml } = require('./utils/buildHtml');


app.use(express.static(__dirname + '/public'));

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
                            <a href="/student/127999">Student 127999</a><br>
                            <a href="/student/124785">Student 124785</a><br>
                            <a href="/student/38601">Student 38601</a><br>
                            <a href="/student/128487">Student 128487</a><br>
                            <a href="/student/125486">Student 125486</a><br>
                            <a href="/student/128201">Student 128201</a><br><br>
                            <a href="/wykladowcy_nazwiska">4.5 Nazwiska prowadzących</a><br><br>
                            <a href="/lua">4.6 Skrypt LUA</a><br><br>
                            4.7 Formularz dodawania studenta<br>
                            <a href="/new_student"Dodawanie studenta (GET)</a><br>
                            <a href="/add_class">Dodawanie zajęć (POST)</a><br><br>
                            <a href="/wykladowcy_przedmioty">4.8 Aktywni nauczyciele</a><br><br>
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
//z wykorzystaniem metody GET
app.get('/new_student', function (req, res) {
  var form = `
        <form action="/add_student">
            Numer albumu:     <input type="number" name="id" min="10000" max="99999999">   <br>
            Imie:             <input type="text" size="60" name="imie" value="">            <br>
            Nazwisko:         <input type="text" size="60" name="nazwisko" value="">         <br>
            Data urodzenia:   <input type="text" size="60" name="data_uro" value="">      <br>
            Kierunek:         <input type="text" size="60" name="kierunek" value="">  <br>
            <input type="submit" value="Dodaj studenta" >
        </form>
    `;
  body = `${form} <br><br><br> <a href="/">Strona główna</a>`;
  res.send(buildHtml(req, header, body));
});

app.get('/add_student', function (req, res) {
  var key = 'student:' + req.query.id;

  redis.hmset(
    key,
    {
      imie: `${req.query.imie}`,
      nazwisko: `${req.query.nazwisko}`,
      data_uro: `${req.query.data_uro}`,
      kierunek: `${req.query.kierunek}`,
    },
    function (err1) {
      if (err1 == null)
        body = `Student ${req.query.imie} ${
          req.query.nazwisko
        } został poprawnie dodany!<br> Sprawdź studenta: <a href="${key.replace(
          ':',
          '/'
        )}">Dodany student</a><br> <br><br><br> <a href="/">Strona główna</a>`;
      else
        body = `Wystąpił błąd podczas dodawania studenta <br><br><br> <a href="/">Strona główna</a>`;
      res.send(buildHtml(req, header, body));
    }
  );
});

//4.7.2
//formularz pozwalający na dodawanie/aktualizację danych w bazie
//z  wykorzystaniem metody POST
app.get('/add_class', function (req, res) {
  var form = `
        <form action="/add_class_post" method="POST">
            ID przedmiotu:      <input type="number" name="id" min="1" max="999">           <br>
            Nazwa:              <input type="text" size="60" name="nazwa" value="">         <br>
            Krótka nazwa:       <input type="text" size="60" name="skrot" value="">         <br>
            Sala:               <input type="number" name="sala" min="1" max="999"          <br>
            ID wykładowcy:      <input type="number" name="wykladowca" min="1" max="999">   <br>
            USOS ID:            <input type="number" name="usos_id" min="1" max="999">      <br>
            <input type="submit" value="Dodaj przedmiot">
        </form>`;
  body = `${form} <br><br><br> <a href="/">Strona główna</a>`;
  res.send(buildHtml(req, header, body));
});

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));

app.post('/add_class_post', urlencodedParser, function (req, res) {
  var key = 'zajecia:' + req.body.id + ':';

  redis.set(key + 'nazwa', req.body.nazwa, function (err1) {
    redis.set(key + 'skrot', req.body.skrot, function (err2) {
      redis.set(key + 'sala', req.body.sala, function (err2) {
        redis.set(key + 'wykładowca', req.body.wykladowca, function (err2) {
          redis.set(key + 'usos_id', req.body.usos_id, function (err2) {
            if (err1 == null && err2 == null)
              body = `Dodano przedmiot ${req.body.full_name} <br><br><br> <a href="/">Strona główna</a>`;
            else
              body = `Wystąpił jakiś błąd <br><br><br> <a href="/">Strona główna</a>`;
            res.send(buildHtml(req, header, body));
          });
        });
      });
    });
  });
});

//4.8
/*
wykorzystanie przetwarzania potokowego z jakimś złączeniem, czyli
przynajmniej dwa potoki
*/
app.get('/wykladowcy_przedmioty', function (req, res) {
  var wykladowca_id = [];
  var wykladowca = `<table>
        <tr>
        <th>Id</th>
        <th>Nazwisko</th>
        </tr>
    `;

  var pipeline = redis.pipeline();
  var pipeline2 = redis.pipeline();

  redis.keys('zajecia:*:wykladowca', function (err, keys) {
    for (var i = 0; i < keys.length; ++i) {
      pipeline.get(keys[i]);
    }

    pipeline.exec(function (err, result) {
      for (var i = 0; i < result.length; ++i) {
        wykladowca_id[i] = `${result[i][1]}`;

        redis.keys(`wykladowca:${result[i][1]}:nazwisko`, function (err, keys) {
          for (var i = 0; i < keys.length; ++i) {
            pipeline2.get(keys[i]);
          }

          pipeline2.exec(function (err, result) {
            for (var i = 0; i < result.length; ++i)
              wykladowca +=
                `<tr> <td> ` +
                wykladowca_id[i] +
                `</td>` +
                `<td>` +
                result[i][1] +
                `</td>`;
            wykladowca += '</table>';

            body = `${wykladowca} <br><br><br> <a href="/">Strona główna</a>`;
            res.send(buildHtml(req, header, body));
          });
        });
      }
    });
  });
});

app.listen(CONFIG.port, () => {
  console.log('Aplikacja została uruchomiona na porcie 8080!');
});

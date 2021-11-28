const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');
const { createForm } = require('../utils/createForm');

const header = '';

exports.getStudent = (req, res) => {
  redis.hget(`student:${req.params.id}`, `imie`, (err, name) => {
    redis.hget(`student:${req.params.id}`, `nazwisko`, (err, surname) => {
      body = `Imię studenta: ${name}<br> Nazwisko studenta: ${surname} <br><br><br> <a href="/">Strona główna</a>`;
      res.send(buildHtml(req, header, body));
    });
  });
};

exports.getStudents = (req, res) => {
  redis.get(`student`, (err, result) => {
    console.log(result);
    return result;
  });
};

const STUDENT_DICT = [
  { name: 'id', type: 'number', displayName: 'Numer albumu' },
  { name: 'firstName', type: 'text', displayName: 'Imie' },
  { name: 'lastName', type: 'text', displayName: 'Nazwisko' },
  { name: 'birthDate', type: 'text', displayName: 'Data urodzenia' },
  { name: 'fieldOfStudy', type: 'text', displayName: 'Kierunek' },
];

exports.createStudentForm = (req, res) => {
  var form = createForm('/createStudent', STUDENT_DICT);
  body = `${form} <br><br><br> <a href="/">Strona główna</a>`;
  res.send(buildHtml(req, header, body));
};

exports.createStudent = (req, res) => {
  var key = 'student:' + req.query.id;

  const student = {
    imie: `${req.query.firstName}`,
    nazwisko: `${req.query.lastName}`,
    data_uro: `${req.query.birthDate}`,
    kierunek: `${req.query.fieldOfStudy}`,
  };

  redis.hmset(key, student, (err1) => {
    if (!err1)
      body = `Student ${req.query.imie} ${
        req.query.nazwisko
      } został poprawnie dodany!<br> Sprawdź studenta: <a href="${key.replace(
        ':',
        '/'
      )}">Dodany student</a><br> <br><br><br> <a href="/">Strona główna</a>`;
    else
      body = `Wystąpił błąd podczas dodawania studenta <br><br><br> <a href="/">Strona główna</a>`;
    res.send(buildHtml(req, header, body));
  });
};

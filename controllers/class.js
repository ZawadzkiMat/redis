const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');
const { createForm } = require('../utils/createForm');

const header = '';

const CLASS_DICT = [
  { name: 'id', type: 'number', displayName: 'ID przedmiotu' },
  { name: 'name', type: 'text', displayName: 'Nazwa' },
  { name: 'shortName', type: 'text', displayName: 'Krótka nazwa' },
  { name: 'classRoom', type: 'text', displayName: 'Sala' },
  { name: 'lecturerId', type: 'text', displayName: 'ID wykładowcy' },
  { name: 'USOSId', type: 'text', displayName: 'USOS ID' },
];

exports.createClassForm = (req, res) => {
  var form = createForm('/createClass', CLASS_DICT, 'POST');
  body = `${form} <br><br><br> <a href="/">Strona główna</a>`;
  res.send(buildHtml(req, header, body));
};

exports.createClass = (req, res) => {
  const key = 'zajecia:' + req.body.id + ':';

  redis.set(key + 'nazwa', req.body.nazwa, (err1) => {
    redis.set(key + 'skrot', req.body.skrot, (err2) => {
      redis.set(key + 'sala', req.body.sala, (err2) => {
        redis.set(key + 'wykładowca', req.body.wykladowca, (err2) => {
          redis.set(key + 'usos_id', req.body.usos_id, (err2) => {
            if (!err1 && !err2)
              body = `Dodano przedmiot ${req.body.full_name} <br><br><br> <a href="/">Strona główna</a>`;
            else
              body = `Wystąpił jakiś błąd <br><br><br> <a href="/">Strona główna</a>`;
            res.send(buildHtml(req, header, body));
          });
        });
      });
    });
  });
};

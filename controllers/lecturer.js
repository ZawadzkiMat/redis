const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const header = '';

exports.getLecturerSurname = (req, res) => {
  redis.keys('wykladowca:*:nazwisko', function (err, keys) {
    let list = '';
    let wykladowca = '';
    let pipeline = redis.pipeline();

    pipeline.forEach((key) => {
      pipeline.get(keys[i]);
      list += keys[i];
    });

    pipeline.exec((err, result) => {
      result.forEach((res) => {
        wykladowca += `${res[1]} </br>`;
      });

      body = `${wykladowca} <br><br><br> <a href="/">Strona główna</a>`;
      res.send(buildHtml(req, header, body));
    });
  });
};

exports.getLecturerClasses = (req, res) => {
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
    keys.forEach((key) => pipeline.get(key));

    pipeline.exec((err, lecturer) => {
      lecturer.forEach((lecturer) => {
        wykladowca_id.push(lecturer[1]);

        redis.keys(`wykladowca:${lecturer[1]}:nazwisko`, (err, keys) => {
          keys.forEach((key) => {
            pipeline2.get(key);
          });

          pipeline2.exec((err, res2) => {
            res2.forEach((lecturerSurname) => {
              wykladowca +=
                `<tr> <td> ` +
                lecturer[1] +
                `</td>` +
                `<td>` +
                lecturerSurname[1] +
                `</td>`;
              wykladowca += '</table>';

              body = `${wykladowca} <br><br><br> <a href="/">Strona główna</a>`;
              res.send(buildHtml(req, header, body));
            });
          });
        });
      });
    });
  });
};

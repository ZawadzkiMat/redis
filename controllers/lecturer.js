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

    redis.keys('wykladowca:*:nazwisko', function (err, keys) {
      for (var i = 0; i < keys.length; ++i) {
          pipeline.get(keys[i]);
          list += keys[i]
      }

      pipeline.exec(function (err, result) {
          for (var i = 0; i < result.length; ++i) {
            wykladowca += `${result[i][1]} </br>`
          }
          body = `${wykladowca} <br><br><br> <a href="/">Strona główna</a>`
          res.send(buildHtml(req, header, body))
      });
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
                        wykladowca += `<tr> <td> ` + wykladowca_id[i] + `</td>` + `<td>` + result[i][1] + `</td>`;
                    wykladowca += '</table>'

                    body = `${wykladowca} <br><br><br> <a href="/">Strona główna</a>`
                    res.send(buildHtml(req, header, body))
                });
            });
        }
    });
});
};

const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');

const header = '';

exports.getKeys = (req, res) => {
  var list = `<table style="width:30%">
                        <tr>
                        <th>Lp</th>
                        <th>Klucz</th>
                        </tr>
                    `;

  redis.keys('*', function (err, result) {
    for (var i = 0; i < result.length; ++i) {
      list +=
        `<tr>
                    <td> ` +
        (i + 1) +
        `</td>` +
        `<td>` +
        result[i] +
        `</td>`;
    }
    list += `</table>`;

    body = `${list} <br><br><br> <a href="/">Strona główna</a>`;
    res.send(buildHtml(req, header, body));
  });
};

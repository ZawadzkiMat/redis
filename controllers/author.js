const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');

const header = '';

exports.getOneAuthor = (req, res) => {
  redis.get('autor', (err, result) => {
    body = `Autorem sprawozdania jest ${result} <br><br><br> <a href="/">Strona główna</a>`;
    res.send(buildHtml(req, header, body));
  });
};

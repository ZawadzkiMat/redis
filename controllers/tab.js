const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');

const header = '';

exports.readList =  (req, res) =>  {
    redis.zrange(`120484_ocena:MP`, '0', '-1', 'WITHSCORES', (err, result) => {
        body = `${result} <br><br><br> <a href="/">Strona główna</a>`;
        res.send(buildHtml(req, header, body));
    });
}
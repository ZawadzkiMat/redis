const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');

const header = '';
exports.getLecturerSurname = (req, res) => {
    redis.keys('wykladowca:*:nazwisko', function (err, keys) {
        var list = "";
        var wykladowca = "";
        var pipeline = redis.pipeline();

        for (var i = 0; i < keys.length; ++i) {
            pipeline.get(keys[i]);
            list += keys[i]
        }

        pipeline.exec(function (err, result) {
            for (var i = 0; i < result.length; ++i) {
                if (i % 2 != 0) {
                    wykladowca += `${result[i][1]} </br>`;
                } else {
                    wykladowca += `${result[i][1]} </br>`
                }
            }
            body = `${wykladowca} <br><br><br> <a href="/">Strona główna</a>`
            res.send(buildHtml(req, header, body))
        });
    });
}
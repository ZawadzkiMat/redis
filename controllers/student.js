const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');

const header = '';

exports.getStudent = (req, res) => {
    redis.hget(`student:${req.params.id}`, `imie`, (err, name) => {
        redis.hget(`student:${req.params.id}`, `nazwisko`, (err, surname) => {
            body = `Imię studenta: ${name}<br> Nazwisko studenta: ${surname} <br><br><br> <a href="/">Strona główna</a>`
            res.send(buildHtml(req, header, body))
        });
    });
}
const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');

const header = '';

exports.createForm = (req, res) =>{
    var form = `
        <form action="/createStudent">
            Numer albumu:     <input type="number" name="id" min="10000" max="99999999">    <br>
            Imie:             <input type="text" size="60" name="imie" value="">            <br>
            Nazwisko:         <input type="text" size="60" name="nazwisko" value="">        <br>
            Data urodzenia:   <input type="text" size="60" name="data_uro" value="">        <br>
            Kierunek:         <input type="text" size="60" name="kierunek" value="">        <br>
            <input type="submit" value="Dodaj studenta" >
        </form>
    `;
    body = `${form} <br><br><br> <a href="/">Strona główna</a>`
    res.send(buildHtml(req, header, body))
};


exports.createStudent = (req, res) => {
    var key = 'student:' + req.query.id

    redis.hmset(key, {
        imie: `${req.query.imie}`,
        nazwisko: `${req.query.nazwisko}`,
        data_uro: `${req.query.data_uro}`,
        kierunek: `${req.query.kierunek}`,
    },
        function (err1) {
            if (err1 == null)
                body = `Student ${req.query.imie} ${req.query.nazwisko} został poprawnie dodany!<br> Sprawdź studenta: <a href="${key.replace(':', '/')}">Dodany student</a><br> <br><br><br> <a href="/">Strona główna</a>`
            else
                body = `Wystąpił błąd podczas dodawania studenta <br><br><br> <a href="/">Strona główna</a>`
            res.send(buildHtml(req, header, body))
        });
};
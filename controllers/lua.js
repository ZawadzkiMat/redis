const { redis } = require('../DB/redis.js');
const { buildHtml } = require('../utils/buildHtml');

const header = '';

redis.defineCommand('wykladowca_zajecia', {
    numberOfKeys: 0,
    lua: `
        local wykladowca = redis.call('keys', 'wykladowca:*:nazwisko')
        local a, b, c
        local e, f, g
        local final_list = {}

        local zajecia = redis.call('keys', 'zajecia:*:wykladowca')

        for k, v in pairs(wykladowca) do
            a, b, c = string.match(v, "(.*)%:(.*)%:(.*)")
            local zajecia_list = {}
            for l, z in pairs(zajecia) do
            e, f, g = string.match(z, "(.*)%:(.*)%:(.*)")
            local numer_usos = redis.call('get', 'zajecia:'..f..':wykladowca')

            if numer_usos == b then
                table.insert(zajecia_list, redis.call('get', 'zajecia:'..f..':nazwa'))
            end
            end

            final_list[k] = {b,
                        redis.call('get', 'wykladowca:'..b..':imie'),
                        redis.call('get', 'wykladowca:'..b..':nazwisko'), zajecia_list}
        end

        return final_list
    `
});

exports.getInfo = (req, res) =>{
    var list = "";
    redis.wykladowca_zajecia(function (err, result) {
        for (var i = 0; i < result.length; ++i) {
            list += result[i] + '<br>'
        }
        body = `${list} <br><br><br> <a href="/">Strona główna</a>`
        res.send(buildHtml(req, header, body))
    });
};
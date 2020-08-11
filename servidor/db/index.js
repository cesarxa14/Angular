// const pgp = require('pg-promise')
// var db = pgp('postgresql://postgres:password@localhost:5433/crud')

function connectBD() {
    return new Promise(async (resolve, reject) => {
        global.pgp = require("pg-promise")({noWarnings: false});
        const params = {
            user : 'postgres',
            pass : 'chelseafc11',
            host : 'localhost',
            port : '5432',
            bd   : 'crud'
        };
        const __conexion = `postgres://${params.user}:${params.pass}@${params.host}:${params.port}/${params.bd}`;
        global.dbp = global.pgp(__conexion);
        global.dbp.connect();
        console.log('')
        return resolve(true);
    });
}

module.exports = {
    connectBD
}
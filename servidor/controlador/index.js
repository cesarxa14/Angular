const { connectBD } = require('../db/index')

function getDatos() {
    return new Promise( async (resolve, reject) => {
        let sql = `SELECT * FROM trabajadores ORDER BY salario DESC`;
        
        sql = await global.pgp.as.format(sql);
          
        global.dbp.any(sql).then((data) => {
            console.log(data)  
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function getPersona(idPersona) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM trabajadores WHERE id = $1`;
        sql = global.pgp.as.format(sql, [idPersona]);
        global.dbp.one(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            return reject(err);
        });
    });
}

function insertRol(datos) {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO trabajadores (nombres, salario ,estado,cargo,correo) VALUES ($1, $2, $3,$4,$5)`;
        sql = global.pgp.as.format(sql, [datos.nombres, datos.salario, datos.estado, datos.cargo,datos.correo]);
        global.dbp.result(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            return reject(err);
        });
    });
}
function actualizarTabla(datos) {
	return new Promise((resolve, reject) => {
        let sql = `UPDATE trabajadores SET nombres = $2, salario = $3, estado= $4, cargo=$5,correo=$6 WHERE id = $1`;
		const params = [datos.id, datos.nombres, datos.salario, datos.estado, datos.cargo, datos.correo];
		sql = global.pgp.as.format(sql, params);
        global.dbp.result(sql).then(result => {
            if(result.rowCount != 1) return reject({ msj : 'Error al actualizar.', err : result});
            return resolve(result);
        }).catch(err => {
            return reject(err);
        });
    });
}

function eliminar(idPersona){
    
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM trabajadores WHERE id= $1`;
        sql = global.pgp.as.format(sql, [idPersona]);
        global.dbp.result(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            return reject(err);
        });
    });
}


module.exports = {
    getDatos,
    getPersona,
    insertRol,
    actualizarTabla,
    eliminar
}
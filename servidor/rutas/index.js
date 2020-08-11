const { Router} = require('express')
const router = Router();
const { getDatos, getPersona, insertRol , actualizarTabla, eliminar} = require('../controlador/index');
// const { route } = require('./trabajadores');

router.get('/', (req,res) =>{
  res.send('HOME')
})

router.get('/api/trabajadores', async (req,res)=>{
    const filas = await getDatos();
    return res.json(filas)
});

router.get('/api/trabajadores/:id', async (req,res) =>{
    const persona = await getPersona(req.params.id);
    console.log(persona)
    return res.json(persona);

})

router.post('/api/trabajadores', async (req,res) =>{
    console.log(req.body)
    const parametros = {
        nombres : 'Messi',
        salario: 9000,
        estado: 'Medio',
        cargo: 'Coordinador',
        correo: 'lio@hotmail.com'
    }

    const nuevo = await insertRol(req.body);

    return res.json(nuevo)
    
})

router.put('/api/trabajadores/:id', async (req,res) =>{
    console.log(req.body)
    const ID_PERSONA = 2;
    const datos = {
        nombre    : 'Sonia',
        idPersona : ID_PERSONA
    };
    const rpta = await actualizarTabla(req.body);
    return res.json(rpta)
    // console.log('rpta:', rpta.rowCount);
    // CONSULTAR SI ACTUALIZO EL DATO
    // const persona = await getPersona(ID_PERSONA);
    // console.log('persona:', persona);


})

router.post('api/trabajadores/:id', async(req,res) =>{
    
    console.log('rutas')
    console.log(req.body)
    const borrar = await eliminar(req.body.id);
    
    return res.json({mensaje: req})
})


module.exports = router
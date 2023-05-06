const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equiposController');

router.get('/get', async(req, res) => {
    const data = await equiposController.getEquipos(); 
    res.json(data);
});
router.get('/getEquipo/:id', async(req, res) => {
    const id = req.params.id;
    const data = await equiposController.getEquipo(id); 
    res.json(data);
});

router.get('/getTipos', async(req, res) => {
    const data = await equiposController.getTipoEquipos(); 
    res.json(data);
});

router.get('/getMarcas', async(req, res) => {
    const data = await equiposController.getMarcas(); 
    res.json(data);
});

router.get('/getEstados', async(req, res) => {
    const data = await equiposController.getEstados(); 
    res.json(data);
});

router.post('/guardar', async(req, res) => {
    const data = req.body;
    const response = await equiposController.guardarEquipo(data); 
    res.json(response);
});
router.post('/editarEquipo', async(req, res) => {
    const data = req.body;
    const response = await equiposController.editarEquipo(data); 
    res.json(response);
});


router.delete('/eliminar/:id', async(req, res) => {
    const id = req.params.id;
    const response = await equiposController.eliminarEquipo(id); 
    res.json(response);
});

module.exports = router;

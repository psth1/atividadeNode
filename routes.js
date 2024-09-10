const express = require('express');
const endereController = require('./controller/EnderecoController');

const router = express.Router();

router.post('/enderecos', endereController.createEndereco);
router.get('/enderecos', endereController.getAllEnderecos);
router.get('/enderecos/:ID', endereController.getEnderecoById);
router.put('/enderecos/:ID', endereController.updateEndereco);
router.delete('/enderecos/:ID', endereController.deleteEndereco);
//rota da atividade complementar 23/08
router.post('/enderecos/:cep', enderecoController.CriaEnderecoCep);
module.exports = router;
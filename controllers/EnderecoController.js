const {Endereco} = require('../models');
const axios = require('axios');

//Criacao de um novo endereco
exports.createEndereco = async(res, req)=>{
    try{
        const{Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE} = req.body;
        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero,
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE
        });
        res.status(201).json(novoEndereco);
    }catch(error){
        res.status(500).json({error:'Erro ao criar endereço', details: error.message});
    }
};

//Leitura de todos os enderecos
exports.getAllEndereco = async(req, res) =>{
    try{
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    } catch(error){
        res.status(500).json({error:'Erro ao buscar endereços', details: error.message});
    }
};

//Leitura de um endereco por ID
exports.getEnderecoById = async (req, res) => {
    try{
        const {ID} = req.params;
        const endereco = await Endereco.findByPk(ID);

        if(!endereco){
            return res.status(404).json({error: 'Endereço não encontrado'});
        }

        res.status(200).json(endereco);
    }catch(error){
        res.status(500).json({error: 'Erro ao buscar endereço', details: error.message})
    }
};

//atualizacao de um endereco
exports.updateEndereco = async (req, res) =>{
    try{
        const{ID} = req.params;
        const{Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE} = req.body;
        
        const endereco = await Endereco.findByPk(ID);

        if(!endereco){
            return res.status(404).json({error: 'Endereço não encontrado'});
        }

        endereco.Cep = Cep;
        endereco.Logradouro = Logradouro;
        endereco.Numero = Numero;
        endereco.Complemento = Complemento;
        endereco.Bairro = Bairro;
        endereco.Cidade = Cidade;
        endereco.Estado = Estado;
        endereco.MunicipioIBGE = MunicipioIBGE;

        await endereco.save();
        
        res.status(200).json(endereco);
    }catch(error){
        res.status(500).json({error: 'Erro ao atualizar endereço', details: error.message});
    }
};

//Exclusao de um endereco
exports.deleteEndereco = async(req, res) =>{
    try{
        const{ID} = req.params;
        const endereco = await Endereco.findByPk(ID);

        if(!endereco){
            return res.status(404).json({error: 'Endereço não encontrado'});
        }

        await endereco.destroy();

        res.status(204).send();//sem conteudo pois foi deletedo
    }catch(error){
        res.status(500).json({error: 'Erro ao deletar endereço', details: error.message});
    }
};

//controller da atividade complementar 23/08/2024
//cria endereco pelo cep 
exports.CriaEnderecoCep = async (req, res) => {
    //tratamento de erro 
    try {
        const recep = req.params.cep;

        //faz requisicao a api
        const response = await axios.get(`https://viacep.com.br/ws/${recep}/json/`);
        
        //se nao pegar nada
        if (response.data.erro) {
            //retorno de erro 404
            return res.status(404).json({ error: 'CEP não encontrado' });
        }
        
        const { logradouro, complemento, bairro, localidade, uf, ibge } = response.data;

        //criando novo endereco no banco
        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro: logradouro,
            Numero: 0,
            Complemento: complemento,
            Bairro: bairro,
            Cidade: localidade,
            Estado: uf,
            MunicipioIBGE: ibge
        });

        //retorno 201 caso consiga criar no bano
        res.status(201).json(novoEndereco);
    //caso nao consiga salvar 
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar endereço', details: error.message });
    }
};
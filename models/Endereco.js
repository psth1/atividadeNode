const {Model, DataTypes, Sequelize} = require ('sequelize');
const sequelize = new Sequelize('postgres::memory');


class Endereco extends Model{}

Endereco.init({
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Cep:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    Logradouro:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Numero:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Complemento:{
        type: DataTypes.STRING,
    },
    Bairro:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Cidade:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Estado:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    MunicipioIBGE:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'Endereco',
    tableName: 'enderecos',
    timestamps: true,
});

module.exports = Endereco;
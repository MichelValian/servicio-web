'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Locality.belongsTo(models.City,
        {
          as: 'city', //alias para la relacion
          foreignKey: 'cityId'//pf en state
        }
      );
    }
  }
  Locality.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //El nombre no permite el campo nulo o vacio
        notNull: {
          msg: 'El nombre de la localidad es obligatorio'
        },
        //El nombre solo permite letras, y no numeros
        is: {
          args: [/^[A-Z a-z áéíóú]+$/i ],
          msg: "El nombre debe de contener solo letras"
        }
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //El codigo postal no permite el campo nulo o vacio
        notNull: {
          msg: 'El codigo postal es bligatoria'
        },
        //El codigo postal solo permite  numeros
        is: {
          args: [/^[0-9\s]+$/i ],
          msg: "El codigo postal debe contener solo números."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Locality',
  });
  return Locality;
};
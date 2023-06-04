'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Address.belongsTo(models.Locality,
        {
          as: 'locality', //alias para la relacion
          foreignKey: 'localityId'//pf en state
        }
      );
    }
  }
  Address.init({
    street:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //La calle permite el campo nulo o vacio
        notNull: {
          msg: 'El nombre de la localidad es obligatorio'
        },
        //La calle solo permite letras, y no numeros
        is: {
          args: [/^[A-Z a-z áéíóú]+$/i ],
          msg: "El nombre debe de contener solo letras"
        }
      }
    },
    streetNumber: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        //El streetNumber no permite el campo nulo o vacio
        notNull: {
          msg: 'El número exterior es bligatoria'
        },
        //El streetNumber solo permite  numeros
        is: {
          args: [/^[0-9\s]+$/i ],
          msg: "El número exterior debe contener solo números."
        }
      }
    },
    suiteNumber: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        //El suiteNumber no permite el campo nulo o vacio
        notNull: {
          msg: 'El número interior es bligatoria'
        },
        //El suiteNumber solo permite  numeros
        is: {
          args: [/^[0-9\s]+$/i ],
          msg: "El número interior debe contener solo números."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
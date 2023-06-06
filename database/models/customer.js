'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Address.hasOne(models.Locality,
        {
          as: 'address', //alias para la relacion
          foreignKey: 'addressId'//pf en state
        }
      );
    }
  }
  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //El nombre no permite el campo nulo o vacio
        notNull: {
          msg: 'El nombre es obligatorio'
        },
        //El nombre solo permite letras, y no numeros
        is: {
          args: [/^[A-Z a-z áéíóú]+$/i ],
          msg: "El nombre debe de contener solo letras"
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //El apellido no permite el campo nulo o vacio
        notNull: {
          msg: 'Los apellidos son obligatorios'
        },
        //El apellido solo permite letras, y no numeros
        is: {
          args: [/^[A-Z a-z áéíóú]+$/i ],
          msg: "Los apellidos deben de contener solo letras"
        }
      }
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //El rfc no permite el campo nulo o vacio
        notNull: {
          msg: 'El rfc es obligatorio'
        },
        //El rfc solo permite letras, y no numeros
        is: {
          args: [/^[0-9a-z , . A-Z\s]+$/i ],
          msg: "El rfc debe contener solo letras y numeros."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Es obligatorio agregar un email',
        },
        isEmail: {
          msg: 'Email no válido',
        },
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //El telefono no permite el campo nulo o vacio
        notNull: {
          msg: 'El telefono es obligatorio'
        },
        //El telefono solo permite  numeros
        is: {
          args: [/^[0-9\s]+$/i ],
          msg: "El telefono debe contener solo números."
        }
      }
    },
    status: DataTypes.BOOLEAN,
    addressId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};
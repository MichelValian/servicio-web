'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.State.hasMany(models.City,
        {
          as: 'cities', //alias para la relacion
          foreignKey: 'stateId', //pf en state
        }
      );
    }
  }
  State.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //El nombre no permite el campo nulo o vacio
        notNull: {
          msg: 'El nombre de estado es obligatorio'
        },
        //El nombre solo permite letras, y no numeros
        is: {
          args: [/^[A-Z a-z áéíóú]+$/i ],
          msg: "El nombre debe de contener solo letras"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'State',
  });
  return State;
};
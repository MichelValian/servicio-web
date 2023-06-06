'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Localities',
        'cityId',
        {
          type:Sequelize.DataTypes.INTEGER,   
          //establecer la relacion a la tabla y llave primaria       
          references: {
            model: 'Cities',
            key: 'id'
          },
        //integridad referenciar
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          defaultValue: null,
          after: 'postalCode'
        },       
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Localities', 'cityId')
    ]);
  }
};

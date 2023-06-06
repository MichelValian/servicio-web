'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Customers',
        'addressId',
        {
          type:Sequelize.DataTypes.INTEGER,   
          //establecer la relacion a la tabla y llave primaria       
          references: {
            model: 'Addresses',
            key: 'id'
          },
        //integridad referenciar
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          defaultValue: null,
          after: 'rfc'
        },       
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Customers', 'addressId')
    ]);
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Addresses',
        'localityId',
        {
          type:Sequelize.DataTypes.INTEGER,   
          //establecer la relacion a la tabla y llave primaria       
          references: {
            model: 'Localities',
            key: 'id'
          },
        //integridad referenciar
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          defaultValue: null,
          after: 'suiteNumber'
        },       
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Addresses', 'localityId')
    ]);
  }
};

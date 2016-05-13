'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('user', {
        name: Sequelize.STRING,
        birthday: Sequelize.DATE
    });
};

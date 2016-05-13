'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    return sequelize.define('story', {
        text: Sequelize.TEXT,
        author_id: Sequelize.INTEGER
    });
};

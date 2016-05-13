'use strict';

const config = require('config');
const co = require('co');
const Sequelize = require('sequelize');

module.exports = co.wrap(function *() {

    const sequelize = new Sequelize(
        config.pg.db,
        config.pg.user,
        config.pg.password,
        Object.assign({logging: console.log.bind(null, 'Sequelize:  ')}, config.pg.sequelize)
    );

    const User = require('./user.model')(sequelize);
    const Story = require('./story.model')(sequelize);

    // relashins
    Story.belongsTo(User, {as: 'author', foreignKey: 'author_id'});

    yield sequelize.sync({force: true});

    return {
        sequelize,
        User,
        Story
    };
});

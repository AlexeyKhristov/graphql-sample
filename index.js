'use strict';

const config = require('config');
const co = require('co');
const koa = require('koa');
const Router = require('koa-router');
const qs = require('koa-qs');
const parseBody = require('co-body');
const {graphql} = require('graphql');

const mount = require('koa-mount'); // koa-mount@1.x
const graphqlHTTP = require('koa-graphql');

const routes = new Router();
const app = koa();
qs(app);

co(function *() {

    const {sequelize, User, Story} = yield require('./models')();

    const user1 = yield User.create({
        name: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    const user2 = yield User.create({
        name: 'jonedoe',
        birthday: new Date(1980, 6, 20)
    });
    const story1 = yield Story.create({
        text: 'some text 1',
        author_id: user1.id
    });
    const story2 = yield Story.create({
        text: 'some text 2',
        author_id: user1.id
    });
    const story3 = yield Story.create({
        text: 'some text 3',
        author_id: user1.id
    });

    //console.log(user.get({plain: true}));

    app.use(function *(next) {
        var start = new Date;

        console.log('=> %s %s', this.method, this.request.url);

        yield* next;

        var ms = new Date - start;
        console.log('<= %s %s - %s ms', this.method, this.request.url, ms, this.response.status);
    });

    //gql

    const {schema} = yield require('./schema')({User, Story});


    app.use(mount('/graphql', graphqlHTTP({ schema: schema, graphiql: true, pretty: true })));


    routes.get('/data', function *() {
        var query = this.query.query;
        var params = this.query.params;

        let ctx = null;

        var resp = yield graphql(schema, query, ctx, params);

        console.log('! resp.errors', resp.errors);

        if (resp.errors) {
            this.status = 400;
            this.body = {
                errors: resp.errors
            };
            return;
        }

        this.body = resp;
    });

    routes.post('/data', function *() {
        var payload = yield parseBody(this);
        var resp = yield graphql(schema, payload.query, '', payload.params);

        if (resp.errors) {
            this.status = 400;
            this.body = {
                errors: resp.errors
            };
            return;
        }

        this.body = resp;
    });

    //gql

    //app.use(routes.middleware());

    app.use(function *() {
        this.throw(404, 'Совсэм not found');
    });

    app.listen(config.http.port, () => {
        console.log('Server started on port ' + config.http.port);
    });
})
.catch((e) => console.error('general error: ', e));


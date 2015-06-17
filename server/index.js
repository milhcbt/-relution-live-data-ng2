var express = require('mcap/express.js');

var datasync = require('mcap/datasync.js');
var backbone = require('mcap/backbone.js');
backbone.sync = datasync.sync;

var bikini = require('mcap/bikini.js');

var app = express();

app.use(express.bodyParser());

/**
 * get all todos.
 */
/**
 * mCAP/Security backend integration.
 */
app.use('/api', bikini.middleware({
    entity: 'todos',
    type: {
        container: 'todo MetaModelContainer', // <-- name of model container
        model: 'todo'                         // <-- name of model in container
    },
    idAttribute: '_id'
}));

//starts express webserver
app.listen();

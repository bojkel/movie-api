// middleware packages

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

exports.setMiddleware = (app) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
}
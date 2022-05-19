// routes path

const home_route = require('../routes/home_route');
const login_route = require('../routes/login_route');
const register_route = require('../routes/register_route');
const user_route = require('../routes/user_route');
const review_route = require('../routes/review_route');
const series_route = require('../routes/series_route');

exports.setRoutes = (app) => {
    app.use('/', home_route);
    app.use('/register', register_route);
    app.use('/login', login_route);
    app.use('/users', user_route);
    app.use('/reviews', review_route);
    app.use('/series', series_route);
}
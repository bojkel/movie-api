const routes = require('./routes');
const headerService = require('./header_service');
const middlewareService = require('./middleware_service');
const db = require('../db/db_config');

exports.startServer = (app, port) => {
    headerService.setHeaders(app);
    middlewareService.setMiddleware(app);
    routes.setRoutes(app);

    db.connect();

    app.listen(port, (err)=>{
        console.log("Listening on port ", port, "...");
        if(err){
            console.log('Connecting error: ', err)
        }
        else{
            console.log('Server started on port ',port)
        }
    })
}
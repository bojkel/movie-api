const Headers = (req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
}

exports.setHeaders = (app) => {
    app.use(Headers);
}
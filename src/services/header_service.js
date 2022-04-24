const Headers = (req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
        'Put, Post, Patch, Delete, Get');
        return res.status(200).json({});
    }
    next();
}

exports.setHeaders = (app) => {
    app.use(Headers);
}
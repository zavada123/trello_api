exports.index = function(req, res) {
    res.render('home', {
        title: 'Home',
        path: ['index'],
        source: 'index'
    });
};
var cakes = require('../controllers/cakes');

module.exports = function(app){
    app.get('/', function (req, res) {
        cakes.index(req,res);
    });
    app.get('/allCakes', function (req, res) {
        cakes.getAllCakes(req,res);
    });
    app.post('/newCake', function (req, res) {
        cakes.makeNewCake(req,res);

    });
    app.post('/newRating/:id', function (req, res) {
        cakes.makeNewRating(req,res);

    });
    app.get('/cake/:id', function (req, res) {
        cakes.findCake(req,res);

    });
}
var todo = require('./models/todo');

module.exports = {
    configure: function(app)    {
        app.get('/', function(req,res){
            res.send("Todo api");
        });
        app.get('/todo/', function(req, res)    {
            todo.get(res);
        });
        app.post('/todo/', function(req, res)   {
            //res.send(req.body.name);
            todo.create(req.body.name, res);
        });
        app.put('/todo/', function(req, res)    {
            todo.update(req.body, res);
        });
        app.delete('/todo/', function(req, res) {       
            // res.send(req.query);
            todo.delete(req.body.id, res);
        })
    }   
}


/**
 * If in the delete function we want to use 'params' instead of 'body'
 * replace /todo/ with /todo/:id=? and in postman request delete on the url 'localhost:8000/todo/'id'
 */
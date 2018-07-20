var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');
//Connect with Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin1409@ds243441.mlab.com:43441/todo-node-0720', {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  });

//Create a Schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'sleep again'}).save(function(err){
    if(err) throw err;
    console.log('Item saved');
});




//dummy data
var data = [{
    item: 'wake up'
},{
    item: "code"
}, {
    item: "sleep"
}];

module.exports = function(app){
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });
    app.post('/todo', urlencodedparser, function(req, res){        
        data.push(req.body);
        res.json(data);
    });
    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        
        res.json(data);
    });
};
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended: false});
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
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
    app.post('/todo', function(req, res){

    });
    app.delete('/todo', function(req, res){

    });
};
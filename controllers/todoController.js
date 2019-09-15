// var data = [
//     {
//         item: 'get milk'
//     },
//     {
//         item: 'walk dog'
//     },
//     {
//         item: 'kick some coding ass'
//     }
// ];

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://admin:admin@cluster0-u8zxt.gcp.mongodb.net/db_todo?retryWrites=true&w=majority');

//create a scheman bluefrint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('db_todo', todoSchema); 

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        //ged data from  mongodb and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
        // data.push(req.body);
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
};
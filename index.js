var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

var todo = [];

todo.push({ task: 'WinterCoding', comment: 'Assignment #1', priority: '1. Critical', date: '2018-11-04'});
todo.push({ task: 'TodoList', comment: 'Practice', priority: '4. Unhandled', date: '2018-12-18' });

todo.sort(function(a, b) {
    return a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0;
});

app.post("/addTask", function(req, res) {
    var newTask = req.body.newTask;
    var newComment = req.body.newComment;
    var newPriority = req.body.newPriority;
    var newDate = req.body.newDate;
    console.log(newPriority);

    var newTodo = { task: newTask, comment: newComment, priority: newPriority, date: newDate};
    console.log(newTodo.task);
    todo.push(newTodo);

    todo.sort(function(a, b) {
        return a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0;
    });

    res.redirect("/");
});

app.post("/removeTask", function(req, res) {
    var removeNum = req.body.removenum;
    console.log(removeNum);
    console.log(todo[removeNum].task);
    todo.splice(removeNum, 1);
    todo.sort(function(a, b) {
        return a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0;
    });
    res.redirect("/");
});

app.post("/editTask", function(req, res) {
    var editNum = req.body.editnum;
    var editTask = req.body.editTask;
    var editComment = req.body.editComment;
    var editPriority = req.body.editPriority;
    var editDate = req.body.editDate;
    console.log(editNum);
    todo[editNum].task = editTask;
    todo[editNum].comment = editComment;
    todo[editNum].priority = editPriority;
    todo[editNum].date = editDate;
    todo.sort(function(a, b) {
        return a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0;
    });
    res.redirect("/");
});


app.get("/", function(req, res) {
    res.render("index", {todo: todo});
});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});
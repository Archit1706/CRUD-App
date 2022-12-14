const Todo = require("../models/todo");

exports.getAllTodo =
 (req, res) => {
    Todo.find()
        .then((todo) => {
            console.log({ todo });
            res.json(todo);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ message: "no todo found", error: err.message })
        );
};

exports.postCreateTodo = (req, res) => {
    Todo.create(req.body)
        .then((data) => {
            console.log({ data });
            res.json({ message: "todo added successfully", data });
        })
        .catch((err) =>
            res.status(400).json({
                message: "unable to add new todo",
                error: err.message,
            })
        );
};

exports.putUpdateTodo = (req, res) => {
    console.log("id: ", req.params.id);
    console.log("body: ", req.body);
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((todo) => {
            console.log("edit", { todo });
            return res.json({ message: "updated successfully", todo });
        })
};

exports.deleteTodo = (req, res) => {
    console.log(req.params.id)
    Todo.findByIdAndRemove(req.params.id, req.body).then((data) =>
        res
            .json({ message: "todo deleted successfully" })
    )
    .catch(() =>
        res
            .status(404)
            .json({ error: "todo not found" })
    )
};

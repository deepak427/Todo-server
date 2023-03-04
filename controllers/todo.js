import Todo from "../models/todo.js";

export const getAllTodos = async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.status(200).json(todoList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addTodo = async (req, res) => {
  const { date, todo } = req.body;
  try {
    const existingTodo = await Todo.findOne({ date });
    if (existingTodo) {
      const index = existingTodo.totalTodos.findIndex((Todo) => Todo === todo);
      if (index === -1) {
        existingTodo.totalTodos.push(todo);
        const newTodo = await Todo.findByIdAndUpdate(
          existingTodo._id,
          existingTodo
        );
        return res.status(200).json({ message: "Todo posted successfully" });
      }
      return res.status(404).json({ message: "Todo already exist" });
    }
    const newTodo = await Todo.create({
      date,
      totalTodos: [todo],
    });
    return res.status(200).json({ message: "Todo posted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { date, todo } = req.body;
  try {
    const existingTodo = await Todo.findOne({ date });
    if (!existingTodo) {
      return res.status(404).json({ message: "Todo don't exist" });
    }
    existingTodo.totalTodos = existingTodo.totalTodos.filter(
      (Todo) => Todo !== todo
    );
    existingTodo.checkedTodos = existingTodo.checkedTodos.filter(
        (Todo) => Todo !== todo
      );

    await Todo.findByIdAndUpdate(existingTodo._id, existingTodo);
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(409).json("Could't post a new Job");
  }
};

export const checkTodo = async (req, res) => {
  const { date, todo } = req.body;
  try {
    const existingTodo = await Todo.findOne({ date });
    if (!existingTodo) {
      return res.status(404).json({ message: "Todo don't exist" });
    }
    const index = existingTodo.totalTodos.findIndex((Todo) => Todo === todo);
    const index_1 = existingTodo.checkedTodos.findIndex((Todo) => Todo === todo);

    if (index === -1 && index_1 === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const index_2 = existingTodo.checkedTodos.findIndex((Todo) => Todo === todo);

    if (index_2 === -1) {
        existingTodo.totalTodos.splice(index, 1);
        existingTodo.checkedTodos.push(todo);   
    }else {
        existingTodo.totalTodos.push(todo);
        existingTodo.checkedTodos.splice(index_2,1);   
    }

    await Todo.findByIdAndUpdate(existingTodo._id, existingTodo);
    return res.status(200).json({ message: "Todo checked/unchecked successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

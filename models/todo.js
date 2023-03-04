import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  date: {type: String},
  totalTodos: {type: [String], default: []},
  checkedTodos: {type: [String], default: []}
});

export default mongoose.model("todo", TodoSchema);
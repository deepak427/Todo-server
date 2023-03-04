import express from "express";

import {getAllTodos, addTodo, deleteTodo, checkTodo } from "../controllers/todo.js";

const router = express.Router();

router.get('/get', getAllTodos)

router.post('/add', addTodo)
router.patch('/delete', deleteTodo)
router.patch('/check', checkTodo)

export default router
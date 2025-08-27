import { Router } from 'express';
import { Todo } from '../models/todo';

let todos: Todo[] = [];

type RequestBody = { text: string };
type RequestParams = { todoId: string };

const router = Router();

router.get('/todos', (req, res, next) => {
  res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: Math.random().toString(),
    text: body.text
  }
  todos.push(newTodo);
  return res.status(201).json({ message: 'Created the todo.', todo: newTodo, todos: todos });
})

router.put('/todo/:todoId', (req, res, next) => {
  const requestParams = req.params as RequestParams;
  const todoId = requestParams.todoId;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  
  if (todoIndex >= 0 && todos[todoIndex]) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ message: 'Updated!', todos: todos });
  }
  res.status(404).json({ message: 'Could not find todo!' });
})

router.delete('/todo/:todoId', (req, res, next) => {

  const requestParams = req.params as RequestParams;
  const todoId = requestParams.todoId;
  todos = todos.filter(todo => todo.id !== todoId);
  return res.status(200).json({ message: 'Deleted!', todos: todos });
})

export default router;
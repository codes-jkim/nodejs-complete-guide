import { Router } from "jsr:@oak/oak/router";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body.json();
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text,
  };
  todos.push(newTodo);
  ctx.response.body = {
    message: "Created new todo!",
    todos: todos,
    todo: newTodo,
  };
});

router.put("/todo/:id", async (ctx) => {
  const data = await ctx.request.body.json();
  const todoIndex = todos.findIndex((todo) => todo.id === ctx.params.id);
  if (todoIndex > -1) {
    todos[todoIndex] = { id: ctx.params.id, text: data.text };
    ctx.response.body = {
      message: "Updated todo!",
      todos: todos,
    };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo not found!" };
    return;
  }
});

router.delete("/todo/:id", (ctx) => {
  const todoId = ctx.params.id;
  todos = todos.filter((todo) => todo.id !== todoId);
  ctx.response.body = { message: "Deleted todo!" };
});

export default router;

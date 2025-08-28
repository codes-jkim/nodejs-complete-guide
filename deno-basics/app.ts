import { Application } from "jsr:@oak/oak/application";
import todosRoutes from "./routes/todos.ts";

const app = new Application();

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 3000 });

import { z } from "zod";

export const createTodoSchema = z.object({
    text: z.string().min(1, "Please enter a todo."),
});

export type CreateTodoSchemaType = z.infer<typeof createTodoSchema>;

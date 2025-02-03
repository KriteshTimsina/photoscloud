"use server";
import { db } from "@/server/db";
import { photosSchema } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export const getPhotos = async () => {
  const data = await db.select().from(photosSchema);
  return data;
};

export const uploadPhotos = async () => {
  await db.insert(photosSchema).values({
    url: "https://images.unsplash.com/photo-1735325332407-73571ee7477b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  });

  revalidatePath("/photos");
};

// export const deleteTodo = async (id: number) => {
//   await db.delete(todo).where(eq(todo.id, id));

//   revalidatePath("/");
// };

// export const toggleTodo = async (id: number) => {
//   await db
//     .update(todo)
//     .set({
//       done: not(todo.done),
//     })
//     .where(eq(todo.id, id));

//   revalidatePath("/");
// };

// export const editTodo = async (id: number, text: string) => {
//   await db
//     .update(todo)
//     .set({
//       text: text,
//     })
//     .where(eq(todo.id, id));

//   revalidatePath("/");
// };

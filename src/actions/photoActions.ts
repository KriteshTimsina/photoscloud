"use server";
import { db } from "@/server/db";
import { photosSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";
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

export const deletePhoto = async (id: string) => {
  await db.delete(photosSchema).where(eq(photosSchema.id, id));

  revalidatePath("/photos");
};

export const getPhotoById = async (id: string) => {
  const data = await db
    .select()
    .from(photosSchema)
    .where(eq(photosSchema.id, id));
  return data[0];
};

export const toggleFavourite = async (id: string, favourite: boolean) => {
  await db
    .update(photosSchema)
    .set({ favourite })
    .where(eq(photosSchema.id, id));

  revalidatePath("/photos");
};

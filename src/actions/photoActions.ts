"use server";
import { auth } from "@/auth";
import { db } from "@/server/db";
import { photosSchema } from "@/server/db/schema";
import { asc, eq } from "drizzle-orm";
import { type DefaultSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getPhotos = async () => {
  const { user } = (await auth()) as DefaultSession;

  if (!user) {
    throw new Error("Unauthorized.");
  }
  const data = await db
    .select()
    .from(photosSchema)
    .orderBy(asc(photosSchema.createdAt))
    .where(eq(photosSchema.userId, user.id!));

  return data;
};

export const uploadPhotos = async () => {
  const session = await auth(); // Get the current user session
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;

  await db.insert(photosSchema).values({
    url: "https://images.unsplash.com/photo-1735325332407-73571ee7477b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    userId, // Attach userId here
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

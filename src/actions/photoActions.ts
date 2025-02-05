"use server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { photosSchema } from "@/server/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getPhotos = async () => {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/api/auth/signin");
  }
  const data = await db
    .select()
    .from(photosSchema)
    .orderBy(asc(photosSchema.createdAt))
    .where(eq(photosSchema.userId, userId));

  return data;
};

export const uploadPhotos = async () => {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    return { error: "Unauthorized" };
  }

  await db.insert(photosSchema).values({
    url: "https://images.unsplash.com/photo-1735325332407-73571ee7477b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    userId,
  });

  revalidatePath("/photos");
};

export const deletePhoto = async (id: string) => {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/api/auth/signin");
  }
  await db
    .delete(photosSchema)
    .where(and(eq(photosSchema.id, id), eq(photosSchema.userId, userId)));

  revalidatePath("/photos");
};

export const getPhotoById = async (id: string) => {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/api/auth/signin");
  }

  const [data] = await db
    .select()
    .from(photosSchema)
    .where(and(eq(photosSchema.id, id), eq(photosSchema.userId, userId)));
  return data;
};

export const toggleFavourite = async (id: string, favourite: boolean) => {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    return { error: "Unauthorized" };
  }
  await db
    .update(photosSchema)
    .set({ favourite })
    .where(and(eq(photosSchema.id, id), eq(photosSchema.userId, userId)));

  revalidatePath("/photos");
};

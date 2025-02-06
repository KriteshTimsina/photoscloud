"use server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { photosSchema } from "@/server/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

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

export const uploadPhotos = async (photo: {
  name: string;
  url: string;
  userId: string;
  size: number;
  type: string;
}) => {
  console.log(photo, "PAYLOAD");
  const data = await db
    .insert(photosSchema)
    .values({
      url: photo.url,
      userId: photo.userId,
      name: photo.name,
      type: photo.type,
      size: photo.size,
    })
    .catch((e) => console.log(e, "ERROR"));

  console.log(data, "RES");
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
};

export const deletePhoto = async (id: string) => {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/api/auth/signin");
  }

  const [photo] = await db
    .select()
    .from(photosSchema)
    .where(and(eq(photosSchema.id, id), eq(photosSchema.userId, userId)));

  if (!photo) {
    return { error: "Photo not found" };
  }

  const utapiResult = await utApi.deleteFiles([
    photo.url.replace("https://utfs.io/f/", ""),
  ]);

  console.log(utapiResult);

  const dbDeleteResult = await db
    .delete(photosSchema)
    .where(eq(photosSchema.id, id));

  console.log(dbDeleteResult);

  const c = await cookies();

  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
};

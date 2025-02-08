"use server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { photosSchema } from "@/server/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";

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
  return await db.insert(photosSchema).values({
    url: photo.url,
    userId: photo.userId,
    name: photo.name,
    type: photo.type,
    size: photo.size,
  });
};

export const getPhoto = async (id: string) => {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/api/auth/signin");
  }

  const [data] = await db
    .select()
    .from(photosSchema)
    .where(and(eq(photosSchema.id, id), eq(photosSchema.userId, userId)));

  if (!data) {
    return { error: "The photo you're looking for doesn't exist" };
  }
  return {
    data,
  };
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

  await utApi.deleteFiles([photo.url.replace("https://utfs.io/f/", "")]);

  await db.delete(photosSchema).where(eq(photosSchema.id, id));

  return { success: true, redirectTo: "/photos" };
};

export const updatePhotoDescription = async (
  id: string,
  description: string,
) => {
  try {
    const session = await auth();

    const userId = session?.user?.id;
    if (!userId) {
      redirect("/api/auth/signin");
    }

    const [photo] = await db
      .select()
      .from(photosSchema)
      .where(eq(photosSchema.id, id));

    if (!photo) {
      return { error: "Photo not found" };
    }

    await db
      .update(photosSchema)
      .set({ description })
      .where(eq(photosSchema.id, id));

    return {
      status: true,
      message: "Description updated successfully",
    };
  } catch (error) {
    console.log(error, "Failed to update description");
    return {
      message: "Failed to update description",
      status: false,
    };
  }
};

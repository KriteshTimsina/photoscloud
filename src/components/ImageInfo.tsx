"use client";
import React from "react";
import { Calendar, Cloud, Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { type IPhoto } from "@/server/db/schema";
import { useSession } from "next-auth/react";
import { updatePhotoDescription } from "@/actions/photoActions";
import { toast } from "sonner";

type ImageInfoProps = {
  photo: IPhoto;
};

const ImageInfo = ({ photo }: ImageInfoProps) => {
  const { data } = useSession();
  const user = data?.user;
  const [description, setDescription] = useState(photo.description ?? "");

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const updateDescription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() === "") return;

    const response = await updatePhotoDescription(photo.id, description);
    console.log(response);

    if (response.error) {
      return toast.error(response.message);
    }

    toast.success(response.message);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          tooltip="Info"
          variant="ghost"
          size="icon"
          className="text-white"
        >
          <Info className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto border-none bg-gray-900 transition-transform duration-300 ease-in-out">
        <SheetHeader>
          <SheetTitle className="font-semibold text-white">Info</SheetTitle>
        </SheetHeader>
        <form className="my-5 flex flex-col items-end gap-2">
          <Textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Add a description"
            className="min-h-[100px] resize-none border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
          />
          <Button
            type="submit"
            onClick={updateDescription}
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-lg text-white"
          >
            Save
          </Button>
        </form>

        <div className="">
          <h3 className="mb-3 text-sm font-medium text-white">Details</h3>
          <div className="space-y-4 text-sm">
            <div className="group flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="h-5 w-5" />
                <div>
                  <p>{photo.createdAt.toDateString()}</p>
                  <p className="text-gray-400">
                    {photo.createdAt.toTimeString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <Image
                src={photo.url}
                alt="Thumbnail"
                width={25}
                height={25}
                className="aspect-square rounded"
                quality={20}
              />
              <div>
                <p>{photo.name}</p>
                <p className="text-gray-400">
                  {(photo.size / 1024).toFixed(2)} KB · {photo.type}
                </p>
              </div>
            </div>

            {user && (
              <div className="flex items-center gap-3 text-gray-300">
                <div className="relative h-7 w-7 overflow-hidden rounded-full">
                  <Image
                    src={user.image!}
                    alt={user.name!}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <p className="text-white">Uploaded by</p>
                  <p className="text-sm text-gray-400">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 text-gray-300">
              <Cloud className="h-5 w-5" />
              <div>
                <p>Backed up</p>
                <p className="text-gray-400">Original quality</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ImageInfo;

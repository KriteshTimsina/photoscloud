import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Trash2, ZoomIn } from "lucide-react";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import ImageInfo from "@/components/ImageInfo";
import { type IPhoto } from "@/server/db/schema";

export const ImageNavigationButtons = ({
  isFavorite,
  onClose,
  onFavorite,
  onZoom,
  onDeleteTrigger,
  photo,
}: {
  isFavorite: boolean;
  onClose: () => void;
  onFavorite: () => void;
  onZoom: () => void;
  onDeleteTrigger: () => void;
  photo: IPhoto;
}) => {
  return (
    <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-slate-900/90 p-4 md:bg-transparent">
      <Button
        tooltip="Close"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <div className="flex space-x-2">
        <Button
          tooltip="Favourite"
          variant="ghost"
          className="hover:bg-transparent"
          size="icon"
          onClick={onFavorite}
        >
          <Heart
            stroke={isFavorite ? "red" : "white"}
            className={`h-6 w-6 ${isFavorite ? "fill-red-500" : ""}`}
          />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onZoom}
          className="text-white"
        >
          <ZoomIn className="h-6 w-6" />
        </Button>

        <ImageInfo photo={photo} />

        <ConfirmationDialog tooltip="Delete" onConfirm={onDeleteTrigger}>
          <Button variant="ghost" size="icon" className="text-white">
            <Trash2 className="h-6 w-6" />
          </Button>
        </ConfirmationDialog>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Info, Trash2, ZoomIn } from "lucide-react";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";

export const ImageNavigationButtons = ({
  isFavorite,
  onClose,
  onFavorite,
  onZoom,
  onDetails,
  onDeleteTrigger,
}: {
  isFavorite: boolean;
  onClose: () => void;
  onFavorite: () => void;
  onZoom: () => void;
  onDetails: () => void;
  onDeleteTrigger: () => void;
}) => (
  <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4">
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
      <Button
        variant="ghost"
        size="icon"
        onClick={onDetails}
        className="text-white"
      >
        <Info className="h-6 w-6" />
      </Button>
      <ConfirmationDialog tooltip="Delete" onConfirm={onDeleteTrigger}>
        <Button variant="ghost" size="icon" className="text-white">
          <Trash2 className="h-6 w-6" />
        </Button>
      </ConfirmationDialog>
    </div>
  </div>
);

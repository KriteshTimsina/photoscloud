import Custom404 from "@/components/404";
import React from "react";

export default function NotFound() {
  return (
    <Custom404
      title="The photo you're looking for doesn't exist"
      description="You may have mistyped the address or the photo may have been deleted."
    />
  );
}

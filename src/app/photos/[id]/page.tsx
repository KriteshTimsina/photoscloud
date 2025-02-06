import { getPhotoById } from "@/actions/photoActions";
import ImageModal from "@/components/ImageModal";

export default async function ViewPhoto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const photo = await getPhotoById(id);

  return <ImageModal photo={photo!} />;
}

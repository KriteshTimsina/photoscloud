import { getPhoto } from "@/actions/photoActions";
import ImageModal from "@/components/ImageModal";
import { notFound } from "next/navigation";

export default async function Photo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data, error } = await getPhoto(id);

  if (error) {
    return notFound();
  }

  return <ImageModal photo={data!} />;
}

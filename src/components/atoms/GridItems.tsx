import Image from "next/image";
import Link from "next/link";

export interface IGridItem {
  id: string;
  title: string;
  url: string;
  images: {
    preview_gif: {
      height: `${number}`;
      widht: `${number}`;
      url: string;
    };
  };
}

export default function GridItem({
  id,
  url,
  title,
  images: { preview_gif },
}: IGridItem) {
  return (
    <Link
      href={url}
      target="_blank"
      className="block relative aspect-square"
      key={id}
    >
      <Image
        className="absolute inset-0 w-full h-full object-cover"
        alt={title}
        src={preview_gif.url}
        width={preview_gif.widht || 256}
        height={preview_gif.height || 256}
      />
      <div className="absolute inset-0 bg-neutral-900/60 text-white flex items-center justify-center text-center p-4 opacity-0 hover:opacity-100 transition-opacity">
        {title}
      </div>
    </Link>
  );
}

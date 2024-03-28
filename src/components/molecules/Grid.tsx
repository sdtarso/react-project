import Image from "next/image";
import GridItem, { IGridItem } from "../atoms/GridItems";

export default function Grid({ data }: { data: IGridItem[] }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {data.length ? (
        data.map((item, key) => <GridItem key={key} {...item} />)
      ) : (
        <p className="col-span-5 text-center">It&apos;s empty here....</p>
      )}
    </div>
  );
}

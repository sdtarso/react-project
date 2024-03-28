import { Inter, Qahiri } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";

const inter = Inter({ subsets: ["latin"] });
const apiKey = "pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa";

interface ITileItem {
  id: string;
  title: string;
  images: {
    preview_gif: {
      height: `${number}`;
      widht: `${number}`;
      url: string;
    };
  };
}

export default function Home() {
  const itemsPerPage = 5;
  const [pages, setPages] = useState(5);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoadig] = useState(false);
  const [data, setData] = useState<ITileItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(currentPage * itemsPerPage);

  const fetchApi = useCallback(
    (q: string) => {
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${itemsPerPage}&offset=${offset}`
      )
        .then((response) => response.json())
        .then(({ data, pagination }) => {
          const { total_count } = pagination;
          setIsLoadig(false);
          setData(data);
          setPages(Math.ceil(total_count / itemsPerPage));
        });
    },
    [offset]
  );

  const setPage = (page: number) => {
    setCurrentPage(page);
    setOffset(page * itemsPerPage);
    fetchApi(search);
  };

  const clearSearch = () => {
    fetchApi("");
  };

  const handleSearch = () => {
    setIsLoadig(true);
    fetchApi(search);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-24 ${inter.className}`}
    >
      <div className="flex gap-2 mb-6">
        <input
          className="border px-4"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>SEARCH</Button>
        <Button onClick={clearSearch}>CLEAR</Button>
      </div>
      <div className="search-results w-full mb-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {data.length ? (
              data.map(({ id, title, images: { preview_gif } }) => (
                <Image
                  className="w-full h-full object-cover"
                  key={id}
                  alt={title}
                  src={preview_gif.url}
                  width={preview_gif.widht || 160}
                  height={preview_gif.height || 90}
                />
              ))
            ) : (
              <p className="col-span-5 text-center">It&apos;s empty here....</p>
            )}
          </div>
        )}
      </div>
      {search !== "" ? (
        <div className="pagination flex justify-center flex-wrap gap-2">
          <Button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage <= 0}
          >
            PREV
          </Button>
          {new Array(pages).fill("").map((i, key) => (
            <Button
              key={key}
              onClick={() => setPage(key)}
              className={key === currentPage ? "bg-red-500" : ""}
            >
              {key + 1}
            </Button>
          ))}
          <Button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= pages - 1}
          >
            NEXT
          </Button>
        </div>
      ) : null}
    </main>
  );
}

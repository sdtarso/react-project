import { Inter } from "next/font/google";
import { useState } from "react";
import Loading from "@/components/atoms/Loading";
import Grid from "@/components/molecules/Grid";
import SearchBar from "@/components/molecules/Filters";
import Pagination from "@/components/molecules/Pagination";
import { IGridItem } from "@/components/atoms/GridItems";

const inter = Inter({ subsets: ["latin"] });
const apiKey = "pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa";
const itemsPerPage = 5;

export default function Home() {
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoadig] = useState(false);
  const [data, setData] = useState<IGridItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchApi = (q: string, offset: number) => {
    setIsLoadig(true);

    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${itemsPerPage}&offset=${offset}`
    )
      .then((response) => response.json())
      .then(({ data, pagination: { total_count } }) => {
        setIsLoadig(false);
        setData(data);
        setPages(Math.ceil(total_count / itemsPerPage));
      });
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
    fetchApi(query, page * itemsPerPage);
  };

  const clearSearch = () => {
    setQuery("");
    setData([]);
    setCurrentPage(0);
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    fetchApi(query, 0);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-24 ${inter.className}`}
    >
      <SearchBar
        search={handleSearch}
        clear={clearSearch}
        query={query}
        setQuery={setQuery}
      />
      <div className="container mx-auto mb-6">
        {isLoading ? <Loading size={16} /> : <Grid data={data} />}
      </div>
      {data.length > 0 ? (
        <Pagination
          pagesCount={pages}
          currentPage={currentPage}
          setPage={setPage}
        />
      ) : null}
    </main>
  );
}

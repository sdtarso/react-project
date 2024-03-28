import Button from "../atoms/Button";

interface IPagination {
  pagesCount: number;
  currentPage: number;
  setPage: (p: number) => void;
}

export default function Pagination({
  pagesCount,
  currentPage,
  setPage,
}: IPagination) {
  return (
    <div className="pagination flex justify-center flex-wrap gap-2">
      <Button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 0}
      >
        PREV
      </Button>
      {new Array(pagesCount).fill("").map((i, key) => (
        <Button
          key={key}
          onClick={() => setPage(key)}
          className={key === currentPage ? "!bg-red-700" : ""}
        >
          {key + 1}
        </Button>
      ))}
      <Button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage >= pagesCount - 1}
      >
        NEXT
      </Button>
    </div>
  );
}

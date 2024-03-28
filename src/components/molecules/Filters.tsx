import InputField from "../atoms/Inputs";
import Button from "../atoms/Button";
import Image from "next/image";

interface ISearchBar {
  query: string;
  setQuery: (q: string) => void;
  search: (q: string) => void;
  clear: () => void;
}

export default function SearchBar({
  query,
  setQuery,
  search,
  clear,
}: ISearchBar) {
  return (
    <div className="flex gap-2 mb-6">
      <InputField
        className="border px-4"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && search(query)}
      />
      <Button onClick={() => search(query)} disabled={!query}>
        <Image src="/search-icon.svg" alt="Search" width={32} height={32} />
      </Button>
      <Button onClick={clear} disabled={!query}>
        CLEAR
      </Button>
    </div>
  );
}

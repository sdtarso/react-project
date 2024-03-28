import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useSWRCustom(url: string) {
  return useSWR(url, fetcher);
}

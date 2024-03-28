// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  title: string;
};

const posts: Data[] = [
  {
    title: "Post 1",
  },
  {
    title: "Post 2",
  },
  {
    title: "Post 3",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json(posts);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create a post
  try {
    const result = await prisma.post?.findMany({
      include: { user: true, comment: true, like: true },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: "error while get a post" });
  }
}

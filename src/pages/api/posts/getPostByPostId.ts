// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req?.body;

  // get a post by user id
  try {
    const result = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        like: true,
        comment: { orderBy: { createdAt: "desc" }, include: { user: true } },
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: "error while get a post" });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/client";

export default async function handler(req, res) {
  const payload = req.body;
  const session = await getServerSession(req, res, authOptions);

  // getUser
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  // get post
  const post = await prisma.post.findUnique({
    where: { id: payload?.postId },
    include: {
      like: { orderBy: { createdAt: "desc" } },
    },
  });

  // get like
  const like = await prisma?.like?.findMany({
    where: { postId: payload?.postId },
  });

  // check if user was give a like or not
  const isLike = like?.find(
    (like) => like?.postId === payload?.postId && like?.name === payload?.name
  );

  // validate payload
  // if (payload.message > 400) {
  //   return res.status(403).json({
  //     message: "Terlalu banyak kata yang dikirim, maksimal 400 huruf",
  //   });
  // }

  // if (payload?.name === user?.name) {
  //   return res
  //     .status(400)
  //     .json({ message: "Akun ini sudah memberi like pada postingan ini" });
  // }

  // create a post
  try {
    if (isLike) {
      const result = await prisma?.like?.delete({
        where: {
          id: isLike?.id,
        },
      });
      return res.status(200).json({ result });
    } else {
      const result = await prisma.like.create({
        data: {
          name: payload?.name,
          userId: user?.id,
          postId: payload?.postId,
        },
      });
      return res.status(200).json({ result });
    }
  } catch (error) {
    return res.status(400).json({ message: "error while add a post" });
  }
}

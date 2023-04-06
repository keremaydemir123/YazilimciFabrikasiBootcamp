import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

import query from "@/lib/queryApi";
import adminDB from "@/firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt || !chatId || !model || !session) {
    res.status(400).json({ answer: "Bad Request" });
    return;
  }

  const resFromChatGPT = await query({ prompt, chatId, model });

  const message: Message = {
    text: resFromChatGPT || "ChatGPT was unable to respond",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://commons.wikimedia.org/wiki/File:ChatGPT_logo.svg",
    },
  };

  await adminDB
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}

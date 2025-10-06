import { JSONFilePreset } from "lowdb/node";

import type { AIMessage } from "../types";
import { v4 as uuidv4 } from "uuid";

export type MessageWithMetadata = AIMessage & {
  id: string;
  createdAt: number;
};

type Data = {
  messages: MessageWithMetadata[];
};

export const addMetadata = (message: AIMessage): MessageWithMetadata => {
  return {
    ...message,
    id: uuidv4(),
    createdAt: Date.now(),
  };
};

export const removeMetadata = (message: MessageWithMetadata): AIMessage => {
  const { id, createdAt, ...rest } = message;
  return rest;
};

const defaultData: Data = {
  messages: [],
};

export const getDB = async () => {
  const db = await JSONFilePreset<Data>("db.json", defaultData);
  return db;
};

export const addMessages = async (messages: AIMessage[]): Promise<void> => {
  const db = await getDB();
  db.data.messages.push(...messages.map(addMetadata));
  await db.write();
};

export const getMessages = async (): Promise<AIMessage[]> => {
  const db = await getDB();
  return db.data.messages.map(removeMetadata);
};

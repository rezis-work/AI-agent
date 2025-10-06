import type { AIMessage } from "../types";
import { openai } from "./ai";

export interface RunLLMInput {
  messages: AIMessage[];
}

export const runLLM = async ({ messages }: RunLLMInput) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    messages,
  });

  return response.choices[0].message.content;
};

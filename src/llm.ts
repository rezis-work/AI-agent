import type { AIMessage } from "../types";
import { openai } from "./ai";
import { zodFunction } from "openai/helpers/zod";

export interface RunLLMInput {
  messages: AIMessage[];
  tools?: any[];
}

export const runLLM = async ({ messages, tools }: RunLLMInput) => {
  const formattedTools = tools?.map(zodFunction);
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    messages,
    tools: formattedTools,
    tool_choice: "auto",
    parallel_tool_calls: false,
  });

  return response.choices[0].message;
};

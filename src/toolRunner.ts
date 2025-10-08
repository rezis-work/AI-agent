import type OpenAI from "openai";
import {
  generateImage,
  generateImageToolDefinition,
} from "./tools/generateImage";
import { dadJoke, dadJokeToolDefinition } from "./tools/dadJoke";
import { reddit, redditToolDefinition } from "./tools/reddit";

export const runTool = async (
  tool: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(tool.function.arguments || "{}"),
  };

  switch (tool.function.name) {
    case generateImageToolDefinition.name:
      return generateImage(input);
    case dadJokeToolDefinition.name:
      return dadJoke(input);
    case redditToolDefinition.name:
      return reddit(input);
    default:
      return `Never run this tool: ${tool.function.name} again, or else!`;
  }
};

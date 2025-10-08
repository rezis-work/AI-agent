import type OpenAI from "openai";

const getWeather = async () => `hot, 90 degrees`;

export const runTool = async (
  tool: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(tool.function.arguments || "{}"),
  };

  switch (tool.function.name) {
    case "get_weather":
      return getWeather(input);
    default:
      throw new Error(`Unknown tool: ${tool.function.name}`);
  }
};

import { runLLM } from "../../src/llm";
import { dadJokeToolDefinition } from "../../src/tools/dadJoke";
import { redditToolDefinition } from "../../src/tools/reddit";
import { generateImageToolDefinition } from "../../src/tools/generateImage";
import { runEval } from "../evalTools";
import { ToolCallMatch } from "../scorers";

const createToolCallMessage = (toolName: string) => ({
  role: "assistant",
  tool_calls: [
    {
      function: {
        type: "function",
        name: toolName,
      },
    },
  ],
});

const allTools = [
  dadJokeToolDefinition,
  redditToolDefinition,
  generateImageToolDefinition,
];

runEval("allTools", {
  task: (input) =>
    runLLM({
      messages: [{ role: "user", content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: "tell me a funny dad joke",
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: "find me something intresting on reddit",
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: "generate an image of a sunset",
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
});

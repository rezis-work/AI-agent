import "dotenv/config";

import { runAgent } from "./src/agent";
import z from "zod";

const userMessage = process.argv[2];

if (!userMessage) {
  console.error("Please provide a message to the agent");
  process.exit(1);
}

const weathertool = {
  name: "get_weather",
  parameters: z.object({}),
};

await runAgent({
  userMessage,
  tools: [weathertool],
});

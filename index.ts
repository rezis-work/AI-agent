import "dotenv/config";

import { runAgent } from "./src/agent";
import { tools } from "./src/tools";

const userMessage = process.argv[2];

if (!userMessage) {
  console.error("Please provide a message to the agent");
  process.exit(1);
}

await runAgent({
  userMessage,
  tools,
});

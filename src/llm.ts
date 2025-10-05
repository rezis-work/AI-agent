import { openai } from "./ai";

export interface RunLLMInput {
  userMessage: string;
}

export const runLLM = async ({ userMessage }: RunLLMInput) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  return response.choices[0].message.content;
};

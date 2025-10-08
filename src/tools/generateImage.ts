import type { ToolFn } from "../../types";
import z from "zod";
import { openai } from "../ai";

export const generateImageToolDefinition = {
  name: "generate_image",
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        "The prompt to use to generate the image, if you are unsure ask user to provide more details"
      ),
  }),
  description: "Generate an image based on a prompt",
};

type Args = z.infer<typeof generateImageToolDefinition.parameters>;

export const generateImage: ToolFn<Args, string> = async ({ toolArgs }) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: toolArgs.prompt,
    n: 1,
    size: "1024x1024",
  });

  return response.data![0].url!;
};

import type { ToolFn } from "../../types";
import z from "zod";
import { queryMovies } from "../rag/query";

export const movieSearchToolDefinition = {
  name: "movie_search",
  parameters: z.object({
    query: z.string().describe("The query used to vector search the movies"),
  }),
  description: "Search for movies based on a query",
};

type Args = z.infer<typeof movieSearchToolDefinition.parameters>;

export const movieSearch: ToolFn<Args, string> = async ({
  userMessage,
  toolArgs,
}) => {
  let result;
  try {
    result = await queryMovies({ query: toolArgs.query });
  } catch (error) {
    console.error(error);
    return `Error searching for movies: ${error}`;
  }

  const formattedResult = result.map((item) => ({
    title: item.metadata?.title,
    year: item.metadata?.year,
    genre: item.metadata?.genre,
    director: item.metadata?.director,
    rating: item.metadata?.rating,
    votes: item.metadata?.votes,
    description: item.metadata?.description,
    gross: item.metadata?.gross,
    metascore: item.metadata?.metascore,
    runtime: item.metadata?.runtime,
  }));

  return JSON.stringify(formattedResult, null, 2);
};

import { Index as UpstashIndex } from "@upstash/vector";

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

export const queryMovies = async ({
  query,
  filters,
  topK,
}: {
  query: string;
  filters?: any;
  topK?: number;
}) => {
  let filterStr = "";
  // if (filters) {
  //   const filterParts = Object.entries(filters)
  //     .filter(([_, value]) => value !== undefined)
  //     .map(([key, value]) => `${key}='${value}'`);

  //   if (filterParts.length > 0) {
  //     filterStr = filterParts.join(" AND ");
  //   }
  // }

  return index.query({
    data: query,
    topK: topK || 10,
    includeData: true,
    includeMetadata: true,
  });
};

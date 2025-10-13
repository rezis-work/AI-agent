import "dotenv/config";
import { Index as UpstashIndex } from "@upstash/vector";
import { parse } from "csv-parse/sync";
import fs from "node:fs";
import path from "node:path";
import ora from "ora";
import { fileURLToPath } from "node:url";

const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

const indexMovieData = async () => {
  const spinner = ora("Indexing movie data").start();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const csvData = fs.readFileSync(
    path.join(__dirname, "imdb_top_1000.csv"),
    "utf8"
  );
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });

  spinner.text = "Indexing movie data";

  for (const record of records) {
    spinner.text = `Indexing movie data: ${record.Series_Title}`;
    const text = `${record.Series_Title}. ${record.Genre}. ${record.Overview}`;

    try {
      await index.upsert({
        id: record.Series_Title,
        data: text,
        metadata: {
          title: record.Series_Title,
          year: record.Released_Year,
          genre: record.Genre,
          director: record.Director,
          star1: record.Star1,
          star2: record.Star2,
          star3: record.Star3,
          star4: record.Star4,
          rating: record.IMDB_Rating,
          votes: record.No_of_Votes,
          description: record.Overview,
          gross: record.Gross,
          metascore: record.Meta_score ? Number(record.Meta_score) : null,
          runtime: record.Runtime,
          certificate: record.Certificate,
        },
      });
    } catch (error) {
      spinner.fail(`Failed to index movie data: ${record.Series_Title}`);
      console.error(error);
    }
  }

  spinner.succeed("Movie data indexed successfully");
};

indexMovieData();

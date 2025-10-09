import "dotenv/config";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { readdir } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async () => {
  const evalName = process.argv[2];
  const experimentsDir = join(__dirname, "experiments");

  try {
    if (evalName) {
      // use file URL so ESM is happy on Windows
      const evalFsPath = join(experimentsDir, `${evalName}.eval.ts`);
      const evalUrl = pathToFileURL(evalFsPath).href;
      await import(evalUrl);
    } else {
      const files = await readdir(experimentsDir);
      const evalFiles = files.filter((f) => f.endsWith(".eval.ts"));
      for (const evalFile of evalFiles) {
        const evalUrl = pathToFileURL(join(experimentsDir, evalFile)).href;
        await import(evalUrl);
      }
    }
  } catch (error) {
    console.error(
      `Failed to run eval${evalName ? ` '${evalName}'` : "s"}:`,
      error
    );
    process.exit(1);
  }
};

main();

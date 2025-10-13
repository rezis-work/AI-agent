# 🤖 AI Agent - Intelligent AI Assistant

## 📖 Project Description

**AI Agent** is an advanced AI assistant system built in TypeScript that combines content generation, information retrieval, image generation, and movie search capabilities. The project leverages cutting-edge AI technologies including OpenAI GPT, DALL-E, and Upstash Vector database for advanced semantic search.

### ✨ Key Features

- 🎭 **AI Assistant with "Troll" Personality** - humorous and playful
- 🎨 **Image Generation** using DALL-E 3
- 🎬 **Movie Search** from IMDB Top 1000 database
- 😄 **Dad Jokes** from external API
- 📱 **Reddit Posts** (NBA subreddit)
- 📊 **Dashboard** for data visualization
- 🧪 **Evaluation System** for AI tools
- 💾 **Conversation Memory** with LowDB
- 🔍 **Semantic Search** for movies

## 🏗️ System Architecture

### Project Structure

```
ai-agent/
├── src/                    # Main application source code
│   ├── agent.ts           # Core AI agent logic
│   ├── ai.ts              # OpenAI configuration
│   ├── llm.ts             # Language model
│   ├── memory.ts          # Conversation memory management
│   ├── systemPrompt.ts    # System prompt for agent
│   ├── toolRunner.ts      # Tool execution
│   ├── ui.ts              # User interface
│   ├── tools/             # Agent tools
│   │   ├── dadJoke.ts     # Dad jokes
│   │   ├── generateImage.ts # Image generation
│   │   ├── reddit.ts      # Reddit posts
│   │   ├── movieSearch.ts # Movie search
│   │   └── index.ts       # Tool exports
│   └── rag/               # Retrieval-Augmented Generation
│       ├── ingest.ts      # Movie data indexing
│       ├── query.ts       # Vector database queries
│       └── imdb_top_1000.csv # Movie database
├── dashboard/             # React Dashboard
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   └── ExperimentGraph.tsx
│   │   └── main.tsx
│   └── package.json
├── evals/                 # Evaluation system
│   ├── experiments/       # Evaluation experiments
│   ├── evalTools.ts       # Evaluation tools
│   ├── run.ts             # Evaluation runner
│   └── scorers.ts         # Scoring systems
├── index.ts              # Application entry point
├── types.ts              # TypeScript type definitions
└── package.json          # Project configuration
```

## 🚀 Installation and Setup

### System Requirements

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **TypeScript** >= 5.0.0

### 1. Clone Repository

```bash
git clone <repository-url>
cd ai-agent
```

### 2. Install Dependencies

```bash
# Install main dependencies
npm install

# Install dashboard dependencies
cd dashboard
npm install
cd ..
```

### 3. Environment Variables Configuration

Create a `.env` file in the main project directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Upstash Vector Configuration (for movie search)
UPSTASH_VECTOR_REST_URL=your_upstash_vector_url
UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_token
```

### 4. Index Movie Database

Before running movie search for the first time, you need to index the database:

```bash
npm run ingest
```

This process:

- Loads the `imdb_top_1000.csv` file
- Creates vectors for each movie
- Saves them to Upstash Vector database
- Enables semantic movie search

## 💻 Usage

### Running AI Agent

```bash
# Basic usage with a message
npm start "Hello! Tell me a dad joke"

# Usage examples
npm start "Find Batman movies"
npm start "Generate an image of a cat in space"
npm start "Show latest Reddit NBA posts"
```

### Running Dashboard

```bash
cd dashboard
npm run dev
```

Dashboard will be available at: `http://localhost:5173`

### Running Evaluations

```bash
# Run all evaluation tests
npm run eval

# Test specific tool
npx tsx evals/experiments/dadJoke.eval.ts
```

## 🛠️ Available Tools

### 1. 🎨 Image Generation (`generate_image`)

Generates images using DALL-E 3 based on description.

**Parameters:**

- `prompt` (string): Description of image to generate

**Example:**

```typescript
await runAgent({
  userMessage: "Generate an image of a cat playing piano",
  tools,
});
```

### 2. 🎬 Movie Search (`movie_search`)

Searches movies in IMDB Top 1000 database using semantic search.

**Parameters:**

- `query` (string): Query to search for movies

**Example:**

```typescript
await runAgent({
  userMessage: "Find science-fiction movies from the 90s",
  tools,
});
```

**Returns:**

- Title, year, genre
- Director, actors
- IMDB rating, vote count
- Description, revenue, metascore
- Runtime, certificate

### 3. 😄 Dad Jokes (`dad_joke`)

Fetches random dad joke from external API.

**Parameters:** None

**Example:**

```typescript
await runAgent({
  userMessage: "Tell me a dad joke",
  tools,
});
```

### 4. 📱 Reddit Posts (`reddit`)

Fetches latest posts from r/NBA subreddit.

**Parameters:** None

**Returns:**

- Post title
- Post link
- Author
- Upvote count
- Subreddit

## 🧠 Memory System

The agent uses **LowDB** to store conversation history:

- **Automatic saving** of all messages
- **Context restoration** between sessions
- **Tool management** and their responses
- **`db.json` file** contains entire history

## 📊 Evaluation System

The project includes an advanced AI tools evaluation system:

### Evaluation Structure

```
evals/
├── experiments/           # Experiments for each tool
│   ├── allTools.eval.ts  # Test all tools
│   ├── dadJoke.eval.ts   # Test dad jokes
│   ├── generateImage.eval.ts # Test image generation
│   └── reddit.eval.ts    # Test Reddit
├── evalTools.ts          # Evaluation tools
├── run.ts                # Evaluation runner
└── scorers.ts            # Scoring systems
```

### Running Evaluations

```bash
# All tools
npm run eval

# Specific tool
npx tsx evals/experiments/generateImage.eval.ts
```

### Evaluation Metrics

- **Response accuracy**
- **Result relevance**
- **Tool execution time**
- **Generated content quality**

## 🎨 React Dashboard

The dashboard enables data and experiment visualization:

### Dashboard Features

- **Evaluation experiment** charts
- **Tool performance** statistics
- **Test results** visualization
- **Interactive** React components

### Running

```bash
cd dashboard
npm run dev
```

## 🔍 Semantic Movie Search

The system uses **Upstash Vector** for advanced movie search:

### Indexing Process

1. **Load CSV** with IMDB data
2. **Create vectors** from title, genre, and description
3. **Save** to vector database
4. **Enable** semantic search

### Vector Search Benefits

- **Find similar** movies
- **Search by meaning**, not just keywords
- **Better results** for natural queries
- **Scalability** for large datasets

## 🎭 "Troll" Agent Personality

The agent has a specially programmed personality:

### Personality Traits

- **Humorous** and playful tone
- **Wordplay** and puns
- **Emojis** for engagement
- **Creative** and unexpected suggestions
- **Slightly trolling** character 😈
- **Fun facts** and trivia

### Interaction Example

```
User: "Find Batman movies"
Agent: "🦇 Ooo, Batman! Time for a nocturnal adventure!
Let me search my movie library
and find the best adventures of the Dark Knight!
*searching database* 🕵️‍♂️"
```

## 📈 Performance and Optimization

### Optimizations

- **Asynchronous** tool execution
- **API response** caching
- **Lazy loading** components
- **Efficient** vector database queries

### Monitoring

- **Execution time** for each tool
- **API usage** statistics
- **Error and warning** logs
- **Performance** metrics

## 🛡️ Security

### Security Measures

- **Input parameter** validation
- **User data** sanitization
- **API call** rate limiting
- **Error handling** for all operations

### Privacy

- **Local** conversation storage
- **No logging** of sensitive data
- **API key encryption** in environment variables

## 🧪 Testing

### Test Types

- **Unit tests** for tools
- **Integration tests** for agent
- **Response quality** evaluation
- **Performance tests** for efficiency

### Running Tests

```bash
# All tests
npm test

# Evaluation tests
npm run eval

# Specific tool test
npx tsx evals/experiments/[name].eval.ts
```

## 🔧 System Extension

### Adding New Tools

1. **Create file** in `src/tools/`
2. **Define parameters** with Zod
3. **Implement** tool function
4. **Add** to `src/tools/index.ts`
5. **Test** in evaluation system

### New Tool Example

```typescript
// src/tools/weather.ts
import z from "zod";
import type { ToolFn } from "../../types";

export const weatherToolDefinition = {
  name: "weather",
  parameters: z.object({
    city: z.string().describe("City to check weather for"),
  }),
  description: "Checks weather in a given city",
};

type Args = z.infer<typeof weatherToolDefinition.parameters>;

export const weather: ToolFn<Args, string> = async ({ toolArgs }) => {
  // Weather check implementation
  return `Weather in ${toolArgs.city}: sunny ☀️`;
};
```

## 📚 API Documentation

### Main Endpoints

#### `runAgent(input)`

Runs AI agent with given message.

**Parameters:**

- `userMessage` (string): User message
- `tools` (array): List of available tools

**Returns:**

- Promise with conversation history

#### `queryMovies(params)`

Searches movies in vector database.

**Parameters:**

- `query` (string): Search query
- `topK` (number, optional): Number of results (default 10)
- `filters` (object, optional): Search filters

**Returns:**

- Promise with search results

## 🐛 Troubleshooting

### Common Issues

#### 1. "OPENAI_API_KEY not found" Error

```bash
# Check .env file
cat .env

# Ensure API key is correct
export OPENAI_API_KEY="your_key_here"
```

#### 2. Movie Indexing Error

```bash
# Check Upstash connection
npm run ingest

# Check environment variables
echo $UPSTASH_VECTOR_REST_URL
echo $UPSTASH_VECTOR_REST_TOKEN
```

#### 3. Tool Execution Error

```bash
# Check error logs
npm start "test message" 2>&1 | tee error.log

# Check dependencies
npm install
```

### Debugging

```bash
# Run with debugging
DEBUG=* npm start "test message"

# Check agent memory
cat db.json | jq '.messages'

# Test specific tool
npx tsx -e "
import { dadJoke } from './src/tools/dadJoke.js';
console.log(await dadJoke({ toolArgs: {} }));
"
```

## 🤝 Contributing

### How to Contribute

1. **Fork** repository
2. **Create branch** for new feature
3. **Implement** changes
4. **Add tests** for new features
5. **Create Pull Request**

### Code Standards

- **TypeScript** with strict mode
- **ESLint** for code quality
- **Prettier** for formatting
- **Jest** for testing
- **Conventional Commits** for commits

### Commit Structure

```
feat: add new weather tool
fix: fix movie search bug
docs: update README
test: add image generation tests
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT and DALL-E APIs
- **Upstash** for vector database
- **Reddit** for posts API
- **IMDB** for movie data
- **All contributors** to the project

## 📞 Contact

- **GitHub Issues**: [Create issue](https://github.com/rezis-work/ai-agent/issues)
- **Email**: karanadzerevazi@gmail.com

---

**Created with ❤️ and a lot of humor by the AI Agent team** 🤖✨

\_"Remember: the best code is code that makes you smile!"\* 😄

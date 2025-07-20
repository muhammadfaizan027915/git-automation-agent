# 🚀 MCP Git Automation with Gemini

This project uses **Google Gemini (via `@google/genai`)** and **Model Context Protocol (MCP)** to automatically stage, commit, and push code changes to a GitHub repository by invoking tools through function calling.

> 🧠 Powered by Generative AI + Function Calling
> 🔧 Driven by MCP's `git` toolset
> 🌐 Ideal for dev automation on **Windows 11**

---

## 📂 Project Structure

```
.
├── .env                          # Contains GOOGLE_GENAI_API_KEY
├── mcp.json                     # MCP server config
├── src/
│   ├── index.ts                 # Main entry point
│   └── mcp-client/
│       ├── index.ts
│       ├── load-mcp-config.ts
│       └── mcp-client.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Requirements

* Node.js ≥ 18.x
* Git installed and in your system PATH
* `.env` file with your Google API key:

```bash
GOOGLE_GENAI_API_KEY=your-api-key-here
```

---

## 🛠️ Setup Instructions

1. **Clone & Install Dependencies**

   ```bash
   git clone https://github.com/your-username/mcp-git-agent.git
   cd mcp-git-agent
   npm install
   ```

2. **Create `.env` File**

   ```bash
   echo "GOOGLE_GENAI_API_KEY=your-api-key" > .env
   ```

3. **Edit `mcp.json`** (if needed) to configure your MCP server.

---

## 🧪 Run in Development

```bash
npm run dev
```

This uses `tsx` to run TypeScript directly with environment variables.

---

## 📦 Build & Run

```bash
npm run start
```

This compiles TypeScript and runs the output from the `build/` folder.

---

## 🧠 What It Does

* Loads tools from MCP (e.g., `git_set_working_dir`, `git_commit`, `git_push`)
* Uses Gemini 2.5 Pro to generate a plan to commit/push code
* Calls tools in a loop until task completion
* Handles function calling and tool responses using structured messages

---

## 🔍 Example Prompt

```text
Stage and Commit the changes in current working directory and push code to GitHub.
```

The agent handles:

* Path detection
* Tool invocation via MCP
* Output validation and logging

---

## 📚 Powered By

* [@google/genai](https://www.npmjs.com/package/@google/genai)
* [Model Context Protocol SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk)

---

## 👤 Author

**Muhammad Faizan**
License: [ISC](LICENSE)
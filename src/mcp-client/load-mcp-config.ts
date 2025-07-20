import { StdioServerParameters } from "@modelcontextprotocol/sdk/client/stdio"
import fs from "fs/promises"
import path from "path"

export type McpConfig = {
    mcpServers: Record<string, StdioServerParameters>;
};

export async function loadMcpConfig(): Promise<McpConfig> {
    try {
        const configPath = path.join(process.cwd(), "mcp.json");
        const serverConfig = await fs.readFile(configPath, "utf8")

        return JSON.parse(serverConfig)
    } catch (error) {
        throw new Error("Error occurred while reading mcp.json.")
    }
}

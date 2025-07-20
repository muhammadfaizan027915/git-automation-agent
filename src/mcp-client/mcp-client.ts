import { Client } from "@modelcontextprotocol/sdk/client/index"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio"
import { loadMcpConfig } from "./load-mcp-config"

export class McpClient {
    client: Client

    private constructor(client: Client) {
        this.client = client;
    }

    static async init(): Promise<McpClient> {
        const client = new Client({ name: "mcp-client", version: "1.0.0" });

        const self = new McpClient(client);
        await self.connectToMcpServers();

        return self;
    }

    async connectToMcpServers() {
        const mcpConfig = await loadMcpConfig()

        for (const [name, params] of Object.entries(mcpConfig.mcpServers)) {

            const transport = new StdioClientTransport(params)

            await this.client.connect(transport)

            console.log('Connected to MCP Server: ', name)
        }

    }

    async getTools() {
        const result = await this.client.listTools()

        const tools = result.tools?.map(
            tool => ({
                name: tool.name,
                description: tool.description,
                input_schema: tool.inputSchema
            })
        )

        return tools
    }

    async runTool(name: string, args?: Record<string, unknown>) {

        try {
            const result = await this.client.callTool({ name, arguments: args })

            return result
        } catch (error) {
            console.log(`Error occurred while calling ${name} tool : `, error)
            return `Failed to call ${name} tool.`
        }

    }
}
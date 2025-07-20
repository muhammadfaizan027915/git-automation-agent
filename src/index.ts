import { GoogleGenAI, GoogleGenAIOptions, GenerateContentParameters, ContentListUnion } from "@google/genai"
import { McpClient } from "./mcp-client";

(async () => {
    const options: GoogleGenAIOptions = {
        apiKey: process.env.GOOGLE_GENAI_API_KEY
    }

    const ai = new GoogleGenAI(options);
    const mcp = await McpClient.init()
    const tools = await mcp.getTools()

    const prompt = {
        role: 'user',
        parts: [
            {
                text: `
                   Instructions: You can perform git commands using provided tools. Must use tools to perform your actions.
                   Task: Stage and Commit the changes in current working direcotry: ${process.cwd()}
                   Operating System: Windows 11 64bit

                   Output Format: {"success": boolean, "message": string}
                `,
            },
        ],
    }

    const contents: ContentListUnion = [prompt]

    const params: GenerateContentParameters = {
        config: {
            tools: [{
                functionDeclarations: tools
            }]
        },
        model: "gemini-2.5-pro",
        contents
    };

    mcp.runTool("git_set_working_dir", { path: "./" })

    while (true) {
        const response = await ai.models.generateContent(params)
        const functionCalls = response?.functionCalls;

        console.log("Sending Query to Gemini: ", JSON.stringify(prompt, null, 2))

        if (functionCalls && functionCalls?.length > 0) {

            for (const functionCall of functionCalls) {

                const { id, name, args } = functionCall;

                if (!name) {
                    throw new Error(`Unknown function call: ${name}`);
                }

                console.log(`Calling tool: ${name} with args: ${JSON.stringify(args, null, 2)}`)

                const toolResult = await mcp.runTool(name, args)

                console.log("Tool Call Result: ", toolResult)

                contents.push({
                    role: "model",
                    parts: [
                        {
                            functionCall,
                        },
                    ],
                });


                contents.push({
                    role: "user",
                    parts: [
                        {
                            functionResponse: {
                                id, name, response: {
                                    result: toolResult
                                }
                            },
                        },
                    ],
                });
            }

        } else {
            const responseText = response.text

            if (responseText) {
                console.log(response.text);
            }

            break;
        }

    }

})()

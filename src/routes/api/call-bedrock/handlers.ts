import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const SECRET = "[ENTER YOUR SECRET HERE]";
const ACCESS = "[ENTER YOUR SECRET HERE]";

// For text generation
const client = new BedrockRuntimeClient({
    region: 'us-east-2',
    credentials: {
        secretAccessKey: SECRET,
		accessKeyId: ACCESS
    }
});
// For image generation
const client2 = new BedrockRuntimeClient({
    region: 'us-west-2',
    credentials: {
        secretAccessKey: SECRET,
		accessKeyId: ACCESS
    }
});
const textDecoder = new TextDecoder("utf-8");

async function InvokeModel(params: any, handler: (response: any) => string, client: any): Promise<string> {
    const command = new InvokeModelCommand(params);
    let output = "";

    try {
        const data = await client.send(command);
        const res = JSON.parse(textDecoder.decode(data.body.buffer ?? data.body));
        output = handler(res);
    } catch (err) {
        console.error(err);
        throw new Error("There was a problem with the request");
    }
    return output;
}

export async function TextGenerator(prompt: string, temperature = 0.5, topP = 1.0): Promise<string> {
    const params = {
        contentType: "application/json",
        body: JSON.stringify({
            anthropic_version: "bedrock-2023-05-31",
            max_tokens: 500,
                messages: [
                {
                    role: "user",
                    content: [{ type: "text", text: prompt }],
                },
            ],
        }),
        modelId: "us.anthropic.claude-3-5-sonnet-20240620-v1:0",
    };

    return await InvokeModel(params, (response) => response.content[0].text.trim(), client);
}

export async function ImageGenerator(prompt: string): Promise<string> {
    const params = {
        body: JSON.stringify({
            prompt: prompt,
            "mode": "text-to-image",    
        }),
        modelId: 'stability.stable-image-ultra-v1:0',
        accept: 'application/json',
        contentType: 'application/json',
    };

    return await InvokeModel(params, (response) => response.images[0].trim(), client2);
}
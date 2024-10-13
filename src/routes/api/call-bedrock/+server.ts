import * as models from './handlers.js';

export async function POST(requestEvent): Promise<Response> {
    const { request } = requestEvent;
    const { model, prompt, temperature, topP } = await request.json()

    let response: String;

    switch (model) {
        case "bedrock-anthropic.claude-3.5-sonnet":
            response = await models.TextGenerator(prompt, temperature, topP);
            break;
        case "stability.stable-image-ultra-v1:0":
            response = await models.ImageGenerator(prompt);
            break;
        default:
            return new Response(JSON.stringify({ error: "Invalid model" }), {
                status: 400
            });
    }

    const output = { response };

    return new Response(JSON.stringify(output), { status: 200 })
}


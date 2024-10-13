import * as models from './handlers.js';

export async function POST(requestEvent): Promise<Response> {
    const { request } = requestEvent;
    const body = await request.json()

    let response: String;

    switch (body.model) {
        case "bedrock-anthropic.claude-3.5-sonnet":
            response = await models.TextGenerator(body.prompt, body.temperature, body.topP);
            break;
        case "stability.stable-image-ultra-v1:0":
            response = await models.ImageGenerator(body.prompt);
            break;
        default:
            return new Response(JSON.stringify({ error: "Invalid model" }), {
                status: 400
            });
    }

    //response = "";

    const output = { response };

    return new Response(JSON.stringify(output), { status: 200 })
}


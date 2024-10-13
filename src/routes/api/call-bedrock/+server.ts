import * as models from './handlers.js';

export async function POST(requestEvent): Promise<Response> {
    const { request } = requestEvent;
    const body = await request.json()

    let response: String;

    console.info(`> START model(${body.model})`);
    console.debug(body);

    switch (body.model) {
        case "bedrock-anthropic.claude-3.5-sonnet":
            response = await models.TextClaude(body.prompt, body.temperature, body.topP);
            break;
        case "stability.stable-image-ultra-v1:0":
            response = await models.ImageStableDiffusion(body.prompt);
            break;
        default:
            return new Response(JSON.stringify({ error: "Invalid model" }), {
                status: 400
            });
    }

    const output = {
        response: response,
    };

    console.info(`> FINISH model(${body.model}) resp(${response.substring(0, 25)}...${response.substring(response.length - 25, response.length)})`);
    return new Response(JSON.stringify(output), {
        status: 200
    })
}


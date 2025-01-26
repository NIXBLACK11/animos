// import { deepseek } from '@ai-sdk/deepseek';
// import { createDeepSeek } from '@ai-sdk/deepseek';

// const deepseek = createDeepSeek({
//   apiKey: process.env.DEEPSEEK_API_KEY ?? '',
// });

// import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    console.log(messages);

    const result = streamText({
        // model: deepseek('deepseek-chat'),
        // model: openai('gpt-4o-mini'),
        // model: google('gemini-1.5-pro-latest'),
        model: google('gemini-1.5-flash'),
        messages,
        tools: {
            weather: tool({
                description: 'Get the weather of a location in fahrenheit',
                parameters: z.object({
                    location: z.string().describe('The location to get the weather for'),
                }),
                execute: async ({ location }) => {
                    const temperature = Math.round(Math.random() * (90 - 32) + 32);
                    return {
                        location,
                        temperature,
                    };
                },
            }),
        },
    });
    for await (const textPart of result.textStream) {
        process.stdout.write(textPart);
    }

    return result.toDataStreamResponse();
}
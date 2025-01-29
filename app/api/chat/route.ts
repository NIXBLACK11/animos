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
        model: google('gemini-1.5-mini'),
        messages,
        tools: {
            get_weather_data: tool({
                description: 'Get the weather for the given location.',
                parameters: z.object({
                    location: z.string().describe('The location.'),
                }),
                execute: async ({ location }: { location: string }) => {
                    const apiKey = process.env.OPENWEATHER_API_KEY;
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
                    );
                    const data = await response.json();
                    console.log("Weather Tool Executed:", data); // Ensure this logs the correct data
                    return data; // Ensure this return is passed into AI output
                },
            }),
        },
    });
    
    for await (const textPart of result.textStream) {
        process.stdout.write(textPart);
    }

    return result.toDataStreamResponse();
}
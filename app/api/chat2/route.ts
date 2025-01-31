import { google } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.prompt) {
            return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
        }

        const { prompt } = body;

        const result = await generateText({
            model: google('gemini-1.5-flash'),
            prompt,
            tools: {
                get_weather_data: tool({
                    description: 'Get the weather for the given location.',
                    parameters: z.object({
                        location: z.string().describe('The location.'),
                    }),
                    execute: async ({ location }: { location: string }) => {
                        const apiKey = process.env.OPENWEATHER_API_KEY;
                        if (!apiKey) {
                            return { error: "Missing OpenWeather API key" };
                        }
                        console.log("brother, send location: " + location);
                        try {
                            const response = await fetch(
                                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
                            );
                            const data = await response.json();

                            if (data.cod !== 200) {
                                return { error: data.message };
                            }

                            // console.log("Weather Tool Executed:", data);
                            return {
                                location: data.name,
                                temperature: data.main.temp,
                                weather: data.weather[0].description
                            };
                        } catch (error) {
                            console.error("Weather Tool Error:", error);
                            return { error: "Failed to fetch weather data" };
                        }
                    },
                }),
            },
            maxRetries: 3,
            maxSteps: 3
        });

        return new Response(JSON.stringify({ text: result.text }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("POST Error:", error);
        return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
}

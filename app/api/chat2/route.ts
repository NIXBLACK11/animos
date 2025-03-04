import { z } from 'zod';
import Exa from "exa-js";
import { tavily } from "@tavily/core";
import { generateText, tool } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 30;
const exa = new Exa(process.env.EXA_API_KEY);
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

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
                get_related_papers_data: tool({
                    description: 'Get the related papers to a data',
                    parameters: z.object({
                        shortData: z.string().describe('The searchable form of the provided data'),
                    }),
                    execute: async ({ shortData }: { shortData: string }) => {
                        const apiKey = process.env.EXA_API_KEY;
                        if (!apiKey) {
                            return { error: "Missing Exa API key" };
                        }
                        console.log("inside the research paper", shortData);
                        try {
                            const response = await exa.search(
                                shortData,
                                {
                                    numResults: 4,
                                    category: 'research paper',
                                }
                            )
                            return {
                                results: response.results
                            };
                        } catch (error) {
                            console.error("Exa api error:", error);
                            return { error: "Failed to fetch ea api" };
                        }
                    },
                }),
                get_related_posts_data: tool({
                    description: 'Get the related X(Twitter) posts to this data',
                    parameters: z.object({
                        shortData: z.string().describe('The searchable form of the provided data'),
                    }),
                    execute: async ({ shortData }: { shortData: string }) => {
                        const apiKey = process.env.EXA_API_KEY;
                        if (!apiKey) {
                            return { error: "Missing Exa API key" };
                        }
                        try {
                            const response = await exa.search(
                                shortData,
                                {
                                    includeDomains: ["x.com", "twitter.com"],
                                    numResults: 4,
                                }
                            )
                            return {
                                results: response.results
                            };
                        } catch (error) {
                            console.error("Exa api error:", error);
                            return { error: "Failed to fetch ea api" };
                        }
                    },
                }),
                web_search: tool({
                    description: 'Search the apprpriate data from the web for this query',
                    parameters: z.object({
                        query: z.string().describe('The search query'),
                    }),
                    execute: async ({ query }: { query: string }) => {
                        const apiKey = process.env.TAVILY_API_KEY;
                        if (!apiKey) {
                            return { error: "Missing Tavily API key" };
                        }
                        console.log("Searching the web for:", query);
                        try {
                            const response = await tvly.search(query, {
                                searchDepth: "basic",
                                maxResults: 4,
                            });
                            console.log("Tavily API response:", response);
                            return {
                                results: response.results
                            };
                        } catch (error) {
                            console.error("Tavily API error:", error);
                            return { error: "Failed to fetch Tavily API" };
                        }
                    }
                }),
                web_search_links: tool({
                    description: 'Search the apprpriate data from the web for this query',
                    parameters: z.object({
                        query: z.string().describe('The search query'),
                    }),
                    execute: async ({ query }: { query: string }) => {
                        const apiKey = process.env.TAVILY_API_KEY;
                        if (!apiKey) {
                            return { error: "Missing Tavily API key" };
                        }
                        console.log("Searching the web for:", query);
                        try {
                            const response = await exa.search(
                                query,
                                {
                                    numResults: 4,
                                }
                            )
                            console.log(response.results);
                            return {
                                results: response.results
                            };
                        } catch (error) {
                            console.error("Tavily API error:", error);
                            return { error: "Failed to fetch Tavily API" };
                        }
                    }
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

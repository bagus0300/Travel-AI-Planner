import {
  batch1Schema,
  batch2Schema,
  batch3Schema
} from "./schemas";

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const promptSuffix = `generate travel data according to the schema and in json format,
                     do not return anything in your response outside of curly braces, 
                     generate response as per the functin schema provided`;

const callOpenAIApi = (prompt: string, schema: any, description: string) => {
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "system", content: "You are a helpful travel assistant." },
      { role: "user", content: prompt },
    ],
    functions: [{ name: "set_travel_details", parameters: schema, description }],
    function_call: { name: "set_travel_details" },
  });
}

export const generatebatch1 = (promptText: string) => {
  const prompt = `${promptText}, ${promptSuffix}`;
  const description = `Generate a description of information about a place or location according to the following schema:

  - Name of the Places:
    - A comma separaed string indicating the names of the user-input places or locations.
  
  - About the Place:
    - A string containing information about the place, comprising at least 50 words.
  
  - Best Time to Visit:
    - A string specifying the best time to visit the place.
  
  Ensure that the function response adheres to the schema provided and is in JSON format. The response should not contain anything outside of the defined schema.
  `;
  return callOpenAIApi(prompt, batch1Schema, description);
}

export const generatebatch2 = (promptText: string) => {
  const prompt = `${promptText}, ${promptSuffix}`;
  const description = `Generate a description of recommendations for an adventurous trip according to the following schema:
  - Top Adventures Activities:
    - An array listing top adventure activities to do, including at least 5 activities.
    - Each activity should be specified along with its location.
  
  - Local Cuisine Recommendations:
    - An array providing recommendations for local cuisine to try during the trip.
  
  - Packing Checklist:
    - An array containing items that should be included in the packing checklist for the trip.
  
  Ensure that the function response adheres to the schema provided and is in JSON format. The response should not contain anything outside of the defined schema.`;
  return callOpenAIApi(prompt, batch2Schema, description);
}

export const generatebatch3 = (promptText: string) => {
  const prompt = `${promptText}, ${promptSuffix}`;
  const description = `Generate a description of a travel itinerary and top places to visit according to the following schema:
  - Itinerary:
    - An array containing details of the itinerary for the specified number of days.
    - Each day's itinerary includes a title and activities for morning, afternoon, and evening.
    - Activities are described as follows:
      - Morning, Afternoon, Evening:
        - Each includes an array of itinerary items, where each item has a description and a brief description.
  
  - Top Places to Visit:
    - An array listing the top places to visit along with their coordinates.
    - Each place includes a name and coordinates (latitude and longitude).
  
  Ensure that the function response adheres to the schema provided and is in JSON format. The response should not contain anything outside of the defined schema.`;
  return callOpenAIApi(prompt, batch3Schema, description);
}
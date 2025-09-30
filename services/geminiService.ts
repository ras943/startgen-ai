
import { GoogleGenAI, Type } from "@google/genai";
import type { StrategyInput, GeneratedStrategy, Strategy, MonetizationPlan } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const strategySchema = {
    type: Type.OBJECT,
    properties: {
        keyPillars: {
            type: Type.ARRAY,
            description: "3-4 main themes or topics to focus content on.",
            items: {
                type: Type.OBJECT,
                properties: {
                    pillar: { type: Type.STRING, description: "The name of the content pillar." },
                    description: { type: Type.STRING, description: "A brief description of this pillar." }
                },
                required: ["pillar", "description"]
            }
        },
        contentIdeas: {
            type: Type.ARRAY,
            description: "A list of 5-7 specific content ideas.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A catchy title for the content piece." },
                    format: { type: Type.STRING, description: "The format of the content (e.g., Blog Post, Video, Infographic, Social Media Carousel)." },
                    description: { type: Type.STRING, description: "A brief description of what the content will cover." }
                },
                required: ["title", "format", "description"]
            }
        },
        distributionChannels: {
            type: Type.ARRAY,
            description: "Recommended channels to distribute the content.",
            items: {
                type: Type.OBJECT,
                properties: {
                    channel: { type: Type.STRING, description: "The name of the channel (e.g., Blog, LinkedIn, Instagram, YouTube)." },
                    strategy: { type: Type.STRING, description: "A brief strategy for using this channel." }
                },
                required: ["channel", "strategy"]
            }
        },
        kpis: {
            type: Type.ARRAY,
            description: "Key Performance Indicators to measure the success of the strategy.",
            items: {
                type: Type.OBJECT,
                properties: {
                    metric: { type: Type.STRING, description: "The metric to track (e.g., Website Traffic, Lead Generation, Engagement Rate)." },
                    goal: { type: Type.STRING, description: "A specific goal for this metric." }
                },
                required: ["metric", "goal"]
            }
        }
    },
    required: ["keyPillars", "contentIdeas", "distributionChannels", "kpis"]
};

const monetizationPlanSchema = {
    type: Type.OBJECT,
    properties: {
        monetizationIdeas: {
            type: Type.ARRAY,
            description: "A list of 3-4 specific monetization ideas, each linked to a content idea from the provided strategy.",
            items: {
                type: Type.OBJECT,
                properties: {
                    contentIdeaTitle: { type: Type.STRING, description: "The exact title of the content idea this monetization method applies to." },
                    method: { type: Type.STRING, description: "The monetization method (e.g., Affiliate Marketing, Sponsored Content, Digital Product)." },
                    description: { type: Type.STRING, description: "A detailed, actionable description of how to implement this method for the specific content idea." }
                },
                required: ["contentIdeaTitle", "method", "description"]
            }
        },
        outreachTemplates: {
            type: Type.ARRAY,
            description: "2-3 distinct outreach templates for potential sponsors, affiliates, or collaborators.",
            items: {
                type: Type.OBJECT,
                properties: {
                    platform: { type: Type.STRING, description: "The platform this template is for (e.g., Email, LinkedIn Message)." },
                    subject: { type: Type.STRING, description: "A compelling subject line for the message. Only for Email platform." },
                    body: { type: Type.STRING, description: "The full body of the outreach message. Use placeholders like [Company Name] or [Your Name]." }
                },
                required: ["platform", "body"]
            }
        }
    },
    required: ["monetizationIdeas", "outreachTemplates"]
};


export const generateStrategy = async (input: StrategyInput): Promise<GeneratedStrategy | null> => {
    const { topic, goal, audience, tone, framework } = input;

    const prompt = `
    You are an expert content strategist. Create a comprehensive content strategy based on the following details.
    Topic: ${topic}
    Primary Goal: ${goal}
    Target Audience: ${audience}
    Desired Tone: ${tone}
    Optional Framework: ${framework || 'Not specified'}

    Provide a detailed strategy including key content pillars, a list of specific content ideas with formats, recommended distribution channels, and key performance indicators (KPIs) to track success. Return the output in JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: strategySchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as GeneratedStrategy;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate content from AI. Please check your API key and network connection.");
    }
};

export const generateMonetizationPlan = async (strategy: Strategy): Promise<MonetizationPlan | null> => {
    const prompt = `
    You are a growth marketing expert specializing in content monetization.
    Based on the following content strategy, create a detailed monetization and outreach plan.

    **Content Strategy to Analyze:**
    - **Topic:** ${strategy.topic}
    - **Goal:** ${strategy.goal}
    - **Target Audience:** ${strategy.audience}
    - **Key Content Pillars:** ${strategy.keyPillars.map(p => p.pillar).join(', ')}
    - **Content Ideas:**
      ${strategy.contentIdeas.map(idea => `- ${idea.title} (${idea.format})`).join('\n      ')}

    **Your Task:**
    1.  Suggest 3-4 specific, actionable monetization ideas. Each idea must be directly tied to one of the content ideas listed above.
    2.  Provide 2-3 distinct outreach templates (e.g., for email, LinkedIn) to contact potential sponsors, affiliate partners, or collaborators. The templates should be professional, persuasive, and ready to use with minor edits.

    Return the output in JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: monetizationPlanSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as MonetizationPlan;

    } catch (error) {
        console.error("Gemini API call for monetization plan failed:", error);
        return null;
    }
};

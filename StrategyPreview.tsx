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
${strategy.contentIdeas.map(idea => `- ${idea.title} (${idea.format})`).join('\n ')}
    **Your Task:**
    1. Suggest 3-4 specific, actionable monetization ideas. Each idea must be directly tied to one of the content ideas listed above.
    2. Provide 2-3 distinct outreach templates (e.g., for email, LinkedIn) to contact potential sponsors, affiliate partners, or collaborators. The templates should be professional, persuasive, and ready to use with minor edits.
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
    try {
      return JSON.parse(jsonText) as MonetizationPlan;
    } catch (parseError) {
      console.error("Failed to parse monetization plan JSON:", parseError, jsonText);
      return null;
    }
  } catch (error) {
    console.error("Gemini API call for monetization plan failed:", error);
    return null;
  }
};

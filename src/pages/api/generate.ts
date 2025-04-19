export default async function handler(req, res) {
  const { language, difficulty, theme, input } = req.body;

  const prompt = `
You are a language storytelling assistant.

Write a short ${difficulty} story in ${language}.
The theme is: ${theme}.
Begin the story with this user input: "${input}"
Continue the story in an immersive and engaging way for a learner.

At the end, include some vocabulary that would help the reader.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "Error generating story.";
  res.status(200).json({ story: content });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ result: "Method Not Allowed" });
  }

  const { diary } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an emotional analysis assistant. Analyze the emotion of the diary briefly in Korean."
          },
          {
            role: "user",
            content: diary
          }
        ]
      })
    });

    const data = await response.json();

    const result = data.choices[0].message.content;

    res.status(200).json({ result });

  } catch (error) {
    res.status(500).json({ result: "AI 분석 중 오류 발생" });
  }
}

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
            content: "사용자의 일기를 읽고 감정을 간단히 한국어로 분석해줘."
          },
          {
            role: "user",
            content: diary
          }
        ]
      })
    });

    const data = await response.json();

    // 🔥 여기서 실제 OpenAI 응답 확인
    if (!response.ok) {
      return res.status(500).json({
        result: "OpenAI 오류: " + JSON.stringify(data)
      });
    }

    const result = data.choices[0].message.content;

    res.status(200).json({ result });

  } catch (error) {
    res.status(500).json({
      result: "서버 내부 오류: " + error.message
    });
  }
}

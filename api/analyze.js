export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ result: "Method Not Allowed" });
  }

  const { diary } = req.body;

  res.status(200).json({
    result: `입력한 글자 수: ${diary.length}자`
  });
}

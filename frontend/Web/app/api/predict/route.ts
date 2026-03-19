import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Get the Flask API URL from environment variable or use default
    const apiUrl =
      process.env.FLASK_API_URL || "http://127.0.0.1:5000/predict"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Flask API error: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Prediction error:", error)

    // For demo/testing purposes when Flask API is not available
    // Return a mock response based on the form data
    if (process.env.NODE_ENV === "development" || !process.env.FLASK_API_URL) {
      const data = await request
        .clone()
        .json()
        .catch(() => ({}))

      // Simple mock logic: count how many risk factors are present
      const riskFactors = [
        "Melancholic",
        "Future_Hopelessness",
        "Self_Perceived_Failure",
        "Interest_Loss",
        "Meaninglessness",
        "Hopelessness_EndFeeling",
        "Feeling_Insignificant",
        "Suicidal_Thoughts",
        "Social_Withdrawal",
        "Anhedonia_No_Joy",
        "Insomnia",
        "Loneliness_Frequency",
      ]

      const riskCount = riskFactors.reduce((count, factor) => {
        return count + (data[factor] === 1 ? 1 : 0)
      }, 0)

      // If more than half of key risk factors are present, predict high risk
      const prediction = riskCount > riskFactors.length / 2 ? 1 : 0
      const confidence =
        0.65 +
        Math.abs(riskCount / riskFactors.length - 0.5) * 0.35 +
        Math.random() * 0.1

      return NextResponse.json({
        prediction,
        confidence: Math.min(confidence, 0.98),
        mock: true,
      })
    }

    return NextResponse.json(
      { error: "Failed to get prediction" },
      { status: 500 }
    )
  }
}

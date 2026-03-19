import { NextResponse } from "next/server";

interface PredictRequest {
  name: string;
  submitted_at: string;
  responses: Record<string, number>;
}

export async function POST(request: Request) {
  // Parse the request body first so we can use it in both try and catch
  let data: PredictRequest;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  // Check if Flask API URL is configured
  // const apiUrl = process.env.FLASK_API_URL
  const apiUrl = "http://127.0.0.1:5000/predict";

  // If no Flask API URL is configured, use mock response
  if (!apiUrl) {
    console.warn("FLASK_API_URL not configured, using mock response");
    return generateMockResponse(data);
  }

  try {
    // const response = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //  // body: JSON.stringify(data),
    //   body: JSON.stringify(data.responses),
    // })
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.responses),
    });

    if (!response.ok) {
      throw new Error(`Flask API error: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Prediction error:", error);
    // Fallback to mock response if Flask API fails
    return generateMockResponse(data);
  }
}

function generateMockResponse(data: PredictRequest) {
  const responses = data.responses || {};

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
  ];

  const riskCount = riskFactors.reduce((count, factor) => {
    return count + (responses[factor] === 1 ? 1 : 0);
  }, 0);

  // If more than half of key risk factors are present, predict high risk
  const prediction = riskCount > riskFactors.length / 2 ? 1 : 0;
  const confidence =
    0.65 +
    Math.abs(riskCount / riskFactors.length - 0.5) * 0.35 +
    Math.random() * 0.1;

  // Generate evaluation based on prediction
  const submittedDate = new Date(data.submitted_at).toLocaleDateString();
  const evaluation =
    prediction === 1
      ? `Based on the assessment completed on ${submittedDate}, several indicators suggest that ${data.name} may be experiencing symptoms commonly associated with depression. This is not a clinical diagnosis but indicates that professional support could be beneficial.`
      : `Based on the assessment completed on ${submittedDate}, ${data.name}'s responses indicate that current mental health indicators are within normal ranges. This is encouraging, though mental health should be monitored regularly.`;

  // Generate recommendations based on prediction
  const recommendations =
    prediction === 1
      ? [
          "Schedule an appointment with a mental health professional for a comprehensive evaluation",
          "Reach out to trusted friends or family members about your feelings",
          "Establish a consistent daily routine including regular sleep and meal times",
          "Engage in physical activity for at least 30 minutes daily",
          "Practice mindfulness or relaxation techniques to manage stress",
          "If experiencing thoughts of self-harm, contact a crisis helpline immediately",
        ]
      : [
          "Continue maintaining healthy sleep habits (7-9 hours per night)",
          "Stay physically active with regular exercise",
          "Nurture social connections and relationships",
          "Practice stress management techniques",
          "Monitor your mood and seek support if you notice changes",
        ];

  return NextResponse.json({
    prediction,
    confidence: Math.min(confidence, 0.98),
    evaluation,
    recommendations,
    name: data.name,
    submitted_at: data.submitted_at,
    mock: true,
  });
}

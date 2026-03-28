import { NextResponse } from "next/server";
import { convertToBackendFormat } from "@/lib/assessment-data";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

interface PredictRequest {
  name: string;
  submitted_at: string;
  responses: Record<string, number | string>;
}

export async function POST(request: Request) {
  let data: PredictRequest;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  // Convert frontend responses to backend format
  const backendResponses = convertToBackendFormat(data.responses);

  const flaskRequestBody = {
    name: data.name,
    submitted_at: data.submitted_at,
    ...backendResponses,
  };

  const apiUrl = "http://127.0.0.1:5000/predict";

  try {
    // -------------------------
    // CALL FLASK MODEL
    // -------------------------
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flaskRequestBody),
    });

    if (!response.ok) {
      throw new Error(`Flask API error: ${response.statusText}`);
    }

    const result = await response.json();

    console.log("Flask prediction:", result);

    // -------------------------
    // GEMINI AI ANALYSIS
    // -------------------------
//     let aiOutput = {
//       evaluation: "",
//       recommendations: [] as string[],
//     };

//     try {
//       const genAI = new GoogleGenerativeAI(
//         "AIzaSyCp-fRnoiNuu6HxDc-by_wXcW4Y9untFgw",
//       );

//       // const model = genAI.getGenerativeModel({
//       //   model: "gemini-pro",
//       // })

//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-pro",
//         safetySettings: [
//           {
//             category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//             threshold: HarmBlockThreshold.BLOCK_NONE,
//           },
//           // Add other categories as needed for your specific use case
//         ],
//       });
//       const prompt = `
// A depression assessment produced the following result.

// Prediction: ${result.prediction}
// Confidence: ${result.confidence}

// User: ${data.name}
// Date: ${data.submitted_at}

// Write:

// 1. A short supportive mental health evaluation paragraph
// 2. 5 helpful recommendations

// Return JSON only:

// {
//  "evaluation": "...",
//  "recommendations": ["...", "..."]
// }
// `;

//       const geminiRes = await model.generateContent(prompt);

//       // const text = geminiRes.response.text();

//       // console.log("Gemini raw output:", text);

//       // try {
//       //   aiOutput = JSON.parse(text);
//       // } catch {
//       //   aiOutput = {
//       //     evaluation: text,
//       //     recommendations: [],
//       //   };
//       // }
//       let text = geminiRes.response.text();

//       console.log("Gemini raw output:", text);

//       // remove markdown formatting
//       text = text
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//       console.log("Cleaned Gemini:", text);

//       try {
//         aiOutput = JSON.parse(text);
//       } catch {
//         aiOutput = {
//           evaluation: text,
//           recommendations: [],
//         };
//       }
//     } catch (geminiError) {
//       console.log("Gemini failed:", geminiError);
//       aiOutput = {
//         evaluation: "AI evaluation currently unavailable.",
//         recommendations: [],
//       };
//     }

    const finalResponse = {
      // prediction: result.prediction,
      prediction: result.prediction,
      confidence: result.confidence,
      // evaluation: aiOutput.evaluation,
      // recommendations: aiOutput.recommendations,
      name: data.name,
      submitted_at: data.submitted_at,
    };

    console.log("Final API response:", finalResponse);

    return NextResponse.json(finalResponse);
  } catch (error) {
    console.error("Prediction error:", error);
    return generateMockResponse(data);
  }
}

function generateMockResponse(data: PredictRequest) {
  return NextResponse.json({
    prediction: 0,
    confidence: 0.7,
    evaluation: "Unable to fetch AI analysis.",
    recommendations: [
      "Maintain a healthy routine",
      "Stay connected with friends and family",
      "Exercise regularly",
      "Practice relaxation techniques",
      "Seek professional help if needed",
    ],
    name: data.name,
    submitted_at: data.submitted_at,
    mock: true,
  });
}

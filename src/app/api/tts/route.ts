import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

// Initialize the client (will use environment variables for credentials)
let client: TextToSpeechClient | null = null;

function getClient() {
  if (!client) {
    // Check if we have credentials
    if (
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      process.env.GOOGLE_CLOUD_PROJECT
    ) {
      client = new TextToSpeechClient();
    } else {
      // Try to use service account key from environment variable
      const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
      if (serviceAccountKey) {
        try {
          const credentials = JSON.parse(serviceAccountKey);
          client = new TextToSpeechClient({
            credentials,
          });
        } catch (error) {
          console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY:", error);
        }
      }
    }
  }
  return client;
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const ttsClient = getClient();

    if (!ttsClient) {
      return NextResponse.json(
        {
          error:
            "Google Cloud TTS not configured. Please set up GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_SERVICE_ACCOUNT_KEY environment variable.",
        },
        { status: 500 }
      );
    }

    // Request TTS synthesis
    const [response] = await ttsClient.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Neural2-F", // Friendly female voice
        ssmlGender: "FEMALE" as const,
      },
      audioConfig: {
        audioEncoding: "MP3" as const,
        speakingRate: 0.95, // Slightly slower for clarity
        pitch: 2.0, // Slightly higher pitch for friendly tone
        volumeGainDb: 2.0, // Slightly louder
      },
    });

    if (!response.audioContent) {
      return NextResponse.json(
        { error: "Failed to generate audio" },
        { status: 500 }
      );
    }

    // Convert audio content to base64 for transmission
    const audioBase64 = Buffer.from(response.audioContent).toString("base64");

    return NextResponse.json({
      audio: audioBase64,
      format: "mp3",
    });
  } catch (error: any) {
    console.error("TTS Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to generate speech",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}


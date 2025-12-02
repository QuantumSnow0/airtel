import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

// Initialize the client (will use environment variables for credentials)
let client: TextToSpeechClient | null = null;

function getClient() {
  if (!client) {
    // In production, prefer GOOGLE_SERVICE_ACCOUNT_KEY (JSON string)
    // In development, can use GOOGLE_APPLICATION_CREDENTIALS (file path)
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      try {
        const credentials = JSON.parse(serviceAccountKey);
        console.log("✅ Using GOOGLE_SERVICE_ACCOUNT_KEY for TTS");
        client = new TextToSpeechClient({
          credentials,
        });
      } catch (error) {
        console.error("❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY:", error);
      }
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Try file path (works in development, may not work in production)
      try {
        console.log("✅ Using GOOGLE_APPLICATION_CREDENTIALS file for TTS");
        client = new TextToSpeechClient();
      } catch (error) {
        console.error("❌ Failed to initialize TTS with GOOGLE_APPLICATION_CREDENTIALS:", error);
      }
    } else {
      console.error("❌ No Google Cloud TTS credentials found. Set GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS");
    }
  }
  return client;
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      console.error("❌ TTS API: Invalid text input");
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    console.log("📝 TTS API: Request received, text length:", text.length);

    const ttsClient = getClient();

    if (!ttsClient) {
      console.error("❌ TTS API: Client not initialized");
      console.error("   GOOGLE_SERVICE_ACCOUNT_KEY:", process.env.GOOGLE_SERVICE_ACCOUNT_KEY ? "✅ Set" : "❌ Not set");
      console.error("   GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS || "❌ Not set");
      return NextResponse.json(
        {
          error:
            "Google Cloud TTS not configured. Please set up GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_SERVICE_ACCOUNT_KEY environment variable.",
        },
        { status: 500 }
      );
    }

    console.log("🎙️ TTS API: Synthesizing speech...");

    // Request TTS synthesis
    // Voice options (uncomment the one you prefer):
    // Neural2 (current - good quality): "en-US-Neural2-F"
    // WaveNet (premium - very smooth): "en-US-Wavenet-F" or "en-US-Wavenet-D" (male)
    // Studio (highest quality - most natural): "en-US-Studio-M" or "en-US-Studio-O" (optimized)
    const [response] = await ttsClient.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-F", // WaveNet female voice - smoother and more natural
        ssmlGender: "FEMALE" as const,
      },
      audioConfig: {
        audioEncoding: "MP3" as const,
        speakingRate: 1.0, // Normal speed (adjust 0.8-1.2 for slower/faster)
        pitch: 0.0, // Neutral pitch (adjust -20 to +20 semitones)
        volumeGainDb: 0.0, // Normal volume (adjust -96 to +16 dB)
      },
    });

    if (!response.audioContent) {
      console.error("❌ TTS API: No audio content in response");
      return NextResponse.json(
        { error: "Failed to generate audio" },
        { status: 500 }
      );
    }

    // Convert audio content to base64 for transmission
    const audioBase64 = Buffer.from(response.audioContent).toString("base64");
    console.log("✅ TTS API: Audio generated successfully, size:", audioBase64.length, "bytes");

    return NextResponse.json({
      audio: audioBase64,
      format: "mp3",
    });
  } catch (error: any) {
    console.error("❌ TTS API Error:", {
      message: error.message,
      code: error.code,
      details: error.toString(),
      stack: error.stack,
    });
    return NextResponse.json(
      {
        error: error.message || "Failed to generate speech",
        details: error.toString(),
        code: error.code,
      },
      { status: 500 }
    );
  }
}


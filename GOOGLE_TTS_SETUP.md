# Google Cloud Text-to-Speech Setup Guide

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID

## Step 2: Enable Text-to-Speech API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Cloud Text-to-Speech API"
3. Click on it and click **Enable**

## Step 3: Create a Service Account

1. Go to **IAM & Admin** > **Service Accounts**
2. Click **Create Service Account**
3. Give it a name (e.g., "tts-service")
4. Click **Create and Continue**
5. Grant it the role: **Cloud Text-to-Speech API User**
6. Click **Done**

## Step 4: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Choose **JSON** format
5. Download the key file

## Step 5: Configure Environment Variables

You have two options:

### Option 1: Local Development (using file path)

1. Place the downloaded JSON file in your project (e.g., `credentials/google-tts-key.json`)
2. Add to your `.env.local` file:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./credentials/google-tts-key.json
   GOOGLE_CLOUD_PROJECT=your-project-id
   ```

### Option 2: Deployment (using JSON string)

1. Open the downloaded JSON file
2. Copy its entire contents
3. Add to your environment variables (e.g., in Vercel, Netlify, etc.):
   ```
   GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...",...}
   GOOGLE_CLOUD_PROJECT=your-project-id
   ```

## Step 6: Test

1. Start your development server: `npm run dev`
2. The robot should now use Google Cloud TTS with a high-quality voice
3. If the API is not configured, it will automatically fall back to browser TTS

## Free Tier

Google Cloud Text-to-Speech offers:

- **0-4 million characters per month FREE**
- After that: $4 per 1 million characters

This should be more than enough for most applications!

## Troubleshooting

- **Error: "Google Cloud TTS not configured"**: Make sure your environment variables are set correctly
- **Error: "Permission denied"**: Make sure the service account has the "Cloud Text-to-Speech API User" role
- **Fallback to browser TTS**: The app will automatically use browser TTS if Google Cloud TTS fails

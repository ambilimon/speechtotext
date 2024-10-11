# Audio Transcription App

This Next.js 14 application allows users to record audio, transcribe it using Deepgram, and store the transcription in a Google Sheet, all via Make.com.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in the required value:
     - `MAKE_WEBHOOK_URL`: Your Make.com webhook URL for Deepgram and Google Sheets integration

4. Run the development server:
   ```
   npm run dev
   ```

## Usage

1. Open the application in your browser
2. Click "Start Recording" to begin audio capture
3. Click "Stop Recording" when finished
4. Click "Transcribe Audio" to send the recording for transcription
5. View the transcription result on the page
6. The transcription is automatically added to your Google Sheet via Make.com

## Deployment

1. Build the application:
   ```
   npm run build
   ```
2. Deploy to your preferred hosting platform (e.g., Vercel, Netlify)

## Make.com Setup

1. Create a new scenario in Make.com
2. Add a webhook trigger as the first module
3. Add a Deepgram module to transcribe the audio
4. Add a Google Sheets module to append the transcription
5. Configure the webhook URL in your `.env.local` file

## Security Notes

- Ensure that your `.env.local` file is not committed to version control
- Properly secure your Make.com webhook
- Implement appropriate access controls for your Google Sheet in Make.com

## Troubleshooting

- If you encounter CORS issues, ensure your Make.com webhook is configured to allow requests from your application's domain
- For Make.com integration issues, check the scenario execution logs in Make.com
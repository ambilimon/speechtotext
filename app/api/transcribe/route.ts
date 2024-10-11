import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Upload to Make.com webhook
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!makeWebhookUrl) {
      throw new Error('Make.com webhook URL is not configured');
    }

    const makeFormData = new FormData();
    makeFormData.append('audio', audioFile);

    const makeResponse = await axios.post(makeWebhookUrl, makeFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (!makeResponse.data || !makeResponse.data.transcription) {
      throw new Error('Invalid response from Make.com');
    }

    const transcription = makeResponse.data.transcription;

    return NextResponse.json({ transcription });
  } catch (error) {
    console.error('Error in transcribe API:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred during transcription'
    }, { status: 500 });
  }
}
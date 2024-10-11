"use client";

import { useState } from 'react';
import AudioRecorder from '@/components/AudioRecorder';
import TranscriptionResult from '@/components/TranscriptionResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Home() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleAudioRecorded = (blob: Blob) => {
    setAudioBlob(blob);
  };

  const handleTranscribe = async () => {
    if (!audioBlob) {
      toast({
        title: "Error",
        description: "Please record audio first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Transcription failed');
      }

      const data = await response.json();
      setTranscription(data.transcription);
      toast({
        title: "Success",
        description: "Audio transcribed successfully!",
      });
    } catch (error) {
      console.error('Error during transcription:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred during transcription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Audio Transcription App</h1>
      <div className="max-w-md mx-auto">
        <AudioRecorder onAudioRecorded={handleAudioRecorded} />
        <Button 
          onClick={handleTranscribe} 
          className="w-full mt-4" 
          disabled={!audioBlob || isLoading}
        >
          {isLoading ? 'Transcribing...' : 'Transcribe Audio'}
        </Button>
        <TranscriptionResult transcription={transcription} />
      </div>
    </div>
  );
}
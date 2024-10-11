import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TranscriptionResultProps {
  transcription: string;
}

const TranscriptionResult: React.FC<TranscriptionResultProps> = ({ transcription }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Transcription Result</CardTitle>
      </CardHeader>
      <CardContent>
        {transcription ? (
          <p>{transcription}</p>
        ) : (
          <p className="text-muted-foreground">No transcription available yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TranscriptionResult;
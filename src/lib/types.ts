export enum MessageType {
  User = 'user',
  Model = 'model',
  Error = 'error',
}

export interface Message {
  role: 'user' | 'model' | 'error';
  text: string;
  isAudioPlaying?: boolean;
  image?: { data: string; mimeType: string };
}

export interface LiveSession {
  sendRealtimeInput: (input: { media: { data: string; mimeType: string } } | { text: string }) => void;
  sendToolResponse: (toolResponse: { functionResponses: { id: string; name: string; response: { result: string } } }) => void;
  close: () => void;
}
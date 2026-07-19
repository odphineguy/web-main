export enum MessageType {
  User = 'user',
  Model = 'model',
  Error = 'error',
}

export interface Message {
  role: 'user' | 'model' | 'error';
  text: string;
  image?: { data: string; mimeType: string };
}
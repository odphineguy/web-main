export interface Message {
  role: 'user' | 'model' | 'error';
  text: string;
}
"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { Message, LiveSession } from '../../lib/types';
import { sendMessageToGemini, getOrCreateChatSession, INITIAL_MESSAGE } from '../../lib/geminiService';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { decodeAudioData } from '../../lib/audioUtils';
import { MODEL_AUDIO_SAMPLE_RATE, MICROPHONE_SAMPLE_RATE, AUDIO_CHUNK_SIZE } from '../../lib/geminiService';

const ChatbotApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: INITIAL_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const liveSessionRef = useRef<LiveSession | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const playingAudioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const currentInputTranscriptionRef = useRef<string>('');
  const currentOutputTranscriptionRef = useRef<string>('');
  const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);

  // Initialize audio contexts
  useEffect(() => {
    const AudioContextCompat = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    inputAudioContextRef.current = new AudioContextCompat({ sampleRate: MICROPHONE_SAMPLE_RATE });
    outputAudioContextRef.current = new AudioContextCompat({ sampleRate: MODEL_AUDIO_SAMPLE_RATE });
    outputNodeRef.current = outputAudioContextRef.current.createGain();
    outputNodeRef.current.connect(outputAudioContextRef.current.destination);

    return () => {
      if (inputAudioContextRef.current) inputAudioContextRef.current.close();
      if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    };
  }, []);

  const stopAllAudio = useCallback(() => {
    playingAudioSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        console.warn('Error stopping audio source:', e);
      }
    });
    playingAudioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setMessages(prev => prev.map(msg => ({ ...msg, isAudioPlaying: false })));
  }, []);

  const playAudio = useCallback(async (base64AudioString: string) => {
    const outputAudioContext = outputAudioContextRef.current;
    const outputNode = outputNodeRef.current;

    if (!outputAudioContext || !outputNode) return;

    try {
      nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);

      const audioBuffer = await decodeAudioData(
        decode(base64AudioString),
        outputAudioContext,
        MODEL_AUDIO_SAMPLE_RATE,
        1,
      );

      const source = outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(outputNode);

      source.addEventListener('ended', () => {
        playingAudioSourcesRef.current.delete(source);
        setMessages(prev => prev.map(msg => {
          if (msg.role === 'model' && msg.text === currentOutputTranscriptionRef.current) {
            return { ...msg, isAudioPlaying: false };
          }
          return msg;
        }));
      });

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;
      playingAudioSourcesRef.current.add(source);

      setMessages(prev => {
        const lastModelMessageIndex = prev.findIndex(msg => msg.role === 'model' && msg.text === currentOutputTranscriptionRef.current);
        if (lastModelMessageIndex !== -1) {
          const newHistory = [...prev];
          newHistory[lastModelMessageIndex] = { ...newHistory[lastModelMessageIndex], isAudioPlaying: true };
          return newHistory;
        }
        return prev;
      });

    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }, [stopAllAudio]);

  const decode = (base64: string): Uint8Array => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const createGeminiClient = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      throw new Error("NEXT_PUBLIC_API_KEY is not defined. Please ensure it's set in your environment.");
    }
    return new GoogleGenAI({ apiKey });
  };

  const encode = (bytes: Uint8Array): string => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const createBlob = (data: Float32Array): { data: string; mimeType: string } => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: `audio/pcm;rate=${MICROPHONE_SAMPLE_RATE}`,
    };
  };

  const initiateLiveSession = useCallback(async () => {
    setIsLoading(true);
    stopAllAudio();

    try {
      const ai = createGeminiClient();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const inputAudioContext = inputAudioContextRef.current;
      if (!inputAudioContext) {
        throw new Error('Input audio context not initialized.');
      }

      const source = inputAudioContext.createMediaStreamSource(stream);
      sourceNodeRef.current = source;
      const scriptProcessor = inputAudioContext.createScriptProcessor(AUDIO_CHUNK_SIZE, 1, 1);
      scriptProcessorRef.current = scriptProcessor;

      scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
        const pcmBlob = createBlob(inputData);
        sessionPromiseRef.current?.then((session) => {
          session.sendRealtimeInput({ media: pcmBlob });
        });
      };

      source.connect(scriptProcessor);
      scriptProcessor.connect(inputAudioContext.destination);

      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.debug('Live session opened.');
            setIsLoading(false);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              currentOutputTranscriptionRef.current += text;
              setMessages(prev => {
                const lastModelMessage = prev[prev.length - 1];
                if (lastModelMessage && lastModelMessage.role === 'model' && lastModelMessage.isAudioPlaying) {
                  return prev.map((msg, idx) => idx === prev.length - 1 ? { ...msg, text: currentOutputTranscriptionRef.current } : msg);
                }
                return [...prev, { role: 'model', text: currentOutputTranscriptionRef.current, isAudioPlaying: false }];
              });
            } else if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              currentInputTranscriptionRef.current += text;
              setMessages(prev => {
                const lastUserMessage = prev[prev.length - 1];
                if (lastUserMessage && lastUserMessage.role === 'user' && !lastUserMessage.isAudioPlaying) {
                  return prev.map((msg, idx) => idx === prev.length - 1 ? { ...msg, text: currentInputTranscriptionRef.current } : msg);
                }
                return [...prev, { role: 'user', text: currentInputTranscriptionRef.current, isAudioPlaying: false }];
              });
            }

            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString) {
              playAudio(base64EncodedAudioString);
            }

            if (message.serverContent?.interrupted) {
              stopAllAudio();
            }

            if (message.serverContent?.turnComplete) {
              console.debug('Turn complete. User input:', currentInputTranscriptionRef.current, 'Model output:', currentOutputTranscriptionRef.current);

              setMessages(prev => {
                const updatedHistory = [...prev];
                const lastUserMessageIndex = updatedHistory.findLastIndex(msg => msg.role === 'user');
                if (lastUserMessageIndex !== -1) {
                  updatedHistory[lastUserMessageIndex] = { ...updatedHistory[lastUserMessageIndex], text: currentInputTranscriptionRef.current };
                } else if (currentInputTranscriptionRef.current) {
                  updatedHistory.push({ role: 'user', text: currentInputTranscriptionRef.current, isAudioPlaying: false });
                }

                const lastModelMessageIndex = updatedHistory.findLastIndex(msg => msg.role === 'model');
                if (lastModelMessageIndex !== -1 && updatedHistory[lastModelMessageIndex].isAudioPlaying) {
                  // Already updated
                } else if (currentOutputTranscriptionRef.current) {
                  updatedHistory.push({ role: 'model', text: currentOutputTranscriptionRef.current, isAudioPlaying: false });
                }
                return updatedHistory;
              });

              currentInputTranscriptionRef.current = '';
              currentOutputTranscriptionRef.current = '';
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Live session error:', e);
            setIsLoading(false);
            setIsRecording(false);
            setMessages(prev => [...prev, { role: 'error', text: `Error: ${e.message}. Please try again.` }]);
            stopLiveSession();
          },
          onclose: (e: CloseEvent) => {
            console.debug('Live session closed:', e);
            setIsLoading(false);
            setIsRecording(false);
            stopLiveSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
        },
      });

      liveSessionRef.current = await sessionPromiseRef.current;

    } catch (error: unknown) {
      console.error('Failed to start live session:', error);
      setIsLoading(false);
      setIsRecording(false);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('permission')) {
        setMessages(prev => [...prev, { role: 'error', text: 'Microphone access denied. Please allow microphone access to use voice chat.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'error', text: `Failed to connect: ${errorMessage}.` }]);
      }
      stopLiveSession();
    }
  }, [playAudio, stopAllAudio, decodeAudioData]);

  const stopLiveSession = useCallback(() => {
    if (liveSessionRef.current) {
      liveSessionRef.current.close();
      liveSessionRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current.onaudioprocess = null;
      scriptProcessorRef.current = null;
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    sessionPromiseRef.current = null;
    stopAllAudio();
    currentInputTranscriptionRef.current = '';
    currentOutputTranscriptionRef.current = '';
    setIsLoading(false);
    setIsRecording(false);
  }, [stopAllAudio]);

  useEffect(() => {
    if (isRecording) {
      initiateLiveSession();
    } else if (!isRecording && liveSessionRef.current) {
      stopLiveSession();
    }
    return () => {
      stopLiveSession();
    };
  }, [isRecording, initiateLiveSession, stopLiveSession]);

  const toggleRecording = useCallback(() => {
    if (isLoading) return;
    setIsRecording(prev => !prev);
  }, [isLoading]);

  const handleSendMessage = useCallback(async (text: string, image?: { data: string; mimeType: string }) => {
    const userMessage: Message = { role: 'user', text, image };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    const tempModelMessageIndex = messages.length + 1;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'model', text: '' }, 
    ]);

    try {
      const finalResponseText = await sendMessageToGemini(
        text,
        (chunk) => {
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            const lastModelMessage = newMessages[tempModelMessageIndex];
            if (lastModelMessage && lastModelMessage.role === 'model') {
              lastModelMessage.text += chunk;
            }
            return newMessages;
          });
        },
        messages,
      );

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        if (newMessages[tempModelMessageIndex] && newMessages[tempModelMessageIndex].role === 'model') {
          newMessages[tempModelMessageIndex] = { 
            role: 'model', 
            text: finalResponseText, 
          };
        }
        return newMessages;
      });

    } catch (error: unknown) {
      console.error("Error during chat:", error);
      let errorMessage = "Failed to get response. Please try again. If the issue persists, contact support@abemedia.online.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        if (newMessages[tempModelMessageIndex]?.role === 'model') {
          newMessages[tempModelMessageIndex] = { role: 'error', text: `Error: ${errorMessage}` };
        } else {
          newMessages.push({ role: 'error', text: `Error: ${errorMessage}` });
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-4 bg-primary text-primary-foreground text-center text-xl font-semibold shadow-md">
        Abe Media Support Chat
      </header>
      <ChatWindow messages={messages} isLoading={isLoading && !isRecording} />
      <ChatInput onSendMessage={handleSendMessage} onVoiceToggle={toggleRecording} isRecording={isRecording} isLoading={isLoading} />
    </div>
  );
};

export default ChatbotApp;

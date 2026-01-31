
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface TTSButtonProps {
  text: string;
  className?: string;
  label?: string;
}

const TTSButton: React.FC<TTSButtonProps> = ({ text, className = "", label }) => {
  const [isLoading, setIsLoading] = useState(false);

  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading || !text) return;

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Parle d'une voix calme et pédagogique en français : ${text}` }] }],
        config: {
          responseModalities: ["AUDIO" as any],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioData = decodeBase64(base64Audio);
        const audioBuffer = await decodeAudioData(audioData, audioCtx, 24000, 1);
        
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        source.start();
      }
    } catch (error) {
      console.error("Erreur TTS:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isLoading}
      className={`flex items-center gap-2 transition-all hover:scale-110 active:scale-95 disabled:opacity-50 ${className}`}
      title="Écouter le texte"
    >
      {isLoading ? (
        <i className="fa-solid fa-circle-notch fa-spin"></i>
      ) : (
        <i className="fa-solid fa-volume-high"></i>
      )}
      {label && <span className="text-xs font-bold uppercase">{label}</span>}
    </button>
  );
};

export default TTSButton;

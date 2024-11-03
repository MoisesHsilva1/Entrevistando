import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

interface VoiceToTextProps {
    onTranscriptChange: (transcript: string) => void;
}

const VoiceToText: React.FC<VoiceToTextProps> = ({ onTranscriptChange }) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                const results = Array.from(event.results);
                const transcriptArray = results.map(result => result[0].transcript).join(' ');
                onTranscriptChange(transcriptArray); // Atualiza o campo de mensagem com a transcrição
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        } else {
            console.error('Seu navegador não suporta reconhecimento de voz.');
        }
    }, [onTranscriptChange]);

    const startListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    return (
        <div>
            <button className='buttonVoiceText' onClick={isListening ? stopListening : startListening}>
                <FontAwesomeIcon
                    icon={isListening ? faMicrophone : faMicrophoneSlash}
                    color={isListening ? "red" : "black"}
                    size="2x"
                />
            </button>
        </div>
    );
};

export default VoiceToText;

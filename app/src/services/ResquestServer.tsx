import React, { useState } from "react";
import VoiceToText from "../components/Mic";

export function SendMessage() {
    const [valueRespondeUser, setResponseUser] = useState<string[]>([]);
    const [valueInputMessage, setInputMessage] = useState<string>("");
    const [messagesIA, setMessagesIa] = useState<string>("");

    const handleInputMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(event.target.value);
    };

    const handleAddValue = async () => {
        if (valueInputMessage.trim()) {
            setResponseUser([valueInputMessage]);
            setInputMessage('');

            try {
                const response = await fetch('http://localhost:3000/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: valueInputMessage }),
                });

                if (!response.ok) throw new Error(`Erro: ${response.status}`);

                const data = await response.json();
                setMessagesIa(data.response || "");
            } catch (error: any) {
                setMessagesIa(`Erro ao obter resposta da IA: ${error.message}`);
            }
        }
    };

    const handleTranscriptChange = (transcript: string) => {
        setInputMessage(transcript);
    };

    return (
        <>
            {valueRespondeUser.length > 0 && (
                <span className="response-text">Você: {valueRespondeUser[0]}</span>
            )}
            {messagesIA && <span className="response-IA">IA: {messagesIA}</span>}
            <input
                type="text"
                className="field-message"
                value={valueInputMessage}
                onChange={handleInputMessage}
                placeholder="Digite (iniciar) para iniciarmos a entrevista"
            />
            <button className="button-gerateText" onClick={handleAddValue}>Enviar</button>
            <VoiceToText onTranscriptChange={handleTranscriptChange} />
        </>
    );
}

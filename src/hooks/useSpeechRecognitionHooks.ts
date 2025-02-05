import { useEffect, useState } from "react";

let recognation: any = null;
if('webkitSpeechRecognition' in window) {
    recognation = new webkitSpeechRecognition();
    recognation.continuous = true;
    recognation.lang = 'en-US';
}

const useSpeechRecognition = () => {
    const [text, setText] = useState<string>('');
    const [isListening, setIsListening] = useState<boolean>(false);

    useEffect(() => {
        if(!recognation) {
            return;
        }

        recognation.onresult = (event: SpeechRecognitionEvent) => {
            console.log('onresult event: ', event);
            setText(event.results[0][0].transcript);
            recognation.stop();
            setIsListening(false);
        };
    }, []);

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognation.start();
    };

    const stopListening = () => {
        recognation.stop();
        setIsListening(false);
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupports: !!recognation,
    };
};


export default useSpeechRecognition;
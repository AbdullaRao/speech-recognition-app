import { Mic, X } from "lucide-react";
import useSpeechRecognition from "../hooks/useSpeechRecognitionHooks";
import "../styles/Main.css";

const Main = () => {
  const {
    text,
    startListening,
    isListening,
    hasRecognitionSupports,
  } = useSpeechRecognition();
  
  const resetSpeech = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      {hasRecognitionSupports ? (
        <div className="content-wrapper">
          <div className="speech-box">
            {text ? (
              <button onClick={resetSpeech} className="mic-button">
                <X size={32} />
              </button>
            ) : (
              <button
                onClick={startListening}
                disabled={isListening}
                className={`mic-button ${isListening ? "disabled" : ""}`}
              >
                <Mic size={32} />
              </button>
            )}
            {!text && (isListening ? (
              <p className="listening-text">Listening...</p>
            ) : (
              <p className="listening-text">Try to say something...</p>
            ))}
            {text && <p className="transcribed-text">{text}</p>}
          </div>
        </div>
      ) : (
        <h1 className="error-text">Sorry, your browser does not support Speech Recognition</h1>
      )}
    </div>
  );
};

export default Main;

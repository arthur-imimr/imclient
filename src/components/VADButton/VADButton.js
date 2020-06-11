import React, { useState } from 'react';
import vad from 'voice-activity-detection';
import { ReactMic } from 'react-mic';
import { useSelector} from 'react-redux';

export const VADButton = () => {

    let audioContext;
    const socket = useSelector(state => state.personal.socket);
    const [isRecording, setRecording] = useState(false);

    const [isVAD, setVAD] = useState(false);

    const requestMic = () => {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();

            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            navigator.getUserMedia({audio: true}, startUserMedia, handleMicConnectError);
            console.log("the microphone permission has been successfully requested.");
        } catch (e) {
            handleUserMediaError();
        }
    }

    const handleUserMediaError = () => {
        console.warn("handle user media error.");
    }

    const handleMicConnectError = () => {
        console.warn("handle mic connect error.");
    }

    const startUserMedia = (stream) => {
        handleVADStart();
        vad(
            audioContext,
            stream,
            {
                onVoiceStart: handleVoiceStart,
                onVoiceStop: handleVoiceStop,
            }
        );
    }

    // on speech started
    const handleVoiceStart = () => {
        setRecording(true);
    }

    // on speech stopped
    const handleVoiceStop = () => {
        setRecording(false);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    // on recorded
    const handleMicStop = async (blob) => {

        const data = await toBase64(blob.blob);
        socket.emit('addAudio', { data });
        console.log(await toBase64(blob.blob));
    }

    // on start button pressed
    const handleVADStart = () => {
        setVAD(true);
    }

    // on stop button pressed
    const handleVADStop = () => {
        setVAD(false);
        setRecording(false);
    }

    return (
        <div>
            {
                <button
                    onMouseUp={() => handleVADStop()}
                    onMouseDown={() => requestMic()}
                >{
                    !isVAD
                    ? "hold to start voice activity detection."
                    : "release to stop voice activity detection."
                }</button>
            }
            <div>
                {
                    isVAD && (
                        <ReactMic
                            mimeType="audio/wav"
                            record={isRecording}
                            onStop={handleMicStop}
                        />
                    )
                }
            </div>
        </div>
    )
}
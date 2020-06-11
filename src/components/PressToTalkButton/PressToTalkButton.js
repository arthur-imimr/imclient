import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import {useSelector} from 'react-redux';


export const PressToTalkButton = () => {
    const socket = useSelector(state => state.personal.socket);

    const [isRecording, setRecording] = useState({
        mic: false,
        voice: false,
    });

    const startRecording = () => {
        setRecording({
            ...isRecording,
            mic: true
        });
    }

    useEffect(() => {
        if (isRecording.mic) {
            setRecording({
                ...isRecording,
                voice: true
            });
        }
    }, [isRecording.mic]);

    useEffect(() => {
        if (!isRecording.voice) {
            setRecording({
                ...isRecording,
                mic: false,
            });
        }
    }, [isRecording.voice]);

    const stopRecording = () => {
        setRecording({
            ...isRecording,
            voice: false,
        });
    }

    const saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            const url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    const onStop = async (blob) => {
        const data = await toBase64(blob.blob);
        socket.emit('addAudio', {data});
        console.log(await toBase64(blob.blob));
    }

    return (
        <div>
            <button onMouseUp={() => {
                    stopRecording();
                }}
                onMouseDown={() => {
                    startRecording();
                }}
                >{isRecording.mic ? "release to stop recording" : "hold to start recording"}
            </button>
            <div>
            {
                isRecording.mic && (
                    <ReactMic
                        mimeType="audio/wav"
                        record={isRecording.voice}
                        onStop={onStop}
                    />
                )
            }
            </div>
        </div>
    );
}